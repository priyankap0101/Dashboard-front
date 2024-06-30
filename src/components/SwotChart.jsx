import React from 'react';
import { Radar } from 'react-chartjs-2';

const SwotChart = ({ data }) => {
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
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={chartData} />;
};

export default SwotChart;
