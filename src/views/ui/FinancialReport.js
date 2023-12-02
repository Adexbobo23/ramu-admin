import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import "../ComStyle/FinancialReport.scss";
import axios from "axios";

const FinancialReport = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Fetch line chart data
        const lineChartResponse = await axios.get("/api/financial/line-chart");
        setLineChartData(lineChartResponse.data);

        // Fetch bar chart data
        const barChartResponse = await axios.get("/api/financial/bar-chart");
        setBarChartData(barChartResponse.data);

        // Fetch pie chart data
        const pieChartResponse = await axios.get("/api/financial/pie-chart");
        setPieChartData(pieChartResponse.data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <div className="financial-report">
      <h2 className="financial-report__title">Financial Report</h2>

      {lineChartData && (
        <div className="financial-report__chart">
          <h3 className="financial-report__chart-title">Revenue and Expenses</h3>
          <Chart
            type="line"
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      )}

      {barChartData && (
        <div className="financial-report__chart">
          <h3 className="financial-report__chart-title">Product Sales</h3>
          <Chart
            type="bar"
            data={barChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      )}

      {pieChartData && (
        <div className="financial-report__chart">
          <h3 className="financial-report__chart-title">Product Distribution</h3>
          <Chart
            type="pie"
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
