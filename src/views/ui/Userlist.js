import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/UserList.scss";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
    // Implement your search logic here
  };

  // const handleActionDropdownToggle = () => {
  //   setActionDropdownOpen(!actionDropdownOpen);
  // };

  // const handleActionDropdownSelect = (action) => {
  //   console.log("Selected action:", action);
  //   // Implement your action logic here
  // };

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
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.status}</td>
              {/* <td>
                <Dropdown isOpen={actionDropdownOpen} toggle={handleActionDropdownToggle}>
                  <DropdownToggle caret>Action</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleActionDropdownSelect("delete")}>Delete User</DropdownItem>
                    <DropdownItem onClick={() => handleActionDropdownSelect("reset-password")}>Send Password Reset</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
