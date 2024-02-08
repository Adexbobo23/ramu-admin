import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import axios from "axios";

const Feeds = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const adminToken = localStorage.getItem("adminAuthToken");

        if (!adminToken) {
          console.error("Admin token not available");
          return;
        }

        const response = await axios.get(
          "https://api-staging.ramufinance.com/api/v1/admin/notifications",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.status === 200) {
          setNotifications(response.data.data);
        } else {
          console.error("Error fetching notifications:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Notification Feed</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Admin check this out
        </CardSubtitle>
        {/* Wrap ListGroup in a div with a specific height and overflow-y:auto */}
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ListGroup flush className="mt-4">
            {notifications.map((notification) => (
              <ListGroupItem
                key={notification.id}
                action
                href="/"
                tag="a"
                className="d-flex align-items-center p-3 border-0"
              >
                <Button
                  className="rounded-circle me-3"
                  size="sm"
                  color="primary"
                >
                  <i className="bi bi-bell"></i>
                </Button>
                {notification.data.message}
                <small className="ms-auto text-muted text-small">
                  {new Date(notification.created_at).toLocaleString()}
                </small>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </CardBody>
    </Card>
  );
};

export default Feeds;
