import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { FaDollarSign, FaChartLine, FaMoneyBillWave, FaSun, FaMoon, FaPalette, FaLeaf } from "react-icons/fa";

const themes = {
  light: {
    background: "bg-white",
    border: "border-gray-200",
    text: "text-gray-900",
    buttonBg: "bg-gray-300",
    buttonText: "text-gray-800",
    line: "rgba(75, 192, 192, 1)",
    pie: [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
    ],
    icon: <FaSun size={14} />,  // Reduced icon size
    tooltip: "Light",
  },
  dark: {
    background: "bg-gray-800",
    border: "border-gray-700",
    text: "text-gray-200",
    buttonBg: "bg-gray-700",
    buttonText: "text-gray-200",
    line: "rgba(255, 99, 132, 1)",
    pie: [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
    ],
    icon: <FaMoon size={14} />,  // Reduced icon size
    tooltip: "Dark",
  },
  blue: {
    background: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-800",
    buttonBg: "bg-blue-500",
    buttonText: "text-white",
    line: "rgba(0, 123, 255, 1)",
    pie: [
      "rgba(0, 123, 255, 0.8)",
      "rgba(0, 102, 204, 0.8)",
      "rgba(153, 204, 255, 0.8)",
    ],
    icon: <FaPalette size={14} />,  // Reduced icon size
    tooltip: "Blue",
  },
  green: {
    background: "bg-green-50",
    border: "border-green-300",
    text: "text-green-800",
    buttonBg: "bg-green-500",
    buttonText: "text-white",
    line: "rgba(40, 167, 69, 1)",
    pie: [
      "rgba(40, 167, 69, 0.8)",
      "rgba(23, 162, 184, 0.8)",
      "rgba(75, 192, 192, 0.8)",
    ],
    icon: <FaLeaf size={14} />,  // Reduced icon size
    tooltip: "Green",
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
    <div className={`w-full max-w-4xl  mx-auto rounded-lg shadow-lg ${colors.background} ${colors.text}`}>
      <div className="flex items-center justify-between p-4">
        <div className="text-center">
          <h1 className={` font-extrabold ${colors.text}`}>Earnings Report</h1>
          <p className={` ${colors.text}`}>Weekly Earnings Overview</p>
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0 flex space-x-1">
            {["light", "dark", "blue", "green"].map((themeName, index) => (
              <button
                key={index}
                onClick={() => applyTheme(themeName)}
                className="p-1.5 rounded-full focus:outline-none hover:opacity-75 border border-gray-300"  // Compact button style
                title={themes[themeName].tooltip}  // Tooltip on hover
              >
                {themes[themeName].icon}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-6 md:flex-row md:space-x-6">
        <div className={`w-full md:w-2/3 ${colors.background} rounded-lg shadow-md p-4`}>
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={100}
          />
        </div>
        <div className={`w-full md:w-1/3 ${colors.background} rounded-lg shadow-md p-4 flex flex-col items-center`}>
          <div className="text-lg font-bold">${earnings.toLocaleString()}</div>
          <div className={`mt-2 text-xl px-4 py-2 rounded-full ${percentageChange >= 0 ? "bg-green-500" : "bg-red-500"} text-white`}>
            {percentageChange >= 0 ? `+${percentageChange.toFixed(1)}%` : `${percentageChange.toFixed(1)}%`}
          </div>
          <p className={`mt-2 text-sm ${colors.text}`}>Compared to last week</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mb-4 md:grid-cols-3">
  {[
    { icon: FaDollarSign, label: "Earnings", value: earnings.toFixed(2), color: colors.pie[0] },
    { icon: FaChartLine, label: "Profit", value: profit.toFixed(2), color: colors.pie[1] },
    { icon: FaMoneyBillWave, label: "Expense", value: expense.toFixed(2), color: colors.pie[2] },
  ].map(({ icon: Icon, label, value, color }, index) => (
    <div
      key={index}
      className={`flex items-center p-2 rounded-md shadow-md transition-transform transform hover:scale-105 ${colors.background}`}  // Compact and rounded button with hover scaling
      style={{ border: `1px solid ${colors.border}` }}
    >
      <div
        className="flex items-center justify-center p-2 rounded-full"
        style={{ backgroundColor: color, width: "40px", height: "40px" }}  // Smaller icon container
      >
        <Icon size={14} className="text-white" />  {/* Smaller icon */}
      </div>
      <div className="ml-2">  {/* Smaller margin */}
        <p className={`text-xs font-semibold ${colors.text}`}>{label}</p>  {/* Smaller font for label */}
        <p className={`text-sm font-bold ${colors.text}`}>${value}</p>  {/* Slightly bolder text for value */}
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default EarningsReport;
