import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Pagination } from "react-bootstrap";
import axios from "axios";
import '../ComStyle/GTNStock.scss';

const GTNStock = () => {
  const [gtnStocks, setGTNStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch adminAuthToken from local storage
    const adminAuthToken = localStorage.getItem("adminAuthToken");

    // Check if adminAuthToken is available
    if (!adminAuthToken) {
      console.error("Admin authentication token not found in local storage.");
      return;
    }

    // Fetch GTN stocks data from the API
    axios.get(`https://api-staging.ramufinance.com/api/v1/admin/get-gtn-stocks?exchange_code=CHIX&page=2&row=1000`, {
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
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gtnStocks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setCurrentPage(1); 
    setSearchTerm(e.target.value);
  };

  const filteredItems = gtnStocks.filter((stock) =>
    Object.values(stock).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={handleSearchChange}
        />
      </Form>
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
          {filteredItems.map((stock) => (
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
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        />
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default GTNStock;
