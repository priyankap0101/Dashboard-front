import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const CityChart = ({ data, darkMode }) => {
  const cityData = data.reduce((acc, item) => {
    acc[item.city] = (acc[item.city] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(cityData),
    datasets: [
      {
        label: 'City Data',
        data: Object.values(cityData),
        backgroundColor: darkMode
          ? ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
          : ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: darkMode
          ? ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)']
          : ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#ffffff' : '#000000',
        },
      },
      title: {
        display: true,
        text: 'City Data Analysis (Doughnut Chart)',
        color: darkMode ? '#ffffff' : '#000000',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default CityChart;
