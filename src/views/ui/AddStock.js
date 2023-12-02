import React, { useState } from "react";
import "../ComStyle/AddStock.scss";

const AddStock = () => {
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState("");

  const handleAddStock = () => {
    // Here you can implement the logic to add the stock to the backend using an API
    // For this example, we'll just log the stock data to the console
    console.log("Stock Name:", stockName);
    console.log("Stock Price:", stockPrice);

    // Reset the form fields after adding the stock
    setStockName("");
    setStockPrice("");
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
        <button type="button" onClick={handleAddStock}>
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
