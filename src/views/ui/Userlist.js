import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-js-pagination";
import "../ComStyle/UserList.scss";

const UserDetailsModal = ({ user, isOpen, toggle, onSendEmail }) => {
  const handleSendEmail = () => {
    onSendEmail(user.email);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <h5>Selected User Details</h5>
        <br />
        <p>Name: {`${user.first_name} ${user.last_name}`}</p>
        <p>Username: {user.user_name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phone_number}</p>
        <p>Status: {user.status}</p>
        <Button color="success" onClick={handleSendEmail}>
          Send User Email
        </Button>
      </ModalBody>
    </Modal>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const fetchUsers = async (page = 1) => {
    try {
      const authToken = localStorage.getItem("adminAuthToken");

      if (authToken) {
        const response = await axios.get(
          `https://api-staging.ramufinance.com/api/v1/admin/users?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.data;

          if (Array.isArray(data)) {
            setUsers(data);
            setTotalItemsCount(response.data.total);
          } else {
            console.error("Invalid data format. Expected an array.");
          }
        } else if (response.status === 401) {
          console.error("Unauthorized access. Please check authentication token.");
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } else {
        console.error("Authentication token is missing.");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers(activePage);
  }, [activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // const handleUserClick = (user) => {
  //   setSelectedUser(user);
  //   setIsUserDetailsModalOpen(true);
  // };

  const toggleUserDetailsModal = () => {
    setIsUserDetailsModalOpen(!isUserDetailsModalOpen);
  };

  const handleSuspend = async (userId) => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");
  
      if (!adminToken) {
        console.error("Admin token not available");
        alert("Admin token not available");
        return;
      }
  
      const suspendPayload = {
        user_id: userId,
      };
  
      const response = await axios.post(
        "https://api-staging.ramufinance.com/api/v1/admin/suspend-user",
        suspendPayload,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        console.log(`User with ID ${userId} suspended successfully`);
        // Refresh the user list
        fetchUsers(activePage);
        alert("User suspended successfully");
      } else {
        console.error("Error suspending user:", response.data.message);
        alert(`Error suspending user: ${response.data.message}`);
      }
    } catch (error) {
      console.error("An error occurred while suspending user:", error);
      alert(`An error occurred while suspending user: ${error.message}`);
    }
  };
  
  const handleDelete = async (userId) => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");
  
      if (!adminToken) {
        console.error("Admin token not available");
        alert("Admin token not available");
        return;
      }
  
      const deletePayload = {
        user_id: userId,
      };
  
      const response = await axios.delete(
        `https://api-staging.ramufinance.com/api/v1/admin/delete-user`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          data: deletePayload,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        console.log(`User with ID ${userId} deleted successfully`);
        // Refresh the user list
        fetchUsers(activePage);
        alert("User deleted successfully");
      } else {
        console.error("Error deleting user:", response.data.message);
        alert(`Error deleting user: ${response.data.message}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error);
      alert(`An error occurred while deleting user: ${error.message}`);
    }
  };
  
  
 
  const handleSendEmail = (email) => {
    console.log(`Sending email to: ${email}`);
  };

  const handleExportToCSV = () => {
    const csvData = [
      ["Name", "Username", "Email", "Phone Number", "Gender", "Status"],
      ...users.map(user => [
        `${user.first_name} ${user.last_name}`,
        user.user_name,
        user.email,
        user.phone_number,
        user.gender,
        user.status,
      ]),
    ];

    return <CSVLink data={csvData} filename={"user_data.csv"} className="export-csv-button">Export to CSV</CSVLink>;
  };

  const handleUserClick = (user, e) => {
    // Check if the click event comes from a button
    const isButtonClicked = e.target.classList.contains('suspend-btn') || e.target.classList.contains('delete-btn');

    if (!isButtonClicked) {
      // Open the UserDetailsModal only if the click is not on a button
      setSelectedUser(user);
      setIsUserDetailsModalOpen(true);
    }
  };

  return (
    <div className="user-list-container">
      <h1>All Users</h1>
      <Form onSubmit={handleSearch}>
        <FormGroup>
          <Label for="searchQuery">Search User</Label>
          <div className="search-form">
            <Input
              type="text"
              name="searchQuery"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <Button type="submit" className="search-button">
              Search
            </Button>
          </div>
        </FormGroup>
      </Form>
      <div className="export-csv-container">
        {handleExportToCSV()}
      </div>
      <Table striped className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={(e) => handleUserClick(user, e)}>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.phone_number}</td>
              <td>{user.status}</td>
              <td>
                <div className="action-buttons">
                  <Button
                    className="suspend-btn"
                    onClick={() => handleSuspend(user.id)}
                    color="warning"
                  >
                    Suspend
                  </Button>{" "}
                  <Button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-container">
        <ReactPaginate
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isUserDetailsModalOpen}
          toggle={toggleUserDetailsModal}
          onSendEmail={handleSendEmail} 
        />
      )}
    </div>
  );
};

export default UserList;
