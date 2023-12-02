import React, { useState, useEffect } from "react";
import "../ComStyle/StockListing.scss"

const StockListing = () => {
  const [stockListings, setStockListings] = useState([]);

  useEffect(() => {
    // Fetch stock listings from the backend API
    fetch("https://api.example.com/stock-listings")
      .then((response) => response.json())
      .then((data) => {
        // Update the stock listings state with the fetched data
        setStockListings(data);
      })
      .catch((error) => {
        console.error("Error fetching stock listings:", error);
      });
  }, []);

  return (
    <div>
      <h1>Stock Listings</h1>
      {/* Render the stock listings */}
      {stockListings.map((stock) => (
        <div key={stock.id}>
          <h2>{stock.name}</h2>
          <p>Price: {stock.price}</p>
          {/* Additional stock information */}
        </div>
      ))}
    </div>
  );
};

export default StockListing;
