import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";  
import { MdCloudUpload } from "react-icons/md";
import "../ComStyle/AllBlog.scss";

const ITEMS_PER_PAGE = 3;

const BlogContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

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
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBlogs, setExpandedBlogs] = useState([]);

  const toggleExpand = (blogId) => {
    setExpandedBlogs((prevExpanded) => {
      if (prevExpanded.includes(blogId)) {
        return prevExpanded.filter((id) => id !== blogId);
      } else {
        return [...prevExpanded, blogId];
      }
    });
  };

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

  const handleDeleteBlog = async (blogId) => {
    const adminToken = localStorage.getItem("adminAuthToken");

    try {
      const response = await axios.delete(
        `https://api-staging.ramufinance.com/api/v1/admin/delete-blog-post/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.data.status) {
        alert("Blog post deleted successfully");
        // Refresh the blog list
        fetchBlogPosts();
      } else {
        alert("Error deleting blog post");
      }
    } catch (error) {
      console.error("An error occurred while deleting blog post:", error);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="all-blog-container">
      <h1>All Blog Posts</h1>
      <div className="blog-list">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2 className="title">{blog.title}</h2>
            {blog.thumbnail_image && (
              <img
                src={blog.thumbnail_image}
                alt={`Thumbnail for ${blog.title}`}
                className="thumbnail-image"
              />
            )}
            <BlogContent content={expandedBlogs.includes(blog.id) ? blog.body : blog.body.slice(0, 100) + (blog.body.length > 100 ? "..." : "")} />
            <p>{blog.created_at}</p>
            <div className="blog-actions">
              <Button color="success" onClick={() => openViewModal(blog)}>
                View
              </Button>{" "}
              <Button color="info" onClick={() => openEditModal(blog)}>
                Edit
              </Button>
              <Button color="danger" onClick={() => handleDeleteBlog(blog.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(blogs.length / ITEMS_PER_PAGE) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* View Blog Modal */}
      <Modal isOpen={isViewModalOpen} toggle={toggleViewModal}>
        <ModalHeader toggle={toggleViewModal}>View Blog</ModalHeader>
        <ModalBody>
          <h2>{selectedBlog?.title}</h2>
          <BlogContent content={selectedBlog?.body} />
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
              <ReactQuill
                theme="snow"
                value={editedBlogData.body}
                onChange={(value) => setEditedBlogData({ ...editedBlogData, body: value })}
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
