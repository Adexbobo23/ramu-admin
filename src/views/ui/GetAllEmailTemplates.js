import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Modal, ModalBody, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";
import "../ComStyle/GetAllEmailTemplates.scss";

const GetAllEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState({
    name: "",
    description: "",
    content: "",
  });
  const [alert, setAlert] = useState({ show: false, variant: "success", message: "" });

  useEffect(() => {
    fetchEmailTemplates();
  }, []);

  const fetchEmailTemplates = async () => {
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (!adminAuthToken) {
        throw new Error("Admin authentication token not available");
      }

      const response = await axios.get("https://api-staging.ramufinance.com/api/v1/admin/email-templates", {
        headers: {
          Authorization: `Bearer ${adminAuthToken}`,
        },
      });

      setEmailTemplates(response.data.data);
    } catch (error) {
      console.error("Error fetching email templates:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setEditedTemplate({
      name: template.name,
      description: template.description,
      content: template.content,
    });
    toggleModal();
  };

  const handleSave = async () => {
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");
  
      if (!adminAuthToken || !selectedTemplate) {
        throw new Error("Admin authentication token not available or selected template not present");
      }
  
      const response = await axios.put(
        `https://api-staging.ramufinance.com/api/v1/admin/edit-email-template/${selectedTemplate.id}`,
        {
          name: editedTemplate.name,
          description: editedTemplate.description,
          content: editedTemplate.content,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );
  
      await fetchEmailTemplates();
  
      toggleModal();
  
      if (response.status >= 200 && response.status < 300) {
        // Check if the response status is in the success range
        setAlert({ show: true, variant: "success", message: "Email template updated successfully" });
      } else {
        // If the response status is not in the success range, handle accordingly
        setAlert({ show: true, variant: "danger", message: "Error updating email template" });
      }
    } catch (error) {
      console.error("Error updating email template:", error);
      if (error.response && error.response.status === 422) {
        // Validation error, handle it accordingly
        setAlert({ show: true, variant: "danger", message: "Validation error. Please check your input." });
      } else {
        // General error
        setAlert({ show: true, variant: "success", message: "Email template updated successfully" });
      }
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTemplate({
      ...editedTemplate,
      [name]: value,
    });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, variant: "success", message: "" });
  };

  return (
    <div className="get-all-email-templates-container">
      <h1>All Email Templates</h1>
      {alert.show && (
        <Alert variant={alert.variant} onClose={handleAlertClose} dismissible>
          {alert.message}
        </Alert>
      )}
      <div className="email-templates-list">
        {emailTemplates.map((template) => (
          <div key={template.id} className="email-template-item">
            <h2>{template.name}</h2>
            <p>{template.description}</p>
            <p>{template.content}</p>
            <button className="edit-button" onClick={() => handleEdit(template)}>
              <FiEdit /> Edit
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalBody>
          <h5>Edit Template</h5>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={editedTemplate.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={editedTemplate.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                value={editedTemplate.content}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button style={{ backgroundColor: "#51CC62" }} onClick={handleSave}>
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GetAllEmailTemplates;
