import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "../ComStyle/MyAccount.scss";

const MyAccount = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="my-account-container">
      <h1 className="page-title">My Account</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" required />
        </FormGroup>
        <Button type="submit" className="save-button">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default MyAccount;
