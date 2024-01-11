import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import '../ComStyle/TransactionPin.scss'; 

const TransactionPin = () => {
  const [userId, setUserId] = useState('');
  const [newTransactionPin, setNewTransactionPin] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPin = async () => {
    try {
      const adminToken = localStorage.getItem('adminAuthToken');

      if (!adminToken) {
        console.error('Admin token not available');
        alert('Admin token not available');
        return;
      }

      const resetPinPayload = {
        user_id: userId,
        new_transaction_pin: newTransactionPin,
      };

      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/admin/reset-transaction-pin',
        resetPinPayload,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setIsSuccess(true);
        setErrorMessage('');
        alert('Transaction PIN reset successfully');
      } else {
        setIsSuccess(false);
        setErrorMessage(response.data.message || 'Error resetting transaction PIN');
        alert(`Error resetting transaction PIN: ${errorMessage}`);
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage(error.message || 'An error occurred while resetting transaction PIN');
      console.error('An error occurred while resetting transaction PIN:', error);
      alert(`An error occurred while resetting transaction PIN: ${errorMessage}`);
    }
  };

  return (
    <div className="transaction-pin-container">
      <h1>Reset Transaction PIN</h1>
      <Form>
        <FormGroup>
          <Label for="userId">User ID</Label>
          <Input
            type="text"
            name="userId"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="newTransactionPin">New Transaction PIN</Label>
          <Input
            type="password"
            name="newTransactionPin"
            id="newTransactionPin"
            value={newTransactionPin}
            onChange={(e) => setNewTransactionPin(e.target.value)}
            required
          />
        </FormGroup>
        <Button color="primary" onClick={handleResetPin}>
          Reset Transaction PIN
        </Button>
      </Form>
      {isSuccess && <p className="success-message">Transaction PIN reset successfully!</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TransactionPin;
