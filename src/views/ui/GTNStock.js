import React, { useState, useEffect } from "react";
import { Table, Form, FormControl, Pagination, Dropdown, Spinner } from "react-bootstrap";
import axios from "axios";
import '../ComStyle/GTNStock.scss';

const GTNStock = () => {
  const [gtnStocks, setGTNStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [adminAuthToken] = useState(localStorage.getItem("adminAuthToken"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!adminAuthToken || !selectedExchange) return;

    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api-staging.ramufinance.com/api/v1/admin/get-gtn-stocks?exchange_code=${selectedExchange}&page=2&row=1000`, {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        });
        const { data } = response.data;
        setGTNStocks(data.docs);
      } catch (error) {
        console.error("Error fetching GTN stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [adminAuthToken, selectedExchange]);

  const handleExchangeChange = (exchange) => {
    setSelectedExchange(exchange);
  };

  const handleSearchChange = (e) => {
    setCurrentPage(1); 
    setSearchTerm(e.target.value);
  };

  const filteredItems = gtnStocks.filter((stock) =>
    Object.values(stock).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="gtn-stocks-container">
      <Dropdown className="exchange-dropdown">
        <Dropdown.Toggle variant="secondary" id="dropdown-exchange">
          {selectedExchange ? `${selectedExchange} - Exchange` : "Select Exchange"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleExchangeChange("LSE")}>LSE - London stock</Dropdown.Item>
          <Dropdown.Item onClick={() => handleExchangeChange("CHIX")}>CHIX - European</Dropdown.Item>
          <Dropdown.Item onClick={() => handleExchangeChange("NSDQ")}>NSDQ - USA</Dropdown.Item>
          <Dropdown.Item onClick={() => handleExchangeChange("NYSE")}>NYSE - USA</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Form inline className="search-form">
        <FormControl
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
      </Form>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      ) : (
        <Table striped bordered hover className="gtn-stocks-table">
          <thead>
            <tr>
              <th>Ticker ID</th>
              <th>Source ID</th>
              <th>KEY</th>
              <th>Short Description</th>
              <th>Long Description</th>
              <th>Market ID</th>
              <th>Currency ID</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((stock) => (
              <tr key={stock.TICKER_ID}>
                <td>{stock.TICKER_ID}</td>
                <td>{stock.SOURCE_ID}</td>
                <td>{stock.SOURCE_ID}~{stock.TICKER_ID}</td>
                <td>{stock.SHORT_DESCRIPTION}</td>
                <td>{stock.LONG_DESCRIPTION}</td>
                <td>{stock.MARKET_ID}</td>
                <td>{stock.CURRENCY_ID}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
