import React, { useState, useEffect } from "react";
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

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Retrieve the authentication token from localStorage
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        // Check if the authentication token is available
        if (adminAuthToken) {
          const response = await axios.get(
            "https://api-staging.ramufinance.com/api/v1/admin/roles",
            {
              headers: {
                Authorization: `Bearer ${adminAuthToken}`,
              },
            }
          );

          if (response.status === 200) {
            setRoles(response.data.data);
          } else {
            console.error("Error fetching roles:", response.statusText);
          }
        } else {
          console.error("Authentication token is missing.");
        }
      } catch (error) {
        console.error("An error occurred while fetching roles:", error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");
  
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
  
        if (response.status >= 200 && response.status < 300) {
          // User creation successful
          console.log("User created successfully:", response.data);
  
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
  
          // Display a success message
          alert("User created successfully!");
        } else {
          console.error("Error creating user:", response.statusText);
          alert("User creation failed. Please check the form data.");
        }
      } else {
        console.error("Authentication token is missing.");
        alert("User creation failed. Authentication token is missing.");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with error status:", error.response.status);
        console.error("Response data:", error.response.data);
    
        // Display validation errors to the user
        if (error.response.data.message) {
          if (typeof error.response.data.message === "string") {
            alert(`User creation failed. ${error.response.data.message}`);
          } else if (typeof error.response.data.message === "object") {
            const errorMessages = Object.values(error.response.data.message)
              .flat()
              .join(", ");
            alert(`User creation failed. ${errorMessages}`);
          } else {
            alert("User creation failed. Please check the form data.");
          }
        } else {
          alert("User creation failed. Please check the form data.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request details:", error.request);
        alert("User creation failed. No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        alert("User creation failed. Error setting up the request.");
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
            <Label for="role_id">Role</Label>
            <Input
              type="select"
              name="role_id"
              id="role_id"
              value={formData.role_id}
              onChange={handleChange}
              required
            >
              {loadingRoles ? (
                <option value="" disabled>Loading roles...</option>
              ) : (
                roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.display_name}
                  </option>
                ))
              )}
            </Input>
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

          {/* Alert for successful registration */}
          {isRegistrationSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              User created successfully!
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserRegistration;
