import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/KYCUsers.scss";

const KYCUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchKYCUsers = async () => {
      try {
        const response = await axios.get("/api/kycusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching KYC users:", error);
      }
    };

    fetchKYCUsers();
  }, []);

  return (
    <div className="kyc-users">
      <h2 className="kyc-users__title">KYC Users</h2>
      <ul className="kyc-users__list">
        {users.map((user) => (
          <li key={user.id} className="kyc-users__item">
            <div className="kyc-users__info">
              <span className="kyc-users__name">{user.name}</span>
              <span className="kyc-users__email">{user.email}</span>
            </div>
            <span className="kyc-users__status">KYC Completed</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KYCUsers;
