import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/RoleManagement.scss";

const RoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsersWithRoles = async () => {
      try {
        const response = await axios.get("/api/userswithroles");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users with roles:", error);
      }
    };

    fetchUsersWithRoles();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here
    // You can access the search query from the 'searchQuery' state
    // Example: filter the 'users' array based on the search query
    console.log("Search query:", searchQuery);
  };

 
 
  return (
    <div className="users-with-roles">
      <h2 className="users-with-roles__title">Role Management</h2>
      <Form onSubmit={handleSearch}>
        <FormGroup>
          <Label for="searchQuery">Search User With Assigned Role</Label>
          <div className="search-form">
            <Input
              type="text"
              name="searchQuery"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <Button type="submit" className="search-button">Search</Button>
          </div>
        </FormGroup>
      </Form>
      <ul className="users-with-roles__list">
        {users.map((user) => (
          <li key={user.id} className="users-with-roles__item">
            <div className="users-with-roles__info">
              <span className="users-with-roles__name">{user.name}</span>
              <span className="users-with-roles__name">{user.email}</span>
              <span className="users-with-roles__role">{user.role}</span>
            </div>
            <span className="users-with-roles__status">Assigned Role</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
