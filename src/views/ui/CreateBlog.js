import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { MdCloudUpload } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../ComStyle/CreateBlog.scss";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    media: null,
  });

  const handleInputChange = (name, value) => {
    setBlogData({ ...blogData, [name]: value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, media: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("thumbnail_image", blogData.media);
    formData.append("body", blogData.content);

    const adminAuthToken = localStorage.getItem("adminAuthToken");

    try {
      const response = await fetch("https://api-staging.ramufinance.com/api/v1/create-blog-post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminAuthToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Blog post created successfully");
        // Reset form data after successful submission
        setBlogData({ title: "", content: "", media: null });
      } else {
        alert("Error creating blog post");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="create-blog-container">
      <h1>Create a New Blog</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={blogData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={(value) => handleInputChange("content", value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="media">Media (Image/Video)</Label>
          <Input
            type="file"
            name="media"
            id="media"
            accept="image/*, video/*"
            onChange={handleMediaChange}
          />
          <MdCloudUpload className="upload-icon" />
        </FormGroup>
        <Button type="submit" color="primary" className="btn-blog">
          Create Blog
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlog;
