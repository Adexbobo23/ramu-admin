import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import '../ComStyle/TransactionPin.scss';

const TransactionPin = () => {
  const [userId, setUserId] = useState('');
  const [newTransactionPin, setNewTransactionPin] = useState('');
  const [confirmTransactionPin, setConfirmTransactionPin] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminToken = localStorage.getItem('adminAuthToken');

        if (!adminToken) {
          console.error('Admin token not available');
          return;
        }

        const response = await axios.get('https://api-staging.ramufinance.com/api/v1/admin/users', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (response.data.status) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        } else {
          console.error('Error fetching users:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on the searchQuery
    const filteredData = users.filter((user) =>
      user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredData);
  }, [searchQuery, users]);

  const handleResetPin = async () => {
    try {
      const adminToken = localStorage.getItem('adminAuthToken');
  
      if (!adminToken) {
        console.error('Admin token not available');
        alert('Admin token not available');
        return;
      }
  
      if (newTransactionPin !== confirmTransactionPin) {
        setErrorMessage('New transaction PIN and confirm PIN do not match');
        return;
      }
  
      const resetPinPayload = {
        user_id: userId,
        transaction_pin: newTransactionPin,
        transaction_pin_confirmation: confirmTransactionPin,
      };
  
      const response = await axios.post(
        'https://api-staging.ramufinance.com/api/v1/admin/reset-transaction-pin',
        resetPinPayload,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.status) {
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

      {/* Search bar */}
      <Input
        type="text"
        placeholder="Search for a user..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Form>
        <FormGroup>
          <Label for="userId">Select User</Label>
          <Input
            type="select"
            name="userId"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value="" disabled>Select User</option>
            {filteredUsers.map((user) => (
              <option key={user.id} value={user.id}>{user.user_name}</option>
            ))}
          </Input>
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
        <FormGroup>
          <Label for="confirmTransactionPin">Confirm Transaction PIN</Label>
          <Input
            type="password"
            name="confirmTransactionPin"
            id="confirmTransactionPin"
            value={confirmTransactionPin}
            onChange={(e) => setConfirmTransactionPin(e.target.value)}
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
