import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ImpactChart = ({ data, darkMode }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Impact',
        data: data.map(item => item.value),
        backgroundColor: darkMode ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: darkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: darkMode ? '#333333' : '#ffffff',
        titleColor: darkMode ? '#ffffff' : '#000000',
        bodyColor: darkMode ? '#ffffff' : '#000000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
      y: {
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
          beginAtZero: true,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ImpactChart;
