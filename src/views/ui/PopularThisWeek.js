import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../ComStyle/StockListing.scss";

const PopularThisWeek = () => {
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
  const [logoFile, setLogoFile] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    // Fetch all sectors when the component mounts
    const fetchSectors = async () => {
      try {
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        if (!adminAuthToken) {
          console.error("Admin token not available");
          return;
        }

        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/get-sectors",
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        if (response.data.status) {
          setSectors(response.data.data);
        } else {
          console.error("Error fetching sectors:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);


  useEffect(() => {
    // Retrieve the authentication token from localStorage
    const adminAuthToken = localStorage.getItem("adminAuthToken");

    // Check if the authentication token is available
    if (adminAuthToken) {
      // Fetch stock listings from the backend API using the admin token for authentication
      axios
        .get('https://api-staging.ramufinance.com/api/v1/top-trending-stocks', {
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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    setEditFormData({ ...editFormData, logo: file.name });
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
    const requiredFields = ['key', 'ticker_id', 'exchange_code', 'company_name', 'display_name', 'description'];
    const missingField = requiredFields.find((field) => !editFormData[field]);
  
    if (missingField) {
      alert(`Please fill in the required field: ${missingField}`);
      return;
    }
  
    // Append values from editFormData to formData
    Object.entries(editFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });

     // Append values from editFormData to formData
      // Object.entries(editFormData).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
  
    const adminAuthToken = localStorage.getItem("adminAuthToken");
  
    if (adminAuthToken) {
      axios
        .post(
          `https://api-staging.ramufinance.com/api/v1/admin/stocks/edit-stock-company/${selectedStock.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Stock edited successfully:", response.data);
          setShowEditModal(false);
          alert("Stock edited successfully!");
        })
        .catch((error) => {
          console.error("Error editing stock:", error.response);
  
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessages = error.response.data.message;
  
            // Display specific error messages for each field
            let errorMessageText = "Error editing stock:";
            Object.keys(errorMessages).forEach((field) => {
              const errorMessage = errorMessages[field][0];
              errorMessageText += `\n${field}: ${errorMessage}`;
            });
            alert(errorMessageText);
          } else {
            alert("Error editing stock. Please try again.");
          }
        });
    } else {
      console.error("Authentication token is missing.");
      alert("Authentication token is missing.");
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
      <h1>Popular Stock Listings</h1>
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
            <th>Logo</th>
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
              <td>
                {stock.logo && (
                  <img src={stock.logo} alt={`${stock.company_name} Logo`} style={{ width: '50px', height: '50px' }} />
                )}
              </td>
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
            <Form.Group controlId="formSector">
            <Form.Label>Sector</Form.Label>
            <Form.Control
              as="select"
              value={editFormData.market_sector_id}
              onChange={(e) =>
                setEditFormData({ ...editFormData, market_sector_id: e.target.value })
              }
            >
              <option value="">Select a Sector</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </Form.Control>
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
            <Form.Group controlId="formLogo">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" onChange={handleLogoChange} />
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

export default PopularThisWeek;
