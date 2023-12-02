import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import "../ComStyle/AdminInbox.scss";

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch inbox messages from an API or database
    // and update the 'messages' state with the retrieved data
    const fetchMessages = async () => {
      try {
        const response = await fetch("API_ENDPOINT/inbox");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching inbox messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="admin-inbox-container">
      <h1>Inbox</h1>
      <Table striped className="inbox-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.from}</td>
              <td>{message.subject}</td>
              <td>{message.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminInbox;
