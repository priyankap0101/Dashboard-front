import React from 'react';
import { FaDollarSign, FaChartLine, FaMoneyBillWave } from "react-icons/fa";  // Import relevant icons

const EarningsReport = ({
  earnings = 468,
  percentageChange = 4.2,
  profit = 256.34,
  expense = 74.19,
}) => {
  // ... rest of your component remains the same

  return (
    <div className={`w-full max-w-4xl p-4 mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-2xl`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Earnings Report</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-md`}>Weekly Earnings Overview</p>
        </div>
      </div>

      {/* Chart and Earnings Info */}
      <div className="flex flex-col items-center justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
        <div className="p-4">
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={180}
            />
          </div>
        </div>

        <div className={`w-full max-w-md p-4 mx-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg shadow-lg md:w-1/3`}>
          <div className={`mb-3 text-3xl font-extrabold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            ${earnings.toLocaleString()}
          </div>
          <div
            className={`text-lg px-4 py-1 rounded-full font-medium text-white ${percentageChange >= 0 ? "bg-green-700" : "bg-red-700"}`}
          >
            {percentageChange >= 0
              ? `+${percentageChange.toFixed(1)}%`
              : `${percentageChange.toFixed(1)}%`}
          </div>
          <p className={`mt-1 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Compared to last week
          </p>
        </div>
      </div>

      {/* Icon Sections */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Earnings */}
        <div className="flex items-center p-2 transition-shadow duration-300 bg-gray-900 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center p-1 text-yellow-400 bg-gray-800 rounded-full">
            <FaDollarSign className="" />
          </div>
          <div className="flex-1 ml-1">
            <p className="font-medium text-gray-300">Earnings</p>
            <p className="font-semibold text-white truncate">${earnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Profit */}
        <div className="flex items-center p-2 transition-shadow duration-300 bg-gray-900 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center p-1 text-green-400 bg-gray-800 rounded-full">
            <FaChartLine className="" />
          </div>
          <div className="flex-1 ml-1">
            <p className="font-medium text-gray-300">Profit</p>
            <p className="font-semibold text-white truncate">${profit.toFixed(2)}</p>
          </div>
        </div>

        {/* Expenses */}
        <div className="flex items-center p-2 transition-shadow duration-300 bg-gray-900 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-center p-1 text-red-400 bg-gray-800 rounded-full">
            <FaMoneyBillWave className="" />
          </div>
          <div className="flex-1 ml-1">
            <p className="font-medium text-gray-300">Expenses</p>
            <p className="font-semibold text-white truncate">${expense.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsReport;
