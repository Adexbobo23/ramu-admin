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
import "../ComStyle/ReportSpamData.scss"; 

const demoSpamData = [
  {
    id: 1,
    email: "sibe@ramufinance.com",
    description: "My account got compromised help",
  },
  // Add more demo data as needed
];

const ReportSpamData = () => {
  const [spamData, setSpamData] = useState(demoSpamData);
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
    console.log(`Reply to ${selectedEntry?.email}: ${replyMessage}`);
    toggleModal();
  };

  return (
    <div className="report-spam-data-container">
      <h1>Report Spam Data</h1>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {spamData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.email}</td>
              <td>{entry.description}</td>
              <td>
                <Button onClick={() => handleReply(entry)}>Reply</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for viewing and replying to spam report entry */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalBody>
          <h5>Reply to {selectedEntry?.email}</h5>
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

export default ReportSpamData;
