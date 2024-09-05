import React from "react";
import ApexCharts from "react-apexcharts";
import { FaDollarSign, FaChartLine, FaMoneyBillWave } from "react-icons/fa";

const EarningsReport = ({
  earnings = 468,
  percentageChange = 4.2,
  profit = 256.34,
  expense = 74.19,
}) => {
  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        color: "#000",
        opacity: 0.1,
      },
    },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      labels: { style: { colors: "#D1D5DB" } },
    },
    yaxis: { labels: { style: { colors: "#D1D5DB" } } },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.6,
        stops: [0, 100],
      },
    },
    colors: ["#3B82F6"],
    tooltip: { theme: "dark" },
  };

  const chartSeries = [
    { name: "Earnings", data: [150, 200, 175, 300, 400, 250, 275] },
  ];

  return (
    <div className="w-full max-w-4xl p-6 mx-auto bg-gray-800 shadow-lg rounded-2xl ">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">Earnings Report</h1>
        <p className="text-lg text-gray-300">Weekly Earnings Overview</p>
      </div>

      {/* Chart and Earnings Info */}
      <div className="flex flex-col items-center justify-between mb-8 space-y-6 md:flex-row md:space-y-0">
        {/* <div className="w-full overflow-hidden bg-gray-900 border border-gray-700 rounded-lg shadow-lg md:w-2/3 md:pr-6"> */}
        <div className="p-6">
          {/* <h2 className="mb-4 text-2xl font-semibold text-white">Weekly Earnings Overview</h2> */}
          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={200} // Reduced height
            />
          </div>
          {/* </div> */}
        </div>

        <div className="w-full max-w-md p-6 mx-auto text-white bg-gray-800 rounded-lg shadow-lg md:w-1/3">
          {/* Earnings Amount */}
          <div className="mb-4 text-4xl font-extrabold text-center">
            ${earnings.toLocaleString()}
          </div>

          {/* Percentage Change */}
          <div
            className={`text-lg px-4 py-2 rounded-full font-medium text-white ${
              percentageChange >= 0 ? "bg-green-700" : "bg-red-700"
            }`}
          >
            {percentageChange >= 0
              ? `+${percentageChange.toFixed(1)}%`
              : `${percentageChange.toFixed(1)}%`}
          </div>

          {/* Comparison Text */}
          <p className="mt-2 text-sm text-center text-gray-400">
            Compared to last week
          </p>
        </div>
      </div>

      {/* Icon Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Earnings */}
        <div className="flex items-center p-2 transition-shadow duration-300 bg-gray-900 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center p-1 text-yellow-400 bg-gray-800 rounded-full">
            <FaDollarSign className="" />
          </div>
          <div className="flex-1 ml-1">
            <p className="font-medium text-gray-300 ">Earnings</p>
            <p className="font-semibold text-white truncate ">
              ${earnings.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Profit */}
        <div className="flex items-center p-2 transition-shadow duration-300 bg-gray-900 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center p-1 text-teal-300 bg-gray-800 rounded-full">
            <FaChartLine className="" />
          </div>
          <div className="flex-1 ">
            <p className="font-medium text-gray-300 ">Profit</p>
            <p className="font-semibold text-white truncate ">
              ${profit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Expenses */}
        <div className="flex items-center p-2 transition-shadow duration-300 bg-gray-900 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center p-3 text-red-400 bg-gray-800 rounded-full">
            <FaMoneyBillWave className="" />
          </div>
          <div className="flex-1 ">
            <p className="font-medium text-gray-300 ">Expenses</p>
            <p className="font-semibold text-white truncate ">
              ${expense.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 mt-8 md:flex-row md:justify-center">
        <button className="px-4 py-2 text-sm text-white transition-colors duration-300 bg-green-600 rounded-lg shadow-md hover:bg-green-700">
          View Details
        </button>
        <button className="px-4 py-2 text-sm text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
          Export Report
        </button>
        <button className="px-4 py-2 text-sm text-white transition-colors duration-300 bg-red-600 rounded-lg shadow-md hover:bg-red-700">
          Delete Report
        </button>
      </div>
    </div>
  );
};

export default EarningsReport;
