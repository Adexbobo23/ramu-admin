import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../ComStyle/MarketMarkup.scss';

const MarketMarkup = () => {
  const [marketMarkupData, setMarketMarkupData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    markup_percentage: '',
  });
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });

  useEffect(() => {
    // Retrieve the admin token from localStorage
    const adminAuthToken = localStorage.getItem('adminAuthToken');

    if (adminAuthToken) {
      // Fetch market markup data from the backend API using the admin token for authentication
      axios
        .get('https://api-staging.ramufinance.com/api/v1/admin/stocks/get-market-markup', {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // Update the market markup state with the fetched data
          setMarketMarkupData(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching market markup data:', error);
          setAlert({ show: true, variant: 'danger', message: 'Error fetching market markup data' });
        });
    } else {
      // Handle case where admin token is not available
      console.error('Admin token is missing.');
      setAlert({ show: true, variant: 'danger', message: 'Admin token is missing' });
    }
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
    setEditFormData({
      markup_percentage: marketMarkupData.markup_percentage,
    });
  };

  const handleEditClose = () => {
    setShowModal(false);
  };

  const handleEditSubmit = () => {
    // Retrieve the admin token from localStorage
    const adminAuthToken = localStorage.getItem('adminAuthToken');

    if (adminAuthToken && marketMarkupData) {
      // Fetch market markup data from the backend API using the admin token for authentication
      axios
        .put(
          `https://api-staging.ramufinance.com/api/v1/admin/stocks/edit-market-markup/${marketMarkupData.id}`,
          editFormData,
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // Handle the response, e.g., show a success message
          console.log('Market markup edited successfully:', response.data);
          setShowModal(false);
          setAlert({ show: true, variant: 'success', message: 'Market markup edited successfully' });
        })
        .catch((error) => {
          console.error('Error editing market markup:', error);
          setAlert({ show: true, variant: 'danger', message: 'Error editing market markup' });
        });
    } else {
      // Handle case where admin token is not available or market markup data is not present
      console.error('Admin token is missing or market markup data is not present.');
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Admin token is missing or market markup data is not present',
      });
    }
  };

  const handleAlertClose = () => {
    setAlert({ show: false, variant: 'success', message: '' });
  };

  return (
    <div className="market-markup">
      <h1>Market Markup</h1>
      {alert.show && (
        <Alert variant={alert.variant} onClose={handleAlertClose} dismissible>
          {alert.message}
        </Alert>
      )}
      {marketMarkupData && (
        <table className="market-markup__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Markup Percentage</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{marketMarkupData.id}</td>
              <td>{marketMarkupData.markup_percentage}</td>
              <td>{marketMarkupData.created_at}</td>
              <td>{marketMarkupData.updated_at}</td>
              <td>
                <button className="edit-btn"  onClick={handleEditClick}>
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Market Markup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMarkupPercentage">
              <Form.Label>Markup Percentage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter markup percentage"
                value={editFormData.markup_percentage}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, markup_percentage: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MarketMarkup;
