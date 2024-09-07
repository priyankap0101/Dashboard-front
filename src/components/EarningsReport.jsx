import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { FaDollarSign, FaChartLine, FaMoneyBillWave } from "react-icons/fa";

// Define your themes object outside of the component
const themes = {
  light: {
    background: "bg-white",
    border: "border-black",
    text: "text-black",
    buttonText: "text-black",
    buttonBg: "bg-gray-200",
    line: "rgba(75, 192, 192, 1)",
    bar: "rgba(75, 192, 192, 0.2)",
    pie: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
    ],
  },
  dark: {
    background: "bg-black",
    border: "border-white",
    text: "text-white",
    buttonText: "text-white",
    buttonBg: "bg-gray-700",
    line: "rgba(255, 99, 132, 1)",
    bar: "rgba(255, 99, 132, 0.2)",
    pie: [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(75, 192, 192, 0.8)",
    ],
  },
  blue: {
    background: "bg-blue-50",
    border: "border-blue-500",
    text: "text-blue-900",
    buttonText: "text-white",
    buttonBg: "bg-blue-500",
    line: "rgba(0, 0, 255, 1)",
    bar: "rgba(0, 0, 255, 0.2)",
    pie: [
      "rgba(0, 0, 255, 0.8)",
      "rgba(0, 128, 255, 0.8)",
      "rgba(0, 191, 255, 0.8)",
      "rgba(135, 206, 250, 0.8)",
    ],
  },
  green: {
    background: "bg-green-50",
    border: "border-green-500",
    text: "text-green-900",
    buttonText: "text-white",
    buttonBg: "bg-green-500",
    line: "rgba(0, 255, 0, 1)",
    bar: "rgba(0, 255, 0, 0.2)",
    pie: [
      "rgba(0, 255, 0, 0.8)",
      "rgba(34, 139, 34, 0.8)",
      "rgba(144, 238, 144, 0.8)",
      "rgba(50, 205, 50, 0.8)",
    ],
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
      labels: { style: { colors: colors.text } },
    },
    yaxis: { labels: { style: { colors: colors.text } } },
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
    <div className={`w-full max-w-4xl p-4 mx-auto shadow-lg rounded-2xl ${colors.background} ${colors.text}`}>
      <div className="mb-6 text-center">
        <h1 className={`text-2xl font-bold ${colors.text}`}>Earnings Report</h1>
        <p className={`text-md ${colors.text}`}>Weekly Earnings Overview</p>
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
        <div className={`w-full max-w-md p-4 mx-auto rounded-lg shadow-lg md:w-1/3 ${colors.background}`}>
          <div className="mb-3 text-3xl font-extrabold text-center">${earnings.toLocaleString()}</div>
          <div className={`text-lg px-4 py-1 rounded-full font-medium ${percentageChange >= 0 ? "bg-green-700" : "bg-red-700"} text-white`}>
            {percentageChange >= 0 ? `+${percentageChange.toFixed(1)}%` : `${percentageChange.toFixed(1)}%`}
          </div>
          <p className={`mt-1 text-sm text-center ${colors.text}`}>Compared to last week</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: FaDollarSign, label: "Earnings", value: earnings.toFixed(2), color: colors.pie[0] },
          { icon: FaChartLine, label: "Profit", value: profit.toFixed(2), color: colors.pie[1] },
          { icon: FaMoneyBillWave, label: "Expense", value: expense.toFixed(2), color: colors.pie[2] },
        ].map(({ icon: Icon, label, value, color }, index) => (
          <div key={index} className={`flex items-center p-2 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg ${colors.background}`}>
            <div className={`flex items-center justify-center p-1 rounded-full ${color}`}>
              <Icon />
            </div>
            <div className="flex-1 ml-1">
              <p className={`font-medium ${colors.text}`}>{label}</p>
              <p className={`font-semibold ${colors.text} truncate`}>${value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        {["light", "dark", "blue", "green"].map((theme, index) => (
          <button
            key={index}
            onClick={() => applyTheme(theme)}
            className={`p-2 ml-2 rounded-lg ${colors.buttonBg} ${colors.buttonText}`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
          </button>
        ))}
      </div>
    </div>
  );
};

export default EarningsReport;
