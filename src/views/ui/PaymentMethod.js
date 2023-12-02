import React, { useState } from "react";
import { Button } from "reactstrap";
import "../ComStyle/PaymentMethods.scss";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState("");

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.trim() !== "") {
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setNewPaymentMethod("");
    }
  };

  const handleDeletePaymentMethod = (index) => {
    const updatedMethods = [...paymentMethods];
    updatedMethods.splice(index, 1);
    setPaymentMethods(updatedMethods);
  };

  return (
    <div className="payment-methods-container">
      <h1>Add Payment Methods</h1>
      <div className="payment-methods-list">
        {paymentMethods.map((method, index) => (
          <div className="payment-method" key={index}>
            <p>{method}</p>
            <Button
              color="green"
              className="delete-button"
              onClick={() => handleDeletePaymentMethod(index)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div className="add-payment-method">
        <input
          type="text"
          placeholder="Enter payment method"
          value={newPaymentMethod}
          onChange={(e) => setNewPaymentMethod(e.target.value)}
        />
        <Button color="green" onClick={handleAddPaymentMethod}>
          Add Payment Method
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
