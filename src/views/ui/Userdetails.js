import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../ComStyle/UserDetail.scss";

const UserDetails = () => {
  const { userId } = useParams();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUserRoles = async () => {
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (adminAuthToken) {
        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/admin/roles",
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );
        setRoles(response.data.data);
      } else {
        console.error("Admin authentication token is missing.");
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting: Wait for a certain period and then retry
        const retryAfter = error.response.headers["retry-after"] || 5; // Default to 5 seconds
        console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
        setTimeout(fetchUserRoles, retryAfter * 1000);
      } else {
        console.error("Error fetching user roles:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    toggleEditModal();
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");
      if (!adminAuthToken) {
        console.error("Admin authentication token is missing.");
        return;
      }

      const response = await axios.put(
        `https://api-staging.ramufinance.com/api/v1/admin/edit-role/${selectedRole.id}`,
        {
          name: selectedRole.name,
          display_name: selectedRole.display_name,
          description: selectedRole.description,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );

      if (response.data.status) {
        console.log("Role updated successfully");
        alert("Role updated successfully");
        // Close the edit modal after successful submission
        toggleEditModal();
        // Refresh the user roles list
        fetchUserRoles();
      } else {
        console.error("Error updating role:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while updating role:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleDelete = (roleId) => {
    // Logic for handling the Delete action
    console.log(`Delete action for role ID ${roleId}`);
  };

  if (roles.length === 0) {
    return <div>Loading user role details...</div>;
  }

  return (
    <div>
      <h1>User Roles</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.display_name}</td>
              <td>{role.description}</td>
              <td>{formatDate(role.created_at)}</td>
              <td>{formatDate(role.updated_at)}</td>
              <td>
                <Button color="primary" onClick={() => handleEdit(role)}>
                  Edit
                </Button>{" "}
                <Button color="danger" onClick={() => handleDelete(role.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Role Modal */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Role</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleEditSubmit}>
            <FormGroup>
              <Label for="editName">Name</Label>
              <Input
                type="text"
                name="name"
                id="editName"
                value={selectedRole?.name}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDisplayName">Display Name</Label>
              <Input
                type="text"
                name="display_name"
                id="editDisplayName"
                value={selectedRole?.display_name}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="editDescription">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="editDescription"
                value={selectedRole?.description}
                onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Update Role
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserDetails;
