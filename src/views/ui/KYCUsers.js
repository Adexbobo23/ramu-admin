import React, { useState } from "react";
import "../ComStyle/KYCUsers.scss";

const KYCUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", status: "Approved" },
    { id: 3, name: "Bob Smith", email: "bob@example.com", status: "Pending" },
    // Add more sample data as needed
  ]);

  const handleAction = (userId, action) => {
    // Update the status based on the admin's action
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: action } : user
    );

    setUsers(updatedUsers);
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
    </div>
  );
};

export default KYCUsers;
