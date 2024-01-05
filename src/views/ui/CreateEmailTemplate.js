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
        setError("Authentication token not available");
        return;
      }
  
      // Omit the "id" field from the payload
      const { id, ...payloadWithoutId } = templateData;
  
      const response = await axios.post(
        "https://api-staging.ramufinance.com/api/v1/admin/create-email-template",
        payloadWithoutId, // Use the payload without the "id" field
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );
  
      if (response.status === 201) {
        setSuccess("Email template created successfully");
        setTemplateData({
          name: "",
          description: "",
          content: "",
        });
      } else {
        setError(`Error creating email template. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred while creating the email template:", error);
  
      if (error.response) {
        setError(`Request failed with status: ${error.response.status}`);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        setError("No response received from the server");
        console.error("Request data:", error.request);
      } else {
        setError("An error occurred during the request setup");
        console.error("Error message:", error.message);
      }
    }
  };
  

  return (
    <div>
      <h1>Create Email Template</h1>
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}
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
        <Button style={{ backgroundColor: "#51CC62" }} type="submit">
          Create Template
        </Button>
      </Form>
    </div>
  );
};

export default CreateEmailTemplate;

