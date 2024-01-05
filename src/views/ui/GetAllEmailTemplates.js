import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Modal, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../ComStyle/GetAllEmailTemplates.scss";

const GetAllEmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

  useEffect(() => {
    // Fetch email templates from the API when the component mounts
    fetchEmailTemplates();
  }, []);

  const fetchEmailTemplates = async () => {
    try {
      // Retrieve the admin authentication token from localStorage
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (!adminAuthToken) {
        throw new Error("Admin authentication token not available");
      }

      // Fetch email templates using the admin token for authentication
      const response = await axios.get("https://api-staging.ramufinance.com/api/v1/admin/email-templates", {
        headers: {
          Authorization: `Bearer ${adminAuthToken}`,
        },
      });

      // Update the state with the fetched email templates
      setEmailTemplates(response.data.data);
    } catch (error) {
      console.error("Error fetching email templates:", error);
      // Handle error, e.g., show an error message
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setEditedTemplate({
      name: template.name,
      subject: template.subject,
      content: template.content,
    });
    toggleModal();
  };

  const handleSave = async () => {
    try {
      // Retrieve the admin authentication token from localStorage
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (!adminAuthToken) {
        throw new Error("Admin authentication token not available");
      }

      // Update the email template using the admin token for authentication
      await axios.put(
        `https://api-staging.ramufinance.com/api/v1/admin/edit-email-template/${selectedTemplate.id}`,
        editedTemplate,
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );

      // Refresh the email templates list after updating
      await fetchEmailTemplates();

      // Close the modal after saving
      toggleModal();
    } catch (error) {
      console.error("Error updating email template:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTemplate({
      ...editedTemplate,
      [name]: value,
    });
  };

  return (
    <div className="get-all-email-templates-container">
      <h1>All Email Templates</h1>
      <div className="email-templates-list">
        {emailTemplates.map((template) => (
          <div key={template.id} className="email-template-item">
            <h2>{template.name}</h2>
            <p>{template.subject}</p>
            <p>{template.content}</p>
            <button className="edit-button" onClick={() => handleEdit(template)}>
              <FiEdit /> Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal for viewing and editing email template */}
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
              <Label for="subject">Subject</Label>
              <Input
                type="text"
                name="subject"
                id="subject"
                value={editedTemplate.subject}
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
