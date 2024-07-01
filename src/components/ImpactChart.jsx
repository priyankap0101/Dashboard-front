import React from 'react';
import { Line } from 'react-chartjs-2';

const ImpactChart = ({ data }) => {
  // Calculate impact data counts
  const impactData = data.reduce((acc, item) => {
    acc[item.impact] = (acc[item.impact] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(impactData),
    datasets: [
      {
        label: 'Impact Analysis',
        data: Object.values(impactData),
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
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
        text: 'Impact Analysis (Line Chart)',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ImpactChart;
