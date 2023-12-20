import React, { useState } from "react";
import {
  Table,
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../ComStyle/ContactFormData.scss"; 

const demoFormData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    message: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
  },
  // Add more demo data as needed
];

const ContactFormData = () => {
  const [formData, setFormData] = useState(demoFormData);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleReply = (entry) => {
    setSelectedEntry(entry);
    toggleModal();
  };

  const handleSendReply = () => {
    // For the demo, we'll simply log the reply message
    console.log(`Reply to ${selectedEntry?.name}: ${replyMessage}`);
    toggleModal();
  };

  return (
    <div className="contact-form-data-container">
      <h1>Contact Form Data</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.message}</td>
              <td>
                <Button onClick={() => handleReply(entry)}>Reply</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for viewing and replying to contact form entry */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalBody>
          <h5>Reply to {selectedEntry?.name}</h5>
          <Form>
            <FormGroup>
              <Label for="replyMessage">Your Reply</Label>
              <Input
                type="textarea"
                name="replyMessage"
                id="replyMessage"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" onClick={handleSendReply}>
              Send Reply
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ContactFormData;
