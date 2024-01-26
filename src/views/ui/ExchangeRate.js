import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../ComStyle/ExchangeRate.scss';

const ExchangeRate = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [ngnToUsd, setNgnToUsd] = useState('');
  const [usdToNgn, setUsdToNgn] = useState('');
  const [adminToken] = useState(localStorage.getItem('adminAuthToken'));
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api-staging.ramufinance.com/api/v1/exchange-rate', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (response.data.status) {
          setExchangeRates([response.data.data]);
        } else {
          console.error('Error fetching exchange rates:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [adminToken]);

  const handleEdit = (rate) => {
    setSelectedRate(rate);
    setNgnToUsd(rate.ngn_usd);
    setUsdToNgn(rate.usd_ngn);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedRate(null);
    setNgnToUsd('');
    setUsdToNgn('');
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `https://api-staging.ramufinance.com/api/v1/edit-exchange-rate/${selectedRate.id}`,
        {
          ngn_usd: parseFloat(ngnToUsd),
          usd_ngn: parseFloat(usdToNgn),
        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data.status) {
        // Update the exchange rate in the state
        setExchangeRates((prevRates) =>
          prevRates.map((rate) => (rate.id === selectedRate.id ? response.data.data : rate))
        );

        // Show success alert
        setAlertMessage('Exchange rate edited successfully');
        setAlertType('success');

        // Close the modal
        handleClose();
      } else {
        // Show error alert
        setAlertMessage(response.data.message || 'Error editing exchange rate');
        setAlertType('danger');
      }
    } catch (error) {
      console.error('An error occurred while editing exchange rate:', error);
      // Show error alert
      setAlertMessage('An error occurred while editing exchange rate');
      setAlertType('danger');
    }
  };

  const handleAlertClose = () => {
    // Clear alert message
    setAlertMessage('');
    setAlertType('');
  };

  return (
    <div className="exchange-rate-container">
      <h1>Exchange Rates</h1>
      {alertMessage && (
        <Alert variant={alertType} onClose={handleAlertClose} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NGN to USD</th>
            <th>USD to NGN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate) => (
            <tr key={rate.id}>
              <td>{rate.id}</td>
              <td>{rate.ngn_usd}</td>
              <td>{rate.usd_ngn}</td>
              <td>
                <Button variant="success" onClick={() => handleEdit(rate)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Exchange Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="ngnToUsd">
              <Form.Label>NGN to USD</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter NGN to USD"
                value={ngnToUsd}
                onChange={(e) => setNgnToUsd(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="usdToNgn">
              <Form.Label>USD to NGN</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter USD to NGN"
                value={usdToNgn}
                onChange={(e) => setUsdToNgn(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExchangeRate;
