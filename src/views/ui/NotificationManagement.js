import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/NotificationManagement.scss";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationSelect = (notification) => {
    setSelectedNotification(notification);
  };

  const handleNotificationUpdate = (updatedNotification) => {
    // Perform update logic for the selected notification
    // ...
    console.log("Notification updated:", updatedNotification);
  };

  return (
    <div className="notification-management">
      <h2 className="notification-management__title">Notification Management</h2>

      <div className="notification-management__list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-management__item ${
              notification === selectedNotification ? "selected" : ""
            }`}
            onClick={() => handleNotificationSelect(notification)}
          >
            {notification.title}
          </div>
        ))}
      </div>

      {selectedNotification && (
        <div className="notification-management__details">
          <h3 className="notification-management__details-title">
            {selectedNotification.title}
          </h3>
          <p className="notification-management__details-description">
            {selectedNotification.description}
          </p>
          <button
            className="notification-management__details-button"
            onClick={() => handleNotificationUpdate(selectedNotification)}
          >
            Update Notification
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationManagement;
