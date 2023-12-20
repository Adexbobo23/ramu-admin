import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";

const CreateEmailTemplate = () => {
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
    content: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateData({
      ...templateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (!adminAuthToken) {
        // Handle authentication error (redirect to login or show an error message)
        setError("Authentication token not available");
        return;
      }

      // Make API request to create email template
      const response = await axios.post(
        "https://api-staging.ramufinance.com/api/v1/admin/create-email-template",
        templateData,
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Handle success (redirect to email templates list or show a success message)
        setSuccess("Email template created successfully");
        setTemplateData({
          name: "",
          description: "",
          content: "",
        });
        // Redirect to the email templates list or wherever appropriate
        // Update this part based on your application's routing mechanism
        window.location.href = "/get-all-email-templates";
      } else {
        // Handle other status codes or error responses
        setError("Error creating email template");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setError("An error occurred while creating the email template");
    }
  };

  return (
    <div>
      <h1>Create Email Template</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={templateData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={templateData.description}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            value={templateData.content}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <Button style={{ backgroundColor: '#51CC62' }} type="submit">
            Create Template
        </Button>
      </Form>
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}
    </div>
  );
};

export default CreateEmailTemplate;
