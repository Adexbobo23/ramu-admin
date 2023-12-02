import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../ComStyle/Logout.scss";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://api-staging.ramufinance.com/api/v1/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the authentication token in the request headers if needed
          // e.g., 'Authorization': `Bearer ${localStorage.getItem('adminAuthToken')}`,
        },
      });

      if (response.ok) {
        // If the API call is successful, clear the authentication token
        localStorage.removeItem('adminAuthToken');
        navigate("/"); // Redirect to the AdminLogin component after logout
      } else {
        // Handle the case when the API call fails (e.g., server error)
        console.error('Logout failed:', response.statusText);
        // You might want to show a user-friendly error message here
      }
    } catch (error) {
      // Handle any other errors that may occur during the API call
      console.error('An error occurred while logging out:', error.message);
      // You might want to show a user-friendly error message here
    }
  };

  return (
    <div className="logout-container">
      <Button color="green" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
