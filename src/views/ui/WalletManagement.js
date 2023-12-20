import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/WalletManagement.scss";

const WalletManagement = () => {
  const itemsPerPage = 10; // Number of items to display per page
  const [originalWallets, setOriginalWallets] = useState([]);
  const [filteredWallets, setFilteredWallets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWallets = async () => {
    try {
      const adminAuthToken = localStorage.getItem("adminAuthToken");
      const response = await axios.get(
        "https://api-staging.ramufinance.com/api/v1/admin/fetch-wallets",
        {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        }
      );

      const data = response.data.data;
      setOriginalWallets(data);

      // Apply filters based on the selected currency and search query
      applyFilters(data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    // Apply filters when selectedCurrency or searchQuery changes
    applyFilters(originalWallets);
  }, [selectedCurrency, searchQuery, originalWallets, currentPage]);

  const applyFilters = (data) => {
    let filteredData = data;

    // Filter wallets based on the selected currency
    if (selectedCurrency) {
      filteredData = filteredData.filter(
        (wallet) => wallet.currency_code.toLowerCase() === selectedCurrency.toLowerCase()
      );
    }

    // Filter wallets based on the search query
    if (searchQuery) {
      filteredData = filteredData.filter((wallet) => {
        const emailMatch = wallet.email.toLowerCase().includes(searchQuery.toLowerCase());
        const walletAddressMatch = wallet.wallet_address.toLowerCase().includes(searchQuery.toLowerCase());
        const accountReferenceMatch = wallet.account_reference.toLowerCase().includes(searchQuery.toLowerCase());
        const currencyCodeMatch = wallet.currency_code.toLowerCase().includes(searchQuery.toLowerCase());
        const balanceMatch = wallet.balance.toLowerCase().includes(searchQuery.toLowerCase());

        return emailMatch || walletAddressMatch || accountReferenceMatch || currencyCodeMatch || balanceMatch;
      });
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredWallets(filteredData.slice(startIndex, endIndex));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger a re-fetch when the search query changes
    fetchWallets();
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages based on the number of items and itemsPerPage
  const totalPages = Math.ceil(filteredWallets.length / itemsPerPage);

  return (
    <div className="wallet-management">
      <h1>Wallet Management</h1>
      <Form onSubmit={handleSearch}>
        <FormGroup>
          <Label for="searchQuery">Search Wallet</Label>
          <div className="search-form">
            <Input
              type="text"
              name="searchQuery"
              id="searchQuery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <Button type="submit" className="search-button">
              Search
            </Button>
          </div>
        </FormGroup>
      </Form>
      <Form>
        <FormGroup>
          <Label for="currencyFilter">Filter by Currency</Label>
          <Input
            type="select"
            name="currencyFilter"
            id="currencyFilter"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="">All Currencies</option>
            <option value="USD">Dollar</option>
            <option value="NGN">Naira</option>
            {/* Add more currency options as needed */}
          </Input>
        </FormGroup>
      </Form>
      <Table striped className="wallet-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Wallet Address</th>
            <th>Account Reference</th>
            <th>Currency Code</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredWallets.map((wallet) => (
            <tr key={wallet.id}>
              <td>{wallet.email}</td>
              <td>{wallet.wallet_address}</td>
              <td>{wallet.account_reference}</td>
              <td>{wallet.currency_code}</td>
              <td>{wallet.balance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WalletManagement;
