import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CityChart = ({ data }) => {
  // Calculate city data counts
  const cityData = data.reduce((acc, item) => {
    acc[item.city] = (acc[item.city] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(cityData),
    datasets: [
      {
        label: 'City Data',
        data: Object.values(cityData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
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
        text: 'City Data Analysis (Doughnut Chart)',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default CityChart;
