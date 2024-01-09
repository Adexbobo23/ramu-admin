import React, { useState } from "react";
import axios from "axios";
import "../ComStyle/AddStock.scss";

const AddStock = () => {
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [exchangeCode, setExchangeCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState("");
  const [logo, setLogo] = useState(null); // Change to null as it will hold a file

  const handleAddStock = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        alert("Admin token not available");
        return;
      }

      const formData = new FormData();
      formData.append("key", "");
      formData.append("ticker_id", ""); 
      formData.append("exchange_code", exchangeCode);
      formData.append("company_name", companyName);
      formData.append("display_name", displayName);
      formData.append("description", description);
      formData.append("sector", sector);
      formData.append("logo", logo); 

      const response = await axios.post(
        "https://api-staging.ramufinance.com/api/v1/admin/stocks/add-stock-company",
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Stock added successfully");
        // Optionally, you can handle success scenarios here
        // Reset the form fields after adding the stock
        setStockName("");
        setStockPrice("");
        setExchangeCode("");
        setCompanyName("");
        setDisplayName("");
        setDescription("");
        setSector("");
        setLogo(null); // Reset the file input
      } else {
        console.error("Error adding stock:", response.data.message);
        alert(`Error adding stock: ${response.data.message}`);
      }
    } catch (error) {
      console.error("An error occurred while adding stock:", error);
      alert(`An error occurred while adding stock: ${error.message}`);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  return (
    <div className="add-stock">
      <h2>Add New Stock</h2>
      <form>
        <div className="form-group">
          <label htmlFor="stockName">Stock Name</label>
          <input
            type="text"
            id="stockName"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockPrice">Stock Price</label>
          <input
            type="number"
            id="stockPrice"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exchangeCode">Exchange Code</label>
          <input
            type="text"
            id="exchangeCode"
            value={exchangeCode}
            onChange={(e) => setExchangeCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sector">Sector</label>
          <input
            type="text"
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            id="logo"
            accept="image/*" 
            onChange={handleLogoChange}
          />
        </div>
        <button type="button" onClick={handleAddStock}>
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
