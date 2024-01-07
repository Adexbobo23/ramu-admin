import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, ModalBody, Button, Input } from "reactstrap";
import "../ComStyle/TransactionDetails.scss";
import { CSVLink } from "react-csv";

const TransactionDetails = ({ transactionId }) => {
  const [transaction, setTransaction] = useState(null);
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const [selectedDate, setSelectedDate] = useState(null);


  const handleExportCSV = () => {
    // Check if there is data to export
    if (filteredTransaction.length === 0) {
      console.warn("No data to export.");
      return;
    }

    // Create CSV data array with header and rows
    const csvData = [
      ["Wallet Address", "Transaction Type", "Amount", "Quantity", "Trade Price", "Currency", "Status", "Date"],
      ...filteredTransaction.map((transactionItem) => [
        transactionItem.wallet_address,
        transactionItem.txn_type,
        transactionItem.amount,
        transactionItem.quantity,
        transactionItem.trade_price,
        transactionItem.currency,
        transactionItem.status,
        transactionItem.created_at,
      ]),
    ];

    // Create a CSV file name
    const fileName = "transaction_data.csv";

    // Trigger the CSV download
    const csvLink = document.createElement("a");
    const csvBlob = new Blob([csvData.map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    csvLink.href = csvUrl;
    csvLink.download = fileName;
    csvLink.click();

    // Cleanup
    URL.revokeObjectURL(csvUrl);
  };

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const adminAuthToken = localStorage.getItem("adminAuthToken");

        if (!adminAuthToken) {
          console.error("Admin authentication token not available");
          return;
        }

        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/admin/get-wallet-transactions",
          {
            headers: {
              Authorization: `Bearer ${adminAuthToken}`,
            },
          }
        );

        const transactionData = response.data.data;

        setTransaction(transactionData);
        setFilteredTransaction(transactionData);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = () => {
    if (!transaction) {
      return;
    }

    const filteredData = transaction.filter((item) => {
      const containsSearchQuery = Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      const containsSelectedDate =
        !selectedDate || item.created_at.includes(selectedDate);

      return containsSearchQuery && containsSelectedDate;
    });

    setFilteredTransaction(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedDate]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransaction.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!transaction) {
    return <div>Loading transaction details...</div>;
  }

  return (
    <div className="transaction-details">
      <h2>Transaction Details</h2>

      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        {/* Placeholder for Date Picker */}
        {/* Replace with appropriate DatePicker component */}
        {/* <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select Date"
        /> */}
      </div>

      {/* Button to export data as CSV */}
      <Button color="success" onClick={handleExportCSV}>
        Export as CSV
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Trade Price</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transactionItem) => (
            <tr key={transactionItem.id} onClick={openModal}>
              <td>{transactionItem.wallet_address}</td>
              <td>{transactionItem.txn_type}</td>
              <td>{transactionItem.amount}</td>
              <td>{transactionItem.quantity}</td>
              <td>{transactionItem.trade_price}</td>
              <td>{transactionItem.currency}</td>
              <td>{transactionItem.status}</td>
              <td>{transactionItem.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(filteredTransaction.length / transactionsPerPage) },
          (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>

      <Modal isOpen={isModalOpen} toggle={closeModal}>
        <ModalBody>
          <h5>Transaction Details</h5>
          <br />
          <p>Wallet Address: {transaction.wallet_address}</p>
          <p>Transaction Type: {transaction.txn_type}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Quantity: {transaction.quantity}</p>
          <p>Trade Price: {transaction.trade_price}</p>
          <p>Currency: {transaction.currency}</p>
          <p>Status: {transaction.status}</p>
          <p>Date: {transaction.created_at}</p>
          <Button color="primary" onClick={closeModal}>
            Close
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TransactionDetails;
