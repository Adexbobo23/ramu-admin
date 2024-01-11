import React from "react";
import { Table, Button } from "reactstrap";
import '../ComStyle/SettlementAccountsTable.scss';

const SettlementAccountsTable = ({ settlementAccounts, onEdit, onApprove, onDecline, onDelete }) => {
  // Sample data for demonstration
  const demoData = [
    {
      id: 1,
      email: 'john.doe@example.com',
      bankCode: '123',
      bankName: 'Example Bank',
      accountNumber: '9876543210',
      accountName: 'John Doe',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      bankCode: '456',
      bankName: 'Sample Bank',
      accountNumber: '1234567890',
      accountName: 'Jane Smith',
    },
    // Add more demo data as needed
  ];

  // Use the provided settlementAccounts or the demoData if settlementAccounts is not available
  const dataToDisplay = settlementAccounts || demoData;

  return (
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
        {dataToDisplay.map((account) => (
          <tr key={account.id}>
            <td>{account.email}</td>
            <td>{account.bankCode}</td>
            <td>{account.bankName}</td>
            <td>{account.accountNumber}</td>
            <td>{account.accountName}</td>
            <td>
              <Button color="info" onClick={() => onEdit(account.id)}>
                Edit
              </Button>{" "}
              <Button color="success" onClick={() => onApprove(account.id)}>
                Approve
              </Button>{" "}
              <Button color="danger" onClick={() => onDecline(account.id)}>
                Decline
              </Button>{" "}
              <Button color="danger" onClick={() => onDelete(account.id)}>
                Delete Settlement
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SettlementAccountsTable;
