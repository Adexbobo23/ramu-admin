import React, { useState, useEffect } from "react";
import { Table, Modal, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../ComStyle/ReportSpamData.scss";

const ReportSpamData = () => {
  const [spamData, setSpamData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSpamReports = async () => {
      try {
        const adminToken = localStorage.getItem("adminAuthToken");

        if (adminToken) {
          const response = await axios.get(
            "https://api-staging.ramufinance.com/api/v1/admin/spam-reports",
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );

          if (response.status === 200 && response.data.status) {
            setSpamData(response.data.data);
          } else {
            console.error("Error fetching spam reports:", response.data.message);
          }
        } else {
          console.error("Admin token is missing.");
        }
      } catch (error) {
        console.error("An error occurred while fetching spam reports:", error.message);
      }
    };

    fetchSpamReports();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {spamData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.email}</td>
              <td>{entry.description}</td>
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
