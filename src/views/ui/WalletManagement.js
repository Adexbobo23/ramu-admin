import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/WalletManagement.scss";

const WalletManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setWalletBalance(user.walletBalance);
  };

  const handleWalletBalanceUpdate = () => {
    // Perform update logic for the selected user's wallet balance
    // ...
    console.log("Wallet balance updated:", walletBalance);
  };

  return (
    <div className="wallet-management">
      <h2 className="wallet-management__title">Wallet Management</h2>

      <div className="wallet-management__user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`wallet-management__user ${
              user === selectedUser ? "selected" : ""
            }`}
            onClick={() => handleUserSelect(user)}
          >
            {user.name}
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="wallet-management__details">
          <h3 className="wallet-management__details-title">
            {selectedUser.name}
          </h3>
          <p className="wallet-management__details-balance">
            Wallet Balance: ${walletBalance}
          </p>
          <input
            type="number"
            value={walletBalance}
            onChange={(e) => setWalletBalance(e.target.value)}
            className="wallet-management__details-input"
          />
          <button
            className="wallet-management__details-button"
            onClick={handleWalletBalanceUpdate}
          >
            Update Wallet Balance
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletManagement;
