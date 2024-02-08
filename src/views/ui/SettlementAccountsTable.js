import React, { useState, useEffect } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from "reactstrap";
import axios from "axios";
import '../ComStyle/SettlementAccountsTable.scss';

const SettlementAccountsTable = () => {
  const [settlementAccounts, setSettlementAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage] = useState(10);
  const [modal, setModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [editedAccount, setEditedAccount] = useState({
    user: {
      email: '',
    },
    bank_code: '',
    beneficiary_bank_name: '',
    account_number: '',
    beneficiary_account_name: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchSettlementAccounts = async () => {
      try {
        const adminAuthToken = localStorage.getItem("adminAuthToken");
        if (!adminAuthToken) {
          console.error("Admin authentication token not found in local storage.");
          return;
        }
        const response = await axios.get("https://api-staging.ramufinance.com/api/v1/admin/settlement-accounts", {
          headers: {
            Authorization: `Bearer ${adminAuthToken}`,
          },
        });
        setSettlementAccounts(response.data.data);
      } catch (error) {
        console.error("Error fetching settlement accounts:", error);
      }
    };
    fetchSettlementAccounts();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const viewDetails = (account) => {
    setSelectedAccount(account);
    toggleModal();
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setEditedAccount({ ...account });
    toggleModal();
  };

  const handleSave = () => {
    const adminAuthToken = localStorage.getItem("adminAuthToken");
    if (!adminAuthToken) {
      console.error("Admin authentication token not found in local storage.");
      return;
    }
    axios.put(`https://api-staging.ramufinance.com/api/v1/admin/edit-settlement-account/${selectedAccount.id}`, editedAccount, {
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
      },
    })
      .then(response => {
        console.log("Edit successful:", response.data);
        setSuccessMessage("Account edited successfully!");
        window.alert("Account edited successfully!");
      })
      .catch(error => {
        console.error("Error editing account:", error);
      });
    toggleModal();
  };

  const handleDelete = (accountId) => {
    const adminAuthToken = localStorage.getItem("adminAuthToken");
    if (!adminAuthToken) {
      console.error("Admin authentication token not found in local storage.");
      return;
    }
    axios.delete(`https://api-staging.ramufinance.com/api/v1/admin/delete-settlement-account/${accountId}`, {
      headers: {
        Authorization: `Bearer ${adminAuthToken}`,
      },
    })
      .then(response => {
        console.log("Delete successful:", response.data);
        setSuccessMessage("Account deleted successfully!");
        // Handle local state update or refetch settlement accounts
        window.alert("Account deleted successfully!");
      })
      .catch(error => {
        console.error("Error deleting account:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount({
      ...editedAccount,
      [name]: value,
    });
  };

  const totalPages = Math.ceil(settlementAccounts.length / accountsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = settlementAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  return (
    <div className="container">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <Table striped className="settlement-accounts-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Bank Code</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Account Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map((account) => (
            <tr key={account.id}>
              <td>{account.user.email}</td>
              <td>{account.bank_code}</td>
              <td>{account.beneficiary_bank_name}</td>
              <td>{account.account_number}</td>
              <td>{account.beneficiary_account_name}</td>
              <td>
                <Button color="info" onClick={() => handleEdit(account)}>
                  Edit
                </Button>{" "}
                <Button color="success" onClick={() => viewDetails(account)}>
                  View
                </Button>{" "}
                <Button color="danger" onClick={() => handleDelete(account.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <a className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Account</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={editedAccount.user?.email || ''} />
          </FormGroup>
          <FormGroup>
            <Label for="bankCode">Bank Code</Label>
            <Input type="text" name="bankCode" id="bankCode" value={editedAccount.bank_code || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="bankName">Bank Name</Label>
            <Input type="text" name="bankName" id="bankName" value={editedAccount.beneficiary_bank_name || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountNumber">Account Number</Label>
            <Input type="text" name="accountNumber" id="accountNumber" value={editedAccount.account_number || ''} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label for="accountName">Account Name</Label>
            <Input type="text" name="accountName" id="accountName" value={editedAccount.beneficiary_account_name || ''} onChange={handleInputChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SettlementAccountsTable;
