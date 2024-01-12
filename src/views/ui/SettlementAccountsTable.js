import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import '../ComStyle/SettlementAccountsTable.scss';

const SettlementAccountsTable = () => {
  const [settlementAccounts, setSettlementAccounts] = useState([]);

  useEffect(() => {
    // Fetch adminAuthToken from local storage
    const adminAuthToken = localStorage.getItem("adminAuthToken");

    // Check if adminAuthToken is available
    if (!adminAuthToken) {
      console.error("Admin authentication token not found in local storage.");
      return;
    }

    // Fetch settlement accounts data from the API with admin authentication headers
    axios.get("https://api-staging.ramufinance.com/api/v1/admin/settlement-accounts", {
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
      },
    })
      .then(response => {
        const { data } = response.data;
        setSettlementAccounts(data);
      })
      .catch(error => {
        console.error("Error fetching settlement accounts:", error);
      });
  }, []);

  // Define handleEdit function
  const handleEdit = (accountId) => {
    // Logic for handling the Edit action
    console.log(`Edit action for account ID ${accountId}`);
  };

  // Define handleApprove function
  const handleApprove = (accountId) => {
    // Logic for handling the Approve action
    console.log(`Approve action for account ID ${accountId}`);
  };

  // Define handleDecline function
  const handleDecline = (accountId) => {
    // Logic for handling the Decline action
    console.log(`Decline action for account ID ${accountId}`);
  };

  // Define handleDelete function
  const handleDelete = (accountId) => {
    // Logic for handling the Delete action
    console.log(`Delete action for account ID ${accountId}`);
  };

  return (
    <div className="container">
    <Table striped className="settlement-accounts-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Bank Code</th>
          <th>Bank Name</th>
          <th>Account Number</th>
          <th>Account Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {settlementAccounts.map((account) => (
          <tr key={account.id}>
            <td>{account.user.email}</td>
            <td>{account.bank_code}</td>
            <td>{account.beneficiary_bank_name}</td>
            <td>{account.account_number}</td>
            <td>{account.beneficiary_account_name}</td>
            <td>
              <Button color="info" onClick={() => handleEdit(account.id)}>
                Edit
              </Button>{" "}
              <Button color="success" onClick={() => handleApprove(account.id)}>
                Approve
              </Button>{" "}
              <Button color="danger" onClick={() => handleDecline(account.id)}>
                Decline
              </Button>{" "}
              <Button color="danger" onClick={() => handleDelete(account.id)}>
                Delete Settlement
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default SettlementAccountsTable;
