import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, ModalBody, Button } from "reactstrap";
import "../ComStyle/TransactionDetails.scss";

const TransactionDetails = ({ transactionId }) => {
  const [transaction, setTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        if (!adminAuthToken) {
          console.error("Admin authentication token not available");
          return;
        }

        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/admin/get-wallet-transactions",
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        const transactionData = response.data.data[0];

        setTransaction(transactionData);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  if (!transaction) {
    return <div>Loading transaction details...</div>;
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="transaction-details">
      <h2>Transaction Details</h2>
      <Table>
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Trade Price</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={openModal}>
            <td>{transaction.wallet_address}</td>
            <td>{transaction.txn_type}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.trade_price}</td>
            <td>{transaction.currency}</td>
            <td>{transaction.status}</td>
            <td>{transaction.created_at}</td>
          </tr>
        </tbody>
      </Table>

      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <ModalBody>
          <h5>Transaction Details</h5>
          <br />
          <p>Wallet Address: {transaction.wallet_address}</p>
          <p>Transaction Type: {transaction.txn_type}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Quantity: {transaction.quantity}</p>
          <p>Trade Price: {transaction.trade_price}</p>
          <p>Currency: {transaction.currency}</p>
          <p>Status: {transaction.status}</p>
          <p>Date: {transaction.created_at}</p>
          {/* Add more details as needed */}
          <Button color="primary" onClick={closeModal}>
            Close
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TransactionDetails;
