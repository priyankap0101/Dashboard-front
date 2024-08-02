import React from 'react';
import { Line } from 'react-chartjs-2';

const PESTLEChart = ({ data, darkMode }) => {
  const pestleData = data.reduce((acc, item) => {
    acc[item.pestle] = (acc[item.pestle] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(pestleData),
    datasets: [
      {
        label: 'PESTLE Analysis',
        data: Object.values(pestleData),
        fill: false,
        backgroundColor: darkMode ? 'rgba(255, 206, 86, 0.2)' : 'rgba(255, 99, 132, 0.2)',
        borderColor: darkMode ? 'rgba(255, 206, 86, 1)' : 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
      x: {
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
      title: {
        display: true,
        text: 'PESTLE Analysis',
        color: darkMode ? '#ffffff' : '#000000',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PESTLEChart;
