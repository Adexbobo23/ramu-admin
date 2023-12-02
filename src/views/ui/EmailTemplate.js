import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/EmailTemplate.scss";

const EmailTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setEmailContent(template.content);
  };

  const handleContentChange = (event) => {
    setEmailContent(event.target.value);
  };

  const handleSaveTemplate = () => {
    // Perform save template logic
    axios
      .put(`/api/templates/${selectedTemplate.id}`, {
        content: emailContent,
      })
      .then((response) => {
        console.log("Template saved successfully");
        // Handle success case
      })
      .catch((error) => {
        console.error("Error saving template:", error);
        // Handle error case
      });
  };

  return (
    <div className="email-template">
      <h2 className="email-template__title">Email Templates</h2>
      <div className="email-template__sidebar">
        <ul className="email-template__template-list">
          {templates.map((template) => (
            <li
              key={template.id}
              className={`email-template__template-item ${
                selectedTemplate && selectedTemplate.id === template.id
                  ? "email-template__template-item--active"
                  : ""
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              {template.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="email-template__editor">
        <textarea
          value={emailContent}
          onChange={handleContentChange}
          placeholder="Enter email content"
          className="email-template__textarea"
        />
        <button
          onClick={handleSaveTemplate}
          disabled={!selectedTemplate}
          className="email-template__button"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default EmailTemplate;
