import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../ComStyle/AdminLogin.scss';

const AdminLogin = ({ onAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      // Log the entire data object for inspection
      console.log('Response Data:', data);
  
      if (response.ok) {
        const authToken = data.data.token; // Update to access the correct field
  
        // Check if authToken is available before storing it
        if (authToken) {
          // Store the authentication token in localStorage
          localStorage.setItem('adminAuthToken', authToken);
  
          onAuthentication();
          setShowModal(true);
        } else {
          setError('Authentication token is missing in the response.');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
  
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-title">ADMIN LOGIN</h1>
      {error && <p className="admin-login-error">{error}</p>}
      <div className="admin-login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="admin-login-button" onClick={handleLogin}>
          Login
        </button>
      </div>

      {/* Modal for Successful Login */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your login was successful. You can now access the admin dashboard.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminLogin;
