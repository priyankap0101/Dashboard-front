import React from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

const EarningsReport = ({ earnings = 468, percentageChange = 4.2, profit = 256.34, expense = 74.19 }) => {
  const data = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'Earnings',
        data: [150, 200, 175, 300, 400, 250, 275],
        backgroundColor: '#7C3AED', // Purple for bars
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#5B21B6', // Darker purple border
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#D1D5DB', // Light gray for labels
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#D1D5DB', // Light gray for labels
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <motion.div
      className="p-6 bg-gradient-to-b from-[#1E293B] to-[#111827] rounded-xl shadow-lg w-full"
      whileHover={{ scale: 1.02 }}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Earning Reports</h2>
        <p className="text-gray-400">Weekly Earnings Overview</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-bold text-white">${earnings.toLocaleString()}</div>
        <div
          className={`px-2 py-1 rounded-lg ${percentageChange >= 0 ? 'bg-green-500' : 'bg-red-500'} text-white text-sm font-medium`}
        >
          {percentageChange >= 0 ? `+${percentageChange}%` : `${percentageChange}%`}
        </div>
      </div>
      <p className="mb-6 text-gray-400">You are informed of this week compared to last week</p>
      <div className="mb-6">
        <Bar data={data} options={options} />
      </div>
      <div className="grid grid-cols-3 gap-4 text-white">
        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center p-4 bg-[#2D3748] rounded-lg">
          <FaDollarSign className="mb-2 text-2xl text-purple-400" />
          <div className="text-lg">Earnings</div>
          <div className="text-2xl font-bold">${earnings.toFixed(2)}</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center p-4 bg-[#2D3748] rounded-lg">
          <FaChartLine className="mb-2 text-2xl text-teal-400" />
          <div className="text-lg">Profit</div>
          <div className="text-2xl font-bold">${profit.toFixed(2)}</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center p-4 bg-[#2D3748] rounded-lg">
          <FaMoneyBillWave className="mb-2 text-2xl text-red-400" />
          <div className="text-lg">Expense</div>
          <div className="text-2xl font-bold">${expense.toFixed(2)}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EarningsReport;
