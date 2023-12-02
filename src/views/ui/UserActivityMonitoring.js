import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComStyle/UserActivityMonitoring.scss";

const UserActivityMonitoring = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch user activity data from the backend
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get("/api/user-activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching user activity data:", error);
      }
    };

    fetchUserActivities();
  }, []);

  return (
    <div className="user-activity-monitoring">
      <h2 className="user-activity-monitoring__title">User Activity Monitoring</h2>

      <table className="user-activity-monitoring__table">
        <thead>
          <tr>
            <th>User</th>
            <th>Activity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.user}</td>
              <td>{activity.activity}</td>
              <td>{activity.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivityMonitoring;
