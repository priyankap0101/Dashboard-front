import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register required components for the Bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TopicChart = ({ data }) => {
  // Transform data for the chart
  const topicData = data.reduce((acc, item) => {
    acc[item.topic] = (acc[item.topic] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(topicData),
    datasets: [
      {
        label: 'Number of Records',
        data: Object.values(topicData),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options for customization
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Topic Distribution',
        font: {
          size: 22,
          weight: 'bold',
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Count: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of Records',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', marginBottom: '20px' }}>
      <Bar data={chartData} options={options} />
      {/* <p style={{ marginTop: '10px', textAlign: 'center' }}>
        <a href="#readmore">Read More</a>
      </p> */}
    </div>
  );
};

export default TopicChart;
