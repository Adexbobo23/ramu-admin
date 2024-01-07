import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button, Modal, ModalBody } from "reactstrap";
import axios from "axios";
import "../ComStyle/WalletManagement.scss";

const WalletManagement = () => {
  const itemsPerPage = 10;
  const [originalWallets, setOriginalWallets] = useState([]);
  const [filteredWallets, setFilteredWallets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

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
      applyFilters(data);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    applyFilters(originalWallets);
  }, [selectedCurrency, searchQuery, originalWallets, currentPage]);

  const applyFilters = (data) => {
    let filteredData = data;

    if (selectedCurrency) {
      filteredData = filteredData.filter(
        (wallet) => wallet.currency_code.toLowerCase() === selectedCurrency.toLowerCase()
      );
    }

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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredWallets(filteredData.slice(startIndex, endIndex));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWallets();
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
            <th>Actions</th>
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
              <td>
                <Button onClick={() => handleWalletClick(wallet)}>
                  View Wallet Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalBody>
          <h5>Wallet Details</h5>
          <p><strong>Email:</strong> {selectedWallet?.email}</p>
          <p><strong>Wallet Address:</strong> {selectedWallet?.wallet_address}</p>
          <p><strong>Account Reference:</strong> {selectedWallet?.account_reference}</p>
          <p><strong>Currency Code:</strong> {selectedWallet?.currency_code}</p>
          <p><strong>Balance:</strong> {selectedWallet?.balance}</p>
          <Button color="primary" onClick={toggleModal}>
            Close
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WalletManagement;
