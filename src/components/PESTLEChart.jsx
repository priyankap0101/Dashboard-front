// PESTLEChart.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';

const PESTLEChart = ({ data }) => {
  // Calculate PESTLE data counts
  const pestleData = data.reduce((acc, item) => {
    acc[item.pestle] = (acc[item.pestle] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(pestleData),
    datasets: [
      {
        label: 'PESTLE Analysis',
        data: Object.values(pestleData),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'PESTLE ',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PESTLEChart;
