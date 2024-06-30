import React from 'react';
import { Pie } from 'react-chartjs-2';

const TopicChart = ({ data }) => {
  const topicData = data.reduce((acc, item) => {
    acc[item.topic] = (acc[item.topic] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(topicData),
    datasets: [
      {
        label: 'Number of Records',
        data: Object.values(topicData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default TopicChart;
