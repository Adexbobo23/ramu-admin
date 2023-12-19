import React, { useState, useEffect } from "react";
import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/WalletManagement.scss";

const WalletManagement = () => {
  const [wallets, setWallets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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
        setWallets(response.data.data);
      } catch (error) {
        console.error("Error fetching wallets:", error);
      }
    };

    fetchWallets();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  
    // Filter wallets based on the search query
    const filteredWallets = wallets.filter((wallet) => {
      const emailMatch = wallet.email.toLowerCase().includes(searchQuery.toLowerCase());
      const walletAddressMatch = wallet.wallet_address.toLowerCase().includes(searchQuery.toLowerCase());
      const accountReferenceMatch = wallet.account_reference.toLowerCase().includes(searchQuery.toLowerCase());
      const currencyCodeMatch = wallet.currency_code.toLowerCase().includes(searchQuery.toLowerCase());
      const balanceMatch = wallet.balance.toLowerCase().includes(searchQuery.toLowerCase());
  
      return emailMatch || walletAddressMatch || accountReferenceMatch || currencyCodeMatch || balanceMatch;
    });
  
    // Update the state with filtered wallets
    setWallets(filteredWallets);
  };
  

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
          {wallets.map((wallet) => (
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
    </div>
  );
};

export default WalletManagement;
