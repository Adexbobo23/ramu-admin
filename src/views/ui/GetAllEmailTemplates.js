// GetAllEmailTemplates.js

import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Modal, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap"; // Assuming you're using Bootstrap for the modal
import "../ComStyle/GetAllEmailTemplates.scss";

const demoEmailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to Our Platform!",
    content: "Dear user, welcome to our platform. Enjoy your experience!",
  },
  {
    id: 2,
    name: "Promotional Email",
    subject: "Special Offer Inside!",
    content: "Don't miss our exclusive promotional offer. Limited time only!",
  },
];

const GetAllEmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

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

  const handleSave = () => {
    // Handle saving the updated template
    console.log("Updated template:", editedTemplate);

    // Close the modal after saving
    toggleModal();
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
        {demoEmailTemplates.map((template) => (
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
            <Button style={{ backgroundColor: '#51CC62' }} onClick={handleSave}>
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GetAllEmailTemplates;
