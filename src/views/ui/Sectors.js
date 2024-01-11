import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/Sectors.scss";

const Sectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const adminToken = localStorage.getItem("adminAuthToken");

        if (!adminToken) {
          console.error("Admin token not available");
          return;
        }

        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/get-sectors",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.data.status) {
          setSectors(response.data.data);
        } else {
          console.error("Error fetching sectors:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching sectors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const handleView = (id) => {
    const selectedSector = sectors.find((sector) => sector.id === id);
    setSelectedSector(selectedSector);
    setViewModalVisible(true);
  };

  const handleEdit = (id) => {
    const selectedSector = sectors.find((sector) => sector.id === id);
    setSelectedSector(selectedSector);
    setEditModalVisible(true);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="sectors-container">
      <h1>All Sectors</h1>
      {loading ? (
        <p>Loading sectors...</p>
      ) : (
        <table className="sectors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Logo</th>
              <th>Created At</th>
              <th>Updated At</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector) => (
              <tr key={sector.id}>
                <td>{sector.id}</td>
                <td>{sector.name}</td>
                <td>{sector.description || "-"}</td>
                <td>{sector.logo || "-"}</td>
                <td>{formatDate(sector.created_at)}</td>
                <td>{formatDate(sector.updated_at)}</td>
                {/* <td>
                  <button onClick={() => handleView(sector.id)}>View</button>
                  <button onClick={() => handleEdit(sector.id)}>Edit</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Modal */}
      {selectedSector && viewModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseViewModal}>
              &times;
            </span>
            <h2>View Sector</h2>
            <p>ID: {selectedSector.id}</p>
            <p>Name: {selectedSector.name}</p>
            <p>Description: {selectedSector.description || "-"}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedSector && editModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseEditModal}>
              &times;
            </span>
            <h2>Edit Sector</h2>
            {/* Add form fields for editing sector details */}
            <p>ID: {selectedSector.id}</p>
            <p>Name: {selectedSector.name}</p>
            <p>Description: {selectedSector.description || "-"}</p>
            {/* Add more form fields as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sectors;
