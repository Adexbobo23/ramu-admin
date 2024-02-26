import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Button, Form, FormControl } from "react-bootstrap";
import "../ComStyle/AddFeatureStock.scss";

const AddPopularStock = () => {
  const [stockCompanies, setStockCompanies] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const adminAuthToken = localStorage.getItem("adminAuthToken");

  useEffect(() => {
    if (!adminAuthToken) {
      console.error("Admin token not available");
      return;
    }

    // Fetch stock companies from the API
    const fetchStockCompanies = async () => {
      try {
        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/admin/stocks/get-stock-companies",
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );
        const { data } = response.data;
        setStockCompanies(data);
      } catch (error) {
        console.error("Error fetching stock companies:", error);
      }
    };

    fetchStockCompanies();
  }, [adminAuthToken]);

  const handleAssignClick = () => {
    if (!selectedStock) {
      alert("Please select a stock to assign.");
      return;
    }

    // Call the API to assign the selected stock
    const payload = { stock_market_id: selectedStock.id };
    axios
      .post(
        "https://api-staging.ramufinance.com/api/v1/admin/stocks/add-popular-stock",
        payload,
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Stock assigned successfully:", response.data);
        alert("Stock assigned successfully!");
      })
      .catch((error) => {
        console.error("Error assigning stock:", error);
        alert("Error assigning stock. Please try again.");
      });
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStockCompanies = stockCompanies.filter((stock) =>
    stock.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="add-feature-stock">
      <h2>Add Popular Stock</h2>
      <Form inline className="search-form">
        <FormControl
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Form>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-stock">
          {selectedStock ? selectedStock.company_name : "Select Stock"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {filteredStockCompanies.map((stock) => (
            <Dropdown.Item
              key={stock.id}
              onClick={() => handleStockSelect(stock)}
            >
              {stock.company_name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="success" onClick={handleAssignClick} className="mt-3">
        Assign Feature Stock
      </Button>
    </div>
  );
};

export default AddPopularStock;
