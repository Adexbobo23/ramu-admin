import React, { useState, useEffect } from "react";
import { Table, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import "../ComStyle/ContactFormData.scss";

const ContactFormData = () => {
  const [formData, setFormData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const adminToken = localStorage.getItem("adminAuthToken");

        if (adminToken) {
          const response = await axios.get(
            "https://api-staging.ramufinance.com/api/v1/admin/contact-us-meesages",
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );

          if (response.status === 200 && response.data.status) {
            setFormData(response.data.data);
          } else {
            console.error("Error fetching contact messages:", response.data.message);
          }
        } else {
          console.error("Admin token is missing.");
        }
      } catch (error) {
        console.error("An error occurred while fetching contact messages:", error.message);
      }
    };

    fetchContactMessages();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
          </tr>
        </thead>
        <tbody>
          {formData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for viewing and replying to contact form entry */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalBody>
          <h5>Reply to {selectedEntry?.name}</h5>
          <form>
            <div className="form-group">
              <label htmlFor="replyMessage">Your Reply</label>
              <textarea
                className="form-control"
                id="replyMessage"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleSendReply}>
              Send Reply
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ContactFormData;
