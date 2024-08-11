// src/components/PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
