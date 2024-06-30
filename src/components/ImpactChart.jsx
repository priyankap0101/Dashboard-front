import React from 'react';
import { Line } from 'react-chartjs-2';

const ImpactChart = ({ data }) => {
  const impactData = data.reduce((acc, item) => {
    acc[item.impact] = (acc[item.impact] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(impactData),
    datasets: [
      {
        label: 'Impact Analysis',
        data: Object.values(impactData),
        fill: false,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ImpactChart;
