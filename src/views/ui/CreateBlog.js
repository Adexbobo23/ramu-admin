import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { MdCloudUpload } from "react-icons/md";
import "../ComStyle/CreateBlog.scss";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    media: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, media: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., API call to create a new blog post)
    console.log("Blog Data:", blogData);
    // Reset form data after submission
    setBlogData({ title: "", content: "", media: null });
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
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <Input
            type="textarea"
            name="content"
            id="content"
            value={blogData.content}
            onChange={handleInputChange}
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
