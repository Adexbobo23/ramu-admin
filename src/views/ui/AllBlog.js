import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../ComStyle/AllBlog.scss";
import { MdCloudUpload } from "react-icons/md";


const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBlogData, setEditedBlogData] = useState({
    title: "",
    thumbnail_image: "",
    body: "",
  });

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
    setEditedBlogData({
      title: blog.title,
      thumbnail_image: blog.thumbnail_image,
      body: blog.body,
    });
    toggleEditModal();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlogData({ ...editedBlogData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const adminToken = localStorage.getItem("adminAuthToken");

    try {
      const response = await axios.put(
        `https://api-staging.ramufinance.com/api/v1/edit-blog-post/${selectedBlog.id}`,
        editedBlogData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data.status) {
        alert("Blog post updated successfully");
        // Close the edit modal after successful submission
        toggleEditModal();
        // Refresh the blog list
        fetchBlogPosts();
      } else {
        alert("Error updating blog post");
      }
    } catch (error) {
      console.error("An error occurred while updating blog post:", error);
      alert("An error occurred. Please try again later.");
    }
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
  }, []); 

  const handleEditMediaChange = (e) => {
    const file = e.target.files[0];
    setEditedBlogData({ ...editedBlogData, thumbnail_image: file });
  };

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
          <Form onSubmit={handleEditSubmit}>
            <FormGroup>
              <Label for="editTitle">Title</Label>
              <Input
                type="text"
                name="title"
                id="editTitle"
                value={editedBlogData.title}
                onChange={handleEditInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="editContent">Content</Label>
              <Input
                type="textarea"
                name="body"
                id="editContent"
                value={editedBlogData.body}
                onChange={handleEditInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="editMedia">Media (Image/Video)</Label>
              <Input
                type="file"
                name="media"
                id="editMedia"
                accept="image/*, video/*"
                onChange={handleEditMediaChange}
              />
              <MdCloudUpload className="upload-icon" />
            </FormGroup>
            <Button type="submit" color="primary">
              Update Blog
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AllBlog;
