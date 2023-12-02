import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../ComStyle/CreateRole.scss";

const CreateRole = () => {
  const [roleData, setRoleData] = useState({
    name: "",
    display_name: "",
    description: "",
  });

  const handleChange = (e) => {
    setRoleData({
      ...roleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (adminAuthToken) {
        const response = await axios.post(
          "https://api-staging.ramufinance.com/api/v1/admin/create-role",
          roleData,
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Role created successfully:", response.data);
          // Show alert message
          window.alert("Role created successfully!");
        } else {
          console.error("Error creating role:", response.statusText);
        }
      } else {
        console.error("Admin authentication token is missing.");
      }
    } catch (error) {
      console.error("An error occurred while creating role:", error);
    }
  };

  return (
    <div>
      <h1>Create Role</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={roleData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="display_name">Display Name</Label>
          <Input
            type="text"
            name="display_name"
            id="display_name"
            value={roleData.display_name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={roleData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Create Role</Button>
      </Form>
      {/* <p>
        <Link to="/dashboard">Go to Dashboard</Link>
      </p> */}
    </div>
  );
};

export default CreateRole;
