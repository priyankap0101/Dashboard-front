import React from 'react';
import { Radar } from 'react-chartjs-2';

const SwotChart = ({ data, darkMode }) => {
  const swotData = data.reduce((acc, item) => {
    acc[item.swot] = (acc[item.swot] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(swotData),
    datasets: [
      {
        label: 'SWOT Analysis',
        data: Object.values(swotData),
        backgroundColor: darkMode ? 'rgba(54, 162, 235, 0.2)' : 'rgba(153, 102, 255, 0.2)',
        borderColor: darkMode ? 'rgba(54, 162, 235, 1)' : 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          color: darkMode ? '#ffffff' : '#000000',
        },
        pointLabels: {
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
        text: 'SWOT Analysis',
        color: darkMode ? '#ffffff' : '#000000',
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default SwotChart;
