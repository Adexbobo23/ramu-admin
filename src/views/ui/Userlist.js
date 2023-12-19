import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import "../ComStyle/UserList.scss";

const UserDetailsModal = ({ user, isOpen, toggle }) => {
  // Component to display user details in a modal
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <h5>Selected User Details</h5>
        <br></br>
        <p>Name: {`${user.first_name} ${user.last_name}`}</p>
        <p>Username: {user.user_name}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phone_number}</p>
        <p>Status: {user.status}</p>
        {/* Add more details as needed */}
      </ModalBody>
    </Modal>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  // const [actionDropdownOpen, setActionDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve the authentication token from localStorage
        const authToken = localStorage.getItem('adminAuthToken');

        // Check if the authentication token is available
        if (authToken) {
          const response = await axios.get("https://api-staging.ramufinance.com/api/v1/admin/users", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          if (response.status === 200) {
            const data = response.data.data; // Assuming the user data is in the "data" property

            // Check if the data is an array before setting the state
            if (Array.isArray(data)) {
              console.log("Fetched user data:", data);
              setUsers(data);
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

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  
    // Filter users based on the search query
    const filteredUsers = users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const userName = user.user_name.toLowerCase();
      const email = user.email.toLowerCase();
      const phoneNumber = user.phone_number.toLowerCase();
      const status = user.status.toLowerCase();
  
      // Check if any property matches the search query
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        userName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase()) ||
        phoneNumber.includes(searchQuery.toLowerCase()) ||
        status.includes(searchQuery.toLowerCase())
      );
    });
  
    // Update the state with filtered users
    setUsers(filteredUsers);
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
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Render the UserDetailsModal component when a user is selected */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          isOpen={isUserDetailsModalOpen}
          toggle={toggleUserDetailsModal}
        />
      )}
    </div>
  );
};

export default UserList;
