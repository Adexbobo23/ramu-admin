import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";
import '../ComStyle/AddSectorForm.scss';

const AddSectorForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  const handleAddSector = () => {
    // Fetch adminAuthToken from local storage
    const adminAuthToken = localStorage.getItem("adminAuthToken");

    // Check if adminAuthToken is available
    if (!adminAuthToken) {
      console.error("Admin authentication token not found in local storage.");
      return;
    }

    // Prepare the sector data
    const sectorData = {
      name,
      description,
    };

    // Send a POST request to add a market sector
    axios.post("https://api-staging.ramufinance.com/api/v1/admin/add-market-sector", sectorData, {
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
      },
    })
      .then(response => {
        console.log("Market sector added successfully:", response.data);
        setAlertMessage("Market sector added successfully!");
        setAlertColor("success");
        // You can add additional logic here (e.g., show a success message)
      })
      .catch(error => {
        console.error("Error adding market sector:", error);
        setAlertMessage("Error adding market sector. Please try again.");
        setAlertColor("danger");
      });
  };

  return (
    <div className="add-sector-form-container">
      <h2 className="add-sector-title">Add Market Sector</h2>
      {alertMessage && <Alert color={alertColor}>{alertMessage}</Alert>}
      <Form className="add-sector-form">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter sector name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter sector description"
          />
        </FormGroup>
        <Button color="success" onClick={handleAddSector}>
          Add Sector
        </Button>
      </Form>
    </div>
  );
};

export default AddSectorForm;
