import React, { useState } from "react";
import axios from "axios";
import "../ComStyle/RefundCancellation.scss";

const RefundCancellation = () => {
  const [refundReason, setRefundReason] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");

  const handleRefund = () => {
    // Perform refund logic
    axios
      .post("/api/refund", { reason: refundReason })
      .then((response) => {
        console.log("Refund successful");
        // Handle success case
      })
      .catch((error) => {
        console.error("Refund failed", error);
        // Handle error case
      });
  };

  const handleCancellation = () => {
    // Perform cancellation logic
    axios
      .post("/api/cancellation", { reason: cancellationReason })
      .then((response) => {
        console.log("Cancellation successful");
        // Handle success case
      })
      .catch((error) => {
        console.error("Cancellation failed", error);
        // Handle error case
      });
  };

  return (
    <div className="refund-cancellation">
      <h2>Refund</h2>
      <textarea
        value={refundReason}
        onChange={(e) => setRefundReason(e.target.value)}
        placeholder="Enter refund reason"
        className="refund-cancellation__textarea"
      />
      <button onClick={handleRefund} className="refund-cancellation__button">
        Submit Refund
      </button>

      <h2>Cancellation</h2>
      <textarea
        value={cancellationReason}
        onChange={(e) => setCancellationReason(e.target.value)}
        placeholder="Enter cancellation reason"
        className="refund-cancellation__textarea"
      />
      <button
        onClick={handleCancellation}
        className="refund-cancellation__button"
      >
        Submit Cancellation
      </button>
    </div>
  );
};

export default RefundCancellation;
