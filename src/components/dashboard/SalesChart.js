import React, { useState, useEffect } from "react";
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import axios from "axios";

const SalesChart = () => {
  const [orderData, setOrderData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [withdrawnData, setWithdrawnData] = useState({});

  const fetchOrderData = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        return;
      }

      const response = await axios.get(
        "https://api-staging.ramufinance.com/api/v1/admin/get-orders-count",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status === 200) {
        setOrderData(response.data.data);
      } else {
        console.error("Error fetching order data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching order data:", error);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        return;
      }

      const response = await axios.get(
        "https://api-staging.ramufinance.com/api/v1/admin/get-customers-count",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status === 200) {
        setCustomerData(response.data.data);
      } else {
        console.error("Error fetching customer data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching customer data:", error);
    }
  };

  const fetchWithdrawnData = async () => {
    try {
      const adminToken = localStorage.getItem("adminAuthToken");

      if (!adminToken) {
        console.error("Admin token not available");
        return;
      }

      const response = await axios.get(
        "https://api-staging.ramufinance.com/api/v1/admin/get-amount-withdrawn",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status === 200) {
        setWithdrawnData(response.data.data);
      } else {
        console.error("Error fetching withdrawn data:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching withdrawn data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
    fetchCustomerData();
    fetchWithdrawnData();
  }, []); // Empty dependency array to trigger the API calls only once on component mount

  const options = {
    chart: {
      type: "area",
      height: 279,
    },
    xaxis: {
      type: "datetime", // Set x-axis type to datetime
    },
    // ... (other existing options)
  };

  const series = [
    {
      name: "Total Order",
      data: [{ x: new Date().getTime(), y: orderData.total_investment_count || 0 }],
    },
    {
      name: "Total Withdrawn",
      data: [{ x: new Date().getTime(), y: withdrawnData.amount || 0 }],
    },
    {
      name: "All Users",
      data: [{ x: new Date().getTime(), y: customerData.user_count || 0 }],
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <div className="bg-success text-white my-3 p-3 rounded">
          <Row>
            <Col md="4">
              <h6>Total Order</h6>
              <h4 className="mb-0 fw-bold">${orderData.total_investment_value || 0}</h4>
            </Col>
            <Col md="4">
              <h6>Total Withdrawn</h6>
              <h4 className="mb-0 fw-bold">₦{withdrawnData.amount || 0}</h4>
            </Col>
            <Col md="4">
              <h6>All Users</h6>
              <h4 className="mb-0 fw-bold">{customerData.user_count || 0}</h4>
            </Col>
          </Row>
        </div>
        <Chart options={options} series={series} type="area" height="279" />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
