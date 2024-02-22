import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/AddStock.scss";

const AddPopular = () => {
  const [exchangeCode, setExchangeCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [tickerId, setTickerId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [sectorOptions, setSectorOptions] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const adminToken = localStorage.getItem("adminAuthToken");

        if (!adminToken) {
          console.error("Admin token not available");
          return;
        }

        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/get-sectors",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.data.status) {
          setSectorOptions(response.data.data);
        } else {
          console.error("Error fetching sectors:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);

  const handleAddStock = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        alert("Admin token not available");
        return;
      }

      const formData = new FormData();
      formData.append("key", keyValue); 
      formData.append("ticker_id", tickerId);
      formData.append("exchange_code", exchangeCode);
      formData.append("company_name", companyName);
      formData.append("display_name", displayName);
      formData.append("description", description);
      formData.append("market_sector_id", selectedSector);
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
        alert('Stock Added Successfully')
        setExchangeCode("");
        setCompanyName("");
        setKeyValue("");
        setTickerId("");
        setDisplayName("");
        setDescription("");
        setSelectedSector("");
        setLogo(null); 
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
      <h2>Add Popular Stock</h2>
      <form>
      <div className="form-group">
          <label htmlFor="key">Key</label>
          <input
            type="text"
            id="key"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tickerId">Ticker ID</label>
          <input
            type="text"
            id="tickerId"
            value={tickerId}
            onChange={(e) => setTickerId(e.target.value)}
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
          <select
            id="sector"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="" disabled>
              Select a Sector
            </option>
            {sectorOptions.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
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

export default AddPopular;
