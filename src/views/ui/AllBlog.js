import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";
import "../ComStyle/AllBlog.scss";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleViewModal = () => {
    setIsViewModalOpen(!isViewModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    toggleViewModal();
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    toggleEditModal();
  };

  const fetchBlogPosts = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        return;
      }

      const response = await axios.get(
        "https://api-staging.ramufinance.com/api/v1/blog-posts",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data.status) {
        setBlogs(response.data.data);
      } else {
        console.error("Error fetching blog posts:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching blog posts:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []); // Run once when the component mounts

  return (
    <div className="all-blog-container">
      <h1>All Blog Posts</h1>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.thumbnail_image}</p>
            <p>{blog.body}</p>
            <p>{blog.created_at}</p>
            <div className="blog-actions">
              <Button color="success" onClick={() => openViewModal(blog)}>
                View
              </Button>{" "}
              <Button color="info" onClick={() => openEditModal(blog)}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* View Blog Modal */}
      <Modal isOpen={isViewModalOpen} toggle={toggleViewModal}>
        <ModalHeader toggle={toggleViewModal}>View Blog</ModalHeader>
        <ModalBody>
          <h2>{selectedBlog?.title}</h2>
          <p>{selectedBlog?.body}</p>
        </ModalBody>
      </Modal>

      {/* Edit Blog Modal */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Blog</ModalHeader>
        <ModalBody>
          {/* Add your edit form or components here */}
          <h2>Edit: {selectedBlog?.title}</h2>
          <p>{selectedBlog?.body}</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AllBlog;
