import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register required components with ChartJS
ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const LikelihoodChart = ({ data, darkMode }) => {
  const [showAll, setShowAll] = useState(false);

  // Define the number of initial data points to display
  const initialDataCount = 5;

  // Transform data
  const transformData = () => {
    const likelihoodCounts = data.reduce((acc, curr) => {
      const likelihood = curr.likelihood;
      if (acc[likelihood]) {
        acc[likelihood]++;
      } else {
        acc[likelihood] = 1;
      }
      return acc;
    }, {});

    return Object.keys(likelihoodCounts).map((likelihood) => ({
      label: likelihood,
      value: likelihoodCounts[likelihood],
    }));
  };

  const likelihoodData = transformData();
  const displayedData = showAll ? likelihoodData : likelihoodData.slice(0, initialDataCount);

  const chartData = {
    labels: displayedData.map(item => item.label),
    datasets: [
      {
        label: 'Likelihood Distribution',
        data: displayedData.map(item => item.value),
        borderColor: darkMode ? '#9ACD32' : '#1F77B4',
        backgroundColor: darkMode ? 'rgba(154, 205, 50, 0.2)' : 'rgba(31, 119, 180, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: darkMode ? '#9ACD32' : '#1F77B4',
        pointBorderColor: darkMode ? '#333' : '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        backgroundColor: darkMode ? '#555' : '#333',
        titleColor: darkMode ? '#fff' : '#fff',
        bodyColor: darkMode ? '#fff' : '#fff',
        borderColor: darkMode ? '#888' : '#666',
        borderWidth: 1,
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: darkMode ? '#ddd' : '#333',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
          color: darkMode ? '#444' : '#ddd',
        },
        ticks: {
          color: darkMode ? '#ddd' : '#333',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? '#444' : '#ddd',
        },
        ticks: {
          color: darkMode ? '#ddd' : '#333',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h2 className={`mb-4 text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Likelihood Distribution
      </h2>
      <div style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out
            ${showAll ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
            ${darkMode ? 'dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400' : 'dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400'}`}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default LikelihoodChart;
