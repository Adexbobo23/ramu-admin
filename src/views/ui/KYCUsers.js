import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import "../ComStyle/KYCUsers.scss";

const KYCUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isKYCDetailsModalOpen, setIsKYCDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch KYC data when the component mounts
    fetchKYCData();
  }, []);

  const fetchKYCData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (!adminAuthToken) {
        throw new Error("Admin authentication token not available");
      }

      const response = await axios.get(
        "https://api-staging.ramufinance.com/api/v1/admin/get-all-kyc",
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );

      const kycData = response.data.data;
      setUsers(kycData);
    } catch (error) {
      handleApiError("Error fetching KYC data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (userId, action) => {
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");

      if (!adminAuthToken) {
        throw new Error("Admin authentication token not available");
      }

      const response = await axios.post(
        "https://api-staging.ramufinance.com/api/v1/admin/verify-customer",
        {
          user_id: userId,
          action: action,
        },
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );

      const updatedUsers = users.map((user) =>
        user.id === userId
          ? { ...user, status: response.data.status, email: response.data.email }
          : user
      );

      setUsers(updatedUsers);
    } catch (error) {
      handleApiError("Error processing KYC action:", error);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsKYCDetailsModalOpen(true);
  };

  const toggleKYCDetailsModal = () => {
    setIsKYCDetailsModalOpen(!isKYCDetailsModalOpen);
  };

  const handleApiError = (message, error) => {
    console.error(message, error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }

    setError("Error fetching KYC data. Please try again.");
  };

  return (
    <div className="kyc-users">
      <h2 className="kyc-users__title">KYC Users</h2>
      {!isLoading && !error && (
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
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
                <td className={`kyc-users__status ${String(user.status).toLowerCase()}`}>
                  {String(user.status)}
                </td>

                <td>
                <div className="kyc-users__actions">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="kyc-users__action kyc-users__action--view-details"
                  >
                    View Details
                  </button>
                  {user.status === "UNAPPROVED" && (
                    <>
                      <button
                        onClick={() => handleAction(user.id, "APPROVED")}
                        className="kyc-users__action kyc-users__action--approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(user.id, "DENIED")}
                        className="kyc-users__action kyc-users__action--deny"
                      >
                        Deny
                      </button>
                    </>
                  )}
                </div>
              </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUser && (
        <Modal isOpen={isKYCDetailsModalOpen} toggle={toggleKYCDetailsModal}>
          <ModalBody>
            <h5>KYC Details for {`${selectedUser.first_name} ${selectedUser.last_name}`}</h5>
            <br />
            <p>Email: {selectedUser.email}</p>
            <p>Status: {selectedUser.status}</p>
            <div className="kyc-modal__actions">
              <Button
                color="success"
                onClick={() => handleAction(selectedUser.id, "APPROVED")}
              >
                Approve
              </Button>{" "}
              <Button
                color="danger"
                onClick={() => handleAction(selectedUser.id, "DENIED")}
              >
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
