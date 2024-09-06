import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { FaDollarSign, FaChartLine, FaMoneyBillWave } from "react-icons/fa";

// Define your themes object outside of the component
const themes = {
  light: {
    background: "rgba(255, 255, 255, 1)",
    border: "rgba(0, 0, 0, 0.8)",
    line: "rgba(75, 192, 192, 1)",
    bar: "rgba(75, 192, 192, 0.2)",
    pie: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
    ],
    radar: "rgba(255, 99, 132, 0.2)",
    chartBackground: "rgba(255, 255, 255, 1)",
    chartBorder: "rgba(0, 0, 0, 0.8)",
  },
  dark: {
    background: "rgba(0, 0, 0, 0.8)",
    border: "rgba(255, 255, 255, 0.8)",
    line: "rgba(255, 99, 132, 1)",
    bar: "rgba(255, 99, 132, 0.2)",
    pie: [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(75, 192, 192, 0.8)",
    ],
    radar: "rgba(255, 99, 132, 0.8)",
    chartBackground: "rgba(0, 0, 0, 0.8)",
    chartBorder: "rgba(255, 255, 255, 0.8)",
  },
  blue: {
    background: "rgba(0, 0, 255, 0.1)",
    border: "rgba(0, 0, 255, 0.8)",
    line: "rgba(0, 0, 255, 1)",
    bar: "rgba(0, 0, 255, 0.2)",
    pie: [
      "rgba(0, 0, 255, 0.8)",
      "rgba(0, 128, 255, 0.8)",
      "rgba(0, 191, 255, 0.8)",
      "rgba(135, 206, 250, 0.8)",
    ],
    radar: "rgba(0, 0, 255, 0.8)",
    chartBackground: "rgba(0, 0, 255, 0.1)",
    chartBorder: "rgba(0, 0, 255, 0.8)",
  },
  green: {
    background: "rgba(0, 255, 0, 0.1)",
    border: "rgba(0, 255, 0, 0.8)",
    line: "rgba(0, 255, 0, 1)",
    bar: "rgba(0, 255, 0, 0.2)",
    pie: [
      "rgba(0, 255, 0, 0.8)",
      "rgba(34, 139, 34, 0.8)",
      "rgba(144, 238, 144, 0.8)",
      "rgba(50, 205, 50, 0.8)",
    ],
    radar: "rgba(0, 255, 0, 0.8)",
    chartBackground: "rgba(0, 255, 0, 0.1)",
    chartBorder: "rgba(0, 255, 0, 0.8)",
  },
};

const EarningsReport = ({
  earnings = 468,
  percentageChange = 4.2,
  profit = 256.34,
  expense = 74.19,
  theme = "light",
}) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme) => {
    setSelectedTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const colors = themes[selectedTheme];

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
      labels: { style: { colors: colors.border } },
    },
    yaxis: { labels: { style: { colors: colors.border } } },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.6,
        stops: [0, 100],
      },
    },
    colors: [colors.line],
    tooltip: { theme: selectedTheme },
  };

  const chartSeries = [
    { name: "Earnings", data: [150, 200, 175, 300, 400, 250, 275] },
  ];

  return (
    <div
      className={`w-full max-w-4xl p-4 mx-auto shadow-lg rounded-2xl ${colors.background}`}
    >
      <div className="mb-6 text-center">
        <h1 className={`text-2xl font-bold ${colors.border}`}>
          Earnings Report
        </h1>
        <p className={`text-md ${colors.border}`}>
          Weekly Earnings Overview
        </p>
      </div>
      <div className="flex flex-col items-center justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
        <div className="p-4">
          <div className={`p-3 rounded-lg shadow-md ${colors.background}`}>
            <ApexCharts
              options={chartOptions}
              series={chartSeries}
              type="area"
              height={180}
            />
          </div>
        </div>
        <div
          className={`w-full max-w-md p-4 mx-auto rounded-lg shadow-lg md:w-1/3 ${colors.background} text-white`}
        >
          <div className="mb-3 text-3xl font-extrabold text-center">
            ${earnings.toLocaleString()}
          </div>
          <div
            className={`text-lg px-4 py-1 rounded-full font-medium ${
              percentageChange >= 0 ? "bg-green-700" : "bg-red-700"
            } text-white`}
          >
            {percentageChange >= 0
              ? `+${percentageChange.toFixed(1)}%`
              : `${percentageChange.toFixed(1)}%`}
          </div>
          <p className={`mt-1 text-sm text-center ${colors.border}`}>
            Compared to last week
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          className={`flex items-center p-2 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg ${colors.background}`}
        >
          <div
            className={`flex items-center justify-center p-1 rounded-full ${colors.pie[0]}`}
          >
            <FaDollarSign />
          </div>
          <div className="flex-1 ml-1">
            <p className={`font-medium ${colors.border}`}>Earnings</p>
            <p className={`font-semibold ${colors.line} truncate`}>
              ${earnings.toFixed(2)}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center p-2 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg ${colors.background}`}
        >
          <div
            className={`flex items-center justify-center p-1 rounded-full ${colors.pie[1]}`}
          >
            <FaChartLine />
          </div>
          <div className="flex-1 ml-1">
            <p className={`font-medium ${colors.border}`}>Profit</p>
            <p className={`font-semibold ${colors.line} truncate`}>
              ${profit.toFixed(2)}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center p-2 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg ${colors.background}`}
        >
          <div
            className={`flex items-center justify-center p-1 rounded-full ${colors.pie[2]}`}
          >
            <FaMoneyBillWave />
          </div>
          <div className="flex-1 ml-1">
            <p className={`font-medium ${colors.border}`}>Expense</p>
            <p className={`font-semibold ${colors.line} truncate`}>
              ${expense.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => applyTheme("light")}
          className={`p-2 rounded-lg ${colors.border} text-white`}
        >
          Light Theme
        </button>
        <button
          onClick={() => applyTheme("dark")}
          className={`p-2 ml-2 rounded-lg ${colors.border} text-white`}
        >
          Dark Theme
        </button>
        <button
          onClick={() => applyTheme("blue")}
          className={`p-2 ml-2 rounded-lg ${colors.border} text-white`}
        >
          Blue Theme
        </button>
        <button
          onClick={() => applyTheme("green")}
          className={`p-2 ml-2 rounded-lg ${colors.border} text-white`}
        >
          Green Theme
        </button>
      </div>
    </div>
  );
};

export default EarningsReport;
