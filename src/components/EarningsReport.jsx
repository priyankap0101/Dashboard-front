import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import {
  FaDollarSign,
  FaChartLine,
  FaMoneyBillWave,
  FaSun,
  FaMoon,
  FaPalette,
  FaLeaf,
  FaCog,
} from "react-icons/fa";

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
    icon: <FaSun size={14} />,
    tooltip: "Light Theme",
  },
  dark: {
    background: "bg-gray-900",
    border: "border-gray-800",
    text: "text-gray-200",
    buttonBg: "bg-gray-800",
    buttonText: "text-gray-200",
    line: "rgba(255, 99, 132, 1)",
    pie: [
      "rgba(255, 99, 132, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 206, 86, 0.8)",
    ],
    icon: <FaMoon size={14} />,
    tooltip: "Dark Theme",
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
    icon: <FaPalette size={14} />,
    tooltip: "Blue Theme",
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
    icon: <FaLeaf size={14} />,
    tooltip: "Green Theme",
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
  const [showIcons, setShowIcons] = useState(false);

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

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth", width: 1.5 }, // Reduced stroke width
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      labels: { style: { colors: colors.text, fontSize: '0.8rem' } }, // Reduced font size
    },
    yaxis: { labels: { style: { colors: colors.text, fontSize: '0.8rem' } } }, // Reduced font size
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
      className={`w-full max-w-4xl mx-auto rounded-lg p-4 ${colors.background} ${colors.text}`} // Reduced padding
    >
      <div className="flex items-center justify-between p-1"> {/* Reduced padding */}
        <div className="text-center">
          <h1 className={`font-extrabold text-lg md:text-xl ${colors.text}`}> {/* Reduced font size */}
            Earnings Report
          </h1>
          <p className={`text-xs md:text-sm ${colors.text}`}> {/* Reduced font size */}
            Weekly Earnings Overview
          </p>
        </div>
        <div className="relative hidden sm:block">
          <div className="absolute top-0 right-0 flex space-x-1 md:space-x-2">
            {["light", "dark", "blue", "green"].map((themeName, index) => (
              <button
                key={index}
                onClick={() => applyTheme(themeName)}
                className="p-1 border border-gray-300 rounded-full focus:outline-none hover:opacity-75"
                title={themes[themeName].tooltip}
              >
                {themes[themeName].icon}
              </button>
            ))}
          </div>
        </div>

        <div className="relative block sm:hidden">
          <button
            onClick={toggleIcons}
            className="p-1 border border-gray-300 rounded-full focus:outline-none hover:opacity-75"
            title="Theme Options"
          >
            <FaCog size={16} />
          </button>

          {showIcons && (
            <div className="absolute right-0 flex flex-col p-1 mt-1 space-y-1 bg-white rounded-lg shadow-md">
              {["light", "dark", "blue", "green"].map((themeName, index) => (
                <button
                  key={index}
                  onClick={() => applyTheme(themeName)}
                  className="p-1 border border-gray-300 rounded-full focus:outline-none hover:opacity-75"
                  title={themes[themeName].tooltip}
                >
                  {themes[themeName].icon}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col mb-2 space-y-1 md:flex-row md:space-y-0 md:space-x-2"> {/* Reduced spacing */}
        <div
          className={`w-full md:w-2/3 ${colors.background} rounded-lg shadow-md p-1`} // Reduced padding
        >
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={170} // Further reduced height
          />
        </div>
        <div
          className={`w-full md:w-1/3 ${colors.background} rounded-lg shadow-md p-1 flex flex-col items-center`} // Reduced padding
        >
          <div className="text-lg font-bold md:text-xl"> {/* Reduced font size */}
            ${earnings.toLocaleString()}
          </div>
          <div
            className={`mt-1 text-sm px-1 py-0.5 rounded-full ${ // Reduced padding
              percentageChange >= 0 ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {percentageChange >= 0
              ? `+${percentageChange.toFixed(1)}%`
              : `${percentageChange.toFixed(1)}%`}
          </div>
          <p className={`mt-1 text-xs ${colors.text}`}> {/* Reduced font size */}
            Compared to last week
          </p>
        </div>
      </div>

      <div className="grid justify-center grid-cols-1 gap-1 md:grid-cols-3"> {/* Reduced spacing */}
        {[
          {
            icon: FaDollarSign,
            label: "Earnings",
            value: earnings.toFixed(2),
            color: colors.pie[0],
          },
          {
            icon: FaChartLine,
            label: "Profit",
            value: profit.toFixed(2),
            color: colors.pie[1],
          },
          {
            icon: FaMoneyBillWave,
            label: "Expenses",
            value: expense.toFixed(2),
            color: colors.pie[2],
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-1 border rounded-lg shadow-md ${colors.border}`} // Reduced padding
          >
            <item.icon className={`text-xl ${item.color}`} /> {/* Reduced icon size */}
            <h2 className="text-xs font-bold">{item.label}</h2> {/* Reduced font size */}
            <p className={`text-sm ${colors.text}`}>${item.value}</p> {/* Reduced font size */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsReport;
