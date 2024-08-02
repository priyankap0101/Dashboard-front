import React from 'react';
import { Line } from 'react-chartjs-2';

const TopicChart = ({ data, darkMode }) => {
  const chartData = {
    labels: data.map(item => item.topic),
    datasets: [
      {
        label: 'Topics',
        data: data.map(item => item.value),
        backgroundColor: darkMode ? 'rgba(255, 159, 64, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: darkMode ? 'rgba(255, 159, 64, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: 'Topic Analysis',
        color: darkMode ? '#ffffff' : '#000000',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TopicChart;
