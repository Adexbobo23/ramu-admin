import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "../ComStyle/Sectors.scss";

// Add formatDate function here
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

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

  const handleEditSector = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        return;
      }

      const { id, name, description, logo } = selectedSector;

      const sectorData = new FormData();
      sectorData.append("name", name);
      sectorData.append("description", description);
      if (logo) {
        sectorData.append("logo", logo, logo.name);
      }

      const response = await axios.put(
        `https://api-staging.ramufinance.com/api/v1/admin/edit-sector/${id}`,
        sectorData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        console.log("Sector edited successfully:", response.data.message);
        window.alert("Sector edited successfully!");
      } else {
        console.error("Error editing sector:", response.data.message);
        window.alert(`Error editing sector: ${response.data.message}`);
      }
    } catch (error) {
      console.error("An error occurred while editing sector:", error);
      window.alert("An error occurred while editing sector. Please try again.");
    } finally {
      setEditModalVisible(false);
    }
  };

  const handleLogoChange = (e) => {
    setSelectedSector({
      ...selectedSector,
      logo: e.target.files[0],
    });
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
              <th>Actions</th>
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
                <td>
                  <button onClick={() => handleView(sector.id)}>View</button>
                  <button onClick={() => handleEdit(sector.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* View Modal */}
      <Modal isOpen={viewModalVisible} toggle={handleCloseViewModal}>
        <ModalHeader toggle={handleCloseViewModal}>View Sector</ModalHeader>
        <ModalBody>
          {selectedSector && (
            <>
              <p>ID: {selectedSector.id}</p>
              <p>Name: {selectedSector.name}</p>
              <p>Description: {selectedSector.description || "-"}</p>
              {/* Add more details as needed */}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModalVisible} toggle={handleCloseEditModal}>
        <ModalHeader toggle={handleCloseEditModal}>Edit Sector</ModalHeader>
        <ModalBody>
          {selectedSector && (
            <>
              <label htmlFor="editName">Name:</label>
              <input
                type="text"
                id="editName"
                value={selectedSector.name}
                onChange={(e) =>
                  setSelectedSector({
                    ...selectedSector,
                    name: e.target.value,
                  })
                }
              />
              <label htmlFor="editDescription">Description:</label>
              <textarea
                id="editDescription"
                value={selectedSector.description || ""}
                onChange={(e) =>
                  setSelectedSector({
                    ...selectedSector,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <label htmlFor="editLogo">Logo:</label>
              <input
                type="file"
                id="editLogo"
                onChange={handleLogoChange}
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditSector}>
            Save Changes
          </Button>{" "}
          <Button color="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Sectors;
