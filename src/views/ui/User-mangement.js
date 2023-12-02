import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/UserRegistration.scss"; // Import the Sass file

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    role_id: "1",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the authentication token from localStorage
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      // Check if the authentication token is available
      if (adminAuthToken) {
        const response = await axios.post(
          "https://api-staging.ramufinance.com/api/v1/admin/add-admin-user",
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          // User creation successful
          console.log("User created successfully:", response.data);

          // Reset form after submission
          setFormData({
            user_name: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            role_id: "1",
            password: "",
            password_confirmation: "",
          });

          // Navigate to a different page after successful form submission
          navigate("/dashboard");
        } else {
          console.error("Error creating user:", response.statusText);
        }
      } else {
        // Handle case where authentication token is not available
        console.error("Authentication token is missing.");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with error status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request details:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="users-page">
      <h1>Add Users</h1>
      <div className="user-form">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="user_name">Username</Label>
            <Input
              type="text"
              name="user_name"
              id="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="last_name">Last Name</Label>
            <Input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">Phone Number</Label>
            <Input
              type="tel"
              name="phone_number"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password_confirmation">Confirm Password</Label>
            <Input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Add User</Button>
        </Form>
      </div>
    </div>
  );
};

export default UserRegistration;
