// AllBlog.js

import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import "../ComStyle/AllBlog.scss";

const demoBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: 2,
    title: "Styling React Components with Sass",
    content: "Sass provides powerful features for styling React components...",
  },
];

const AllBlog = () => {
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

  return (
    <div className="all-blog-container">
      <h1>All Blog Posts</h1>
      <div className="blog-list">
        {demoBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
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
          <p>{selectedBlog?.content}</p>
        </ModalBody>
      </Modal>

      {/* Edit Blog Modal */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Blog</ModalHeader>
        <ModalBody>
          {/* Add your edit form or components here */}
          <h2>Edit: {selectedBlog?.title}</h2>
          <p>{selectedBlog?.content}</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AllBlog;
