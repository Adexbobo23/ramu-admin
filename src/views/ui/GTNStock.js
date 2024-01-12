import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import '../ComStyle/GTNStock.scss';

const GTNStock = () => {
  const [gtnStocks, setGTNStocks] = useState([]);

  useEffect(() => {
    // Fetch adminAuthToken from local storage
    const adminAuthToken = localStorage.getItem("adminAuthToken");

    // Check if adminAuthToken is available
    if (!adminAuthToken) {
      console.error("Admin authentication token not found in local storage.");
      return;
    }

    // Fetch GTN stocks data from the API
    axios.get("https://api-staging.ramufinance.com/api/v1/admin/get-gtn-stocks?exchange_code=CHIX&page=2&row=10", {
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
      },
    })
      .then(response => {
        const { data } = response.data;
        setGTNStocks(data.docs);
      })
      .catch(error => {
        console.error("Error fetching GTN stocks:", error);
        // You can add additional error handling logic here (e.g., show an error message)
      });
  }, []);

  return (
    <Table striped className="gtn-stocks-table">
      <thead>
        <tr>
          <th>Ticker ID</th>
          <th>Short Description</th>
          <th>Long Description</th>
          <th>Market ID</th>
          <th>Currency ID</th>
          {/* Add more columns as needed */}
        </tr>
      </thead>
      <tbody>
        {gtnStocks.map((stock) => (
          <tr key={stock.TICKER_ID}>
            <td>{stock.TICKER_ID}</td>
            <td>{stock.SHORT_DESCRIPTION}</td>
            <td>{stock.LONG_DESCRIPTION}</td>
            <td>{stock.MARKET_ID}</td>
            <td>{stock.CURRENCY_ID}</td>
            {/* Add more columns as needed */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GTNStock;
