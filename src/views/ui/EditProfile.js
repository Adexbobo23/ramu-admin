import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../ComStyle/EditProfile.scss";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
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
          <Label for="bio">Bio</Label>
          <Input
            type="textarea"
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Save Changes</Button>
      </Form>
    </div>
  );
};

export default EditProfile;
