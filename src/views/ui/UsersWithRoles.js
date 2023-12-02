import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/UsersWithRoles.scss";

const UsersWithRoles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersWithRoles = async () => {
      try {
        // Retrieve the authentication token from local storage
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        if (adminAuthToken) {
          const response = await axios.get(
            "https://api-staging.ramufinance.com/api/v1/admin/back-office-users",
            {
              headers: {
                Authorization: `Bearer ${adminAuthToken}`,
              },
            }
          );
          setUsers(response.data.data);
        } else {
          console.error("Admin authentication token is missing.");
        }
      } catch (error) {
        console.error("Error fetching users with roles:", error);
      }
    };

    fetchUsersWithRoles();
  }, []);

  return (
    <div className="users-with-roles">
      <h2 className="users-with-roles__title">Users with Roles</h2>
      <ul className="users-with-roles__list">
        {users.map((user) => (
          <li key={user.id} className="users-with-roles__item">
            <div className="users-with-roles__info">
              <span className="users-with-roles__name">{user.name}</span>
              <span className="users-with-roles__name">{user.email}</span>
              <span className="users-with-roles__role">{user.role}</span>
            </div>
            <span className="users-with-roles__status">Assigned Role</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersWithRoles;
