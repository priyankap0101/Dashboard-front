import React, { useState, useEffect } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaSync, FaDownload } from "react-icons/fa";

import { MdSwapHoriz } from "react-icons/md";

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const LikelihoodChart = ({ data, darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState("doughnut");

  const initialDataCount = 5;

  const transformData = () => {
    const likelihoodCounts = data.reduce((acc, curr) => {
      const likelihood = curr.likelihood;
      acc[likelihood] = acc[likelihood] ? acc[likelihood] + 1 : 1;
      return acc;
    }, {});

    return Object.keys(likelihoodCounts).map((likelihood) => ({
      label: likelihood,
      value: likelihoodCounts[likelihood],
    }));
  };

  const likelihoodData = transformData();
  const displayedData = showAll
    ? likelihoodData
    : likelihoodData.slice(0, initialDataCount);

  const chartData = {
    labels: displayedData.map((item) => item.label),
    datasets: [
      {
        label: "Likelihood Distribution",
        data: displayedData.map((item) => item.value),
        borderColor: darkMode ? "#9CA3AF" : "#2D3748", // Subtle borders for better contrast
        backgroundColor: darkMode
          ? [
              "rgba(96, 165, 250, 0.8)", // Soft blue
              "rgba(234, 88, 12, 0.8)", // Soft orange
              "rgba(16, 185, 129, 0.8)", // Soft green
              "rgba(250, 204, 21, 0.8)", // Soft yellow
              "rgba(139, 92, 246, 0.8)", // Soft purple
            ]
          : [
              "rgba(75, 85, 99, 0.6)", // Soft grayish blue
              "rgba(255, 159, 64, 0.6)", // Soft orange
              "rgba(153, 102, 255, 0.6)", // Soft purple
              "rgba(255, 205, 86, 0.6)", // Soft yellow
              "rgba(201, 203, 207, 0.6)", // Soft gray
            ],
        borderWidth: 2,
        hoverBackgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.9)" // Slightly brighter blue
          : "rgba(96, 165, 250, 0.8)", // Slightly muted blue
        hoverBorderColor: darkMode ? "#BFDBFE" : "#63B3ED", // Lighter shade on hover
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        backgroundColor: darkMode
          ? "rgba(31, 41, 55, 0.9)" // Darker background for tooltips
          : "rgba(255, 255, 255, 0.9)", // Lighter background for tooltips
        titleColor: darkMode ? "#E5E7EB" : "#2D3748", // Light text on dark background and dark text on light background
        bodyColor: darkMode ? "#E5E7EB" : "#2D3748",
        borderColor: darkMode ? "#4B5563" : "#E2E8F0", // Slightly lighter border
        borderWidth: 1.5,
        borderRadius: 6,
        titleFont: {
          size: 14,
          weight: "600",
        },
        bodyFont: {
          size: 12,
        },
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 15,
            weight: "bold",
          },
          color: darkMode ? "#E5E7EB" : "#2D3748", // Light text on dark background and dark text on light background
          padding: 16,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBackgroundColor: darkMode
          ? "rgba(96, 165, 250, 0.9)" // Brighter blue on hover
          : "rgba(96, 165, 250, 0.8)", // Muted blue on hover
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 6,
        shadowColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)", // Subtle shadow for light mode
      },
    },
    animation: {
      duration: 1200,
      easing: "easeInOutQuad",
    },
    backgroundColor: "transparent",
  };

  useEffect(() => {
    const canvasElements = document.querySelectorAll("canvas");
    canvasElements.forEach((canvas) => {
      canvas.style.backgroundColor = "transparent";
    });
  }, [darkMode, chartType]);

  const renderChart = () => {
    if (chartType === "doughnut") {
      return <Doughnut data={chartData} options={options} />;
    } else {
      return <PolarArea data={chartData} options={options} />;
    }
  };

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector(".chart-container");
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "chart.jpg";
        link.click();
      });
    }
  };

  const downloadChartAsPDF = () => {
    const chartElement = document.querySelector(".chart-container");
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("chart.pdf");
      });
    }
  };

  return (
    <div >
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() =>
            setChartType(chartType === "doughnut" ? "polarArea" : "doughnut")
          }
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          {chartType === "doughnut" ? "Polar Area" : "Doughnut"}{" "}
          <MdSwapHoriz className="inline-block ml-1" />
        </button>

        <button
          onClick={downloadChartAsPDF}
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          PDF <FaDownload className="inline-block ml-1" />
        </button>

        <button
          onClick={downloadChartAsImage}
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          JPG <FaDownload className="inline-block ml-1" />
        </button>
      </div>

      <div className=" chart-container h-96">{renderChart()}</div>

      <div className="flex justify-start">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center w-32 px-2 py-1 text-xs font-semibold text-white transition-transform duration-300 transform bg-green-500 rounded-md shadow-lg h-7 hover:bg-green-600 hover:scale-105"
        >
          {showAll ? "Load Less" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default LikelihoodChart;
