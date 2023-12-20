import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import "../ComStyle/UserList.scss";
import ReactPaginate from "react-js-pagination";

const UserDetailsModal = ({ user, isOpen, toggle, onSendEmail }) => {
  const handleSendEmail = () => {
    // Call the onSendEmail function with the user's email
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
        {/* Add more details as needed */}
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
  const [activePage, setActivePage] = useState(1); // Current active page
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10); 
  const [totalItemsCount, setTotalItemsCount] = useState(0); // Total number of items

  const fetchUsers = async (page = 1) => {
    try {
      // Retrieve the authentication token from localStorage
      const authToken = localStorage.getItem("adminAuthToken");

      // Check if the authentication token is available
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
          const data = response.data.data; // Assuming the user data is in the "data" property

          // Check if the data is an array before setting the state
          if (Array.isArray(data)) {
            console.log("Fetched user data:", data);
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
    // Fetch users when the component mounts
    fetchUsers(activePage);
  }, [activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);

    // Fetch users with the search query and reset to the first page
    fetchUsers(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleUserClick = (user) => {
    // Set the selected user and open the modal
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
  };

  const toggleUserDetailsModal = () => {
    // Close the modal
    setIsUserDetailsModalOpen(!isUserDetailsModalOpen);
  };

  const handleSuspend = (userId) => {
    // Implement the logic to suspend the user with the given userId
    console.log(`Suspend user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    // Implement the logic to delete the user with the given userId
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleSendEmail = (email) => {
    // Implement the logic to send an email to the user with the provided email
    console.log(`Sending email to: ${email}`);
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
      <Table striped className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
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
      {/* Render the UserDetailsModal component when a user is selected */}
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

