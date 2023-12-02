import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/EditRole.scss";

const EditRole = () => {
  const { roleId } = useParams();
  const [roleData, setRoleData] = useState({
    name: "",
    display_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const adminAuthToken = localStorage.getItem("adminAuthToken");
  
        if (adminAuthToken) {
          const response = await axios.get(
            `https://api-staging.ramufinance.com/api/v1/admin/edit-role/${roleId}`,
            {
              headers: {
                Authorization: `Bearer ${adminAuthToken}`,
              },
            }
          );
  
          setRoleData(response.data.data);
        } else {
          console.error("Admin authentication token is missing.");
        }
      } catch (error) {
        console.error("Error fetching role details:", error);
      }
    };
  
    fetchRoleDetails();
  }, [roleId]);
    

  const handleChange = (e) => {
    setRoleData({
      ...roleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the authentication token from local storage
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (adminAuthToken) {
        const response = await axios.put(
          `https://api-staging.ramufinance.com/api/v1/admin/edit-role/${roleId}`,
          roleData,
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Role updated successfully:", response.data);
          // Redirect to the role details page or another page after successful update
        } else {
          console.error("Error updating role:", response.statusText);
        }
      } else {
        console.error("Admin authentication token is missing.");
      }
    } catch (error) {
      console.error("An error occurred while updating role:", error);
    }
  };

  if (!roleData.name) {
    return <div>Loading role details...</div>;
  }

  return (
    <div>
      <h1>Edit Role</h1>
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
        <Button type="submit">Save Changes</Button>
      </Form>
    </div>
  );
};

export default EditRole;
