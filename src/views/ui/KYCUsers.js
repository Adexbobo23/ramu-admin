import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import "../ComStyle/KYCUsers.scss";

const KYCUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", status: "Approved" },
    { id: 3, name: "Bob Smith", email: "bob@example.com", status: "Pending" },
    // Add more sample data as needed
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isKYCDetailsModalOpen, setIsKYCDetailsModalOpen] = useState(false);

  const handleAction = (userId, action) => {
    // Update the status based on the admin's action
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: action } : user
    );

    setUsers(updatedUsers);
  };

  const handleViewDetails = (user) => {
    // Set the selected user and open the KYC details modal
    setSelectedUser(user);
    setIsKYCDetailsModalOpen(true);
  };

  const toggleKYCDetailsModal = () => {
    // Close the KYC details modal
    setIsKYCDetailsModalOpen(!isKYCDetailsModalOpen);
  };

  return (
    <div className="kyc-users">
      <h2 className="kyc-users__title">KYC Users</h2>
      <table className="kyc-users__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className={`kyc-users__status ${user.status.toLowerCase()}`}>
                {user.status}
              </td>
              <td>
                {user.status === "Pending" && (
                  <div className="kyc-users__actions">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="kyc-users__action kyc-users__action--view-details"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAction(user.id, "Approved")}
                      className="kyc-users__action kyc-users__action--approve"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(user.id, "Denied")}
                      className="kyc-users__action kyc-users__action--deny"
                    >
                      Deny
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* KYC Details Modal */}
      {selectedUser && (
        <Modal isOpen={isKYCDetailsModalOpen} toggle={toggleKYCDetailsModal}>
          <ModalBody>
            <h5>KYC Details for {selectedUser.name}</h5>
            <br />
            <p>Email: {selectedUser.email}</p>
            <p>Status: {selectedUser.status}</p>
            {/* Add more KYC details as needed */}
            <div className="kyc-modal__actions">
              <Button color="success" onClick={() => handleAction(selectedUser.id, "Approved")}>
                Approve
              </Button>{" "}
              <Button color="danger" onClick={() => handleAction(selectedUser.id, "Denied")}>
                Deny
              </Button>{" "}
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default KYCUsers;
