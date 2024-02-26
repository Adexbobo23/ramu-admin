import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../ComStyle/StockListing.scss";

const PopularStocks = () => {
  const [stockListings, setStockListings] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredStockListings, setFilteredStockListings] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [sectors, setSectors] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

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
        .get('https://api-staging.ramufinance.com/api/v1/get-popular-stocks', {
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

  
  const handleDeleteClick = (id) => {
    const adminAuthToken = localStorage.getItem("adminAuthToken");
  
    if (adminAuthToken) {
      axios
        .delete(
          `https://api-staging.ramufinance.com/api/v1/admin/stocks/delete-popular-stock/${id}`,
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
              "Content-Type": "application/json",
            },
            data: {
              stock_market_id: id
            }
          }
        )
        .then((response) => {
          console.log("Stock deleted successfully:", response.data);
          alert("Stock deleted successfully!");
          // Update the stock listings after deletion
          const updatedStockListings = stockListings.filter(stock => stock.id !== id);
          setStockListings(updatedStockListings);
          setFilteredStockListings(updatedStockListings);
        })
        .catch((error) => {
          console.error("Error deleting stock:", error.response);
          const errorMessage = error.response.data.message || "Error deleting stock. Please try again.";
          alert(errorMessage);
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

  const handleDetailsClick = (stock) => {
    setSelectedStock(stock);
    setShowDetailsModal(true);
  };

  const handleDetailsClose = () => {
    setShowDetailsModal(false);
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
                <div className="row button-container">
                  <div className="col">
                    <button className="details-btn" onClick={() => handleDetailsClick(stock)}>
                      Details
                    </button>
                  </div>
                  <div className="col">
                    <button className="btn btn-danger ml-0" onClick={() => handleDeleteClick(stock.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default PopularStocks;
