import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../ComStyle/MarketMarkup.scss';

const MarketMarkup = () => {
  const [marketMarkupData, setMarketMarkupData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    markup_percentage: '',
  });
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });
  const [selectedMarkupId, setSelectedMarkupId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminAuthToken = localStorage.getItem('adminAuthToken');

        if (!adminAuthToken) {
          console.error('Admin token is missing.');
          throw new Error('Admin token is missing');
        }

        const response = await axios.get(
          'https://api-staging.ramufinance.com/api/v1/admin/stocks/get-market-markup',
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setMarketMarkupData(response.data.data);
      } catch (error) {
        console.error('Error fetching market markup data:', error);
        setAlert({ show: true, variant: 'danger', message: 'Error fetching market markup data' });
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (data) => {
    setShowModal(true);
    setEditFormData({
      markup_percentage: data.markup_percentage,
    });
    setSelectedMarkupId(data.id);
  };

  const handleEditClose = () => {
    setShowModal(false);
  };

  const handleEditSubmit = async () => {
    try {
      const adminAuthToken = localStorage.getItem('adminAuthToken');

      if (!adminAuthToken || !selectedMarkupId) {
        console.error('Admin token is missing or selected markup ID is not present.');
        throw new Error('Admin token is missing or selected markup ID is not present');
      }

      await axios.put(
        `https://api-staging.ramufinance.com/api/v1/admin/stocks/edit-market-markup/${selectedMarkupId}`, 
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Refetch the updated data after a successful edit
      const updatedResponse = await axios.get(
        'https://api-staging.ramufinance.com/api/v1/admin/stocks/get-market-markup',
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMarketMarkupData(updatedResponse.data.data);
      setShowModal(false);
      setAlert({ show: true, variant: 'success', message: 'Market markup edited successfully' });
    } catch (error) {
      console.error('Error editing market markup:', error);
      setAlert({ show: true, variant: 'danger', message: 'Error editing market markup' });
    }
  };



  const handleAlertClose = () => {
    setAlert({ show: false, variant: 'success', message: '' });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="market-markup">
      <h1>Market Markup</h1>
      {alert.show && (
        <Alert variant={alert.variant} onClose={handleAlertClose} dismissible>
          {alert.message}
        </Alert>
      )}
      {marketMarkupData.length > 0 && (
        <table className="market-markup__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Markup Percentage</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {marketMarkupData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.category}</td>
                <td>{data.markup_percentage}</td>
                <td>{formatDate(data.created_at)}</td>
                <td>{formatDate(data.updated_at)}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(data)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
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
