import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import axios from "axios";
import "../ComStyle/UserDetail.scss";

const UserDetails = () => {
  const { userId } = useParams();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    
    const fetchUserRoles = async () => {
      try {
        const adminAuthToken = localStorage.getItem("adminAuthToken");
    
        if (adminAuthToken) {
          const response = await axios.get(
            "https://api-staging.ramufinance.com/api/v1/admin/roles",
            {
              headers: {
                Authorization: `Bearer ${adminAuthToken}`,
              },
            }
          );
          setRoles(response.data.data);
        } else {
          console.error("Admin authentication token is missing.");
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limiting: Wait for a certain period and then retry
          const retryAfter = error.response.headers["retry-after"] || 5; // Default to 5 seconds
          console.log(`Rate limited. Retrying after ${retryAfter} seconds.`);
          setTimeout(fetchUserRoles, retryAfter * 1000);
        } else {
          console.error("Error fetching user roles:", error);
        }
      }
    };
    
    

    fetchUserRoles();
  }, );

  if (roles.length === 0) {
    return <div>Loading user role details...</div>;
  }

  return (
    <div>
      <h1>User Roles</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Display Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.display_name}</td>
              <td>{role.description}</td>
              <td>{role.created_at}</td>
              <td>{role.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetails;
