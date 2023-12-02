import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ComStyle/TransactionDetails.scss"

const TransactionDetails = ({ transactionId }) => {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // Fetch transaction details from the backend using transactionId
    axios
      .get(`/api/transactions/${transactionId}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [transactionId]);

  if (!transaction) {
    return <div>Loading transaction details...</div>;
  }

  return (
    <div>
      <h2>Transaction Details</h2>
      <div>
        <strong>Transaction ID:</strong> {transaction.id}
      </div>
      <div>
        <strong>Amount:</strong> {transaction.amount}
      </div>
      <div>
        <strong>Date:</strong> {transaction.date}
      </div>
      {/* Render additional transaction details */}
    </div>
  );
};

export default TransactionDetails;
