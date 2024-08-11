// src/components/BarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Dataset 1",
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        data: data.values,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
