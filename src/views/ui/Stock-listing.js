import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../ComStyle/StockListing.scss";

const StockListing = () => {
  const [stockListings, setStockListings] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [editFormData, setEditFormData] = useState({
    key: "",
    ticker_id: "",
    exchange_code: "",
    company_name: "",
    display_name: "",
    description: "",
    logo: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredStockListings, setFilteredStockListings] = useState([]);

  useEffect(() => {
    // Retrieve the authentication token from localStorage
    const adminAuthToken = localStorage.getItem("adminAuthToken");

    // Check if the authentication token is available
    if (adminAuthToken) {
      // Fetch stock listings from the backend API using the admin token for authentication
      axios
        .get("https://api-staging.ramufinance.com/api/v1/admin/stocks/get-stock-companies", {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // Update the stock listings state with the fetched data
          setStockListings(response.data.data);
          // Ensure filteredStockListings is updated initially
          setFilteredStockListings(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching stock listings:", error);
        });
    } else {
      // Handle case where authentication token is not available
      console.error("Authentication token is missing.");
    }
  }, []);

  const handleEditClick = (stock) => {
    setSelectedStock(stock);
    setEditFormData({
      key: stock.key,
      ticker_id: stock.ticker_id,
      exchange_code: stock.exchange_code,
      company_name: stock.company_name,
      display_name: stock.display_name,
      description: stock.description,
      logo: stock.logo,
    });
    setShowEditModal(true);
  };

  const handleDetailsClick = (stock) => {
    setSelectedStock(stock);
    setShowDetailsModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleDetailsClose = () => {
    setShowDetailsModal(false);
  };

  const handleEditSubmit = () => {
    // Check if selectedStock and selectedStock.id are defined
    if (selectedStock && selectedStock.id) {
      // Check if required fields are filled in
      if (editFormData.company_name && editFormData.ticker_id && editFormData.exchange_code) {
        // Retrieve the authentication token from localStorage
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        // Check if the authentication token is available
        if (adminAuthToken) {
          // Fetch stock listings from the backend API using the admin token for authentication
          axios
            .put(
              `https://api-staging.ramufinance.com/api/v1/admin/stocks/edit-stock-company/${selectedStock.id}`,
              editFormData,
              {
                headers: {
                  Authorization: `Bearer ${adminAuthToken}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              // Handle the response, e.g., show a success message
              console.log("Stock edited successfully:", response.data);
              setShowEditModal(false);
              // Display a success alert
              alert("Stock edited successfully!");
            })
            .catch((error) => {
              console.error("Error editing stock:", error);
              // Display an error alert
              alert("Error editing stock. Please try again.");
            });
        } else {
          // Handle case where authentication token is not available
          console.error("Authentication token is missing.");
          // Display an error alert
          alert("Authentication token is missing.");
        }
      } else {
        // Display an error alert if required fields are not filled in
        alert("Please fill in all required fields.");
      }
    } else {
      // Handle case where selectedStock or selectedStock.id is not defined
      console.error("Selected stock or stock ID is missing.");
      // Display an error alert
      alert("Selected stock or stock ID is missing.");
    }
  };

  const handleSearchInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    // Filter stock listings based on the search input
    const filteredStocks = stockListings.filter(
      (stock) =>
        stock.company_name.toLowerCase().includes(input) ||
        stock.ticker_id.toLowerCase().includes(input) ||
        stock.exchange_code.toLowerCase().includes(input) ||
        stock.description.toLowerCase().includes(input)
    );
    setFilteredStockListings(filteredStocks);
  };

  return (
    <div className="wallet-management">
      <h1>Stock Listings</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <table className="wallet-management__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Ticker ID</th>
            <th>Exchange Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStockListings.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.company_name}</td>
              <td>{stock.ticker_id}</td>
              <td>{stock.exchange_code}</td>
              <td>{stock.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(stock)}>
                  Edit
                </button>
                <button className="details-btn" onClick={() => handleDetailsClick(stock)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock: {selectedStock?.company_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={editFormData.company_name}
                onChange={(e) => setEditFormData({ ...editFormData, company_name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTickerId">
              <Form.Label>Ticker ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ticker ID"
                value={editFormData.ticker_id}
                onChange={(e) => setEditFormData({ ...editFormData, ticker_id: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formExchangeCode">
              <Form.Label>Exchange Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter exchange code"
                value={editFormData.exchange_code}
                onChange={(e) => setEditFormData({ ...editFormData, exchange_code: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
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

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={handleDetailsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stock Details: {selectedStock?.company_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render stock details here */}
          <p><strong>Company Name:</strong> {selectedStock?.company_name}</p>
          <p><strong>Ticker ID:</strong> {selectedStock?.ticker_id}</p>
          <p><strong>Exchange Code:</strong> {selectedStock?.exchange_code}</p>
          <p><strong>Description:</strong> {selectedStock?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StockListing;
