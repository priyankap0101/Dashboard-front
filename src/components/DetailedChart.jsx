import React from "react";
import { Bar } from "react-chartjs-2";

const DetailedChart = ({ data }) => {
  // Prepare the chart data and options for detailed view
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: "Detailed Data",
        data: data.map(item => item.value),
        backgroundColor: "#4A90E2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="mb-4 text-xl font-semibold">Detailed Chart</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DetailedChart;
