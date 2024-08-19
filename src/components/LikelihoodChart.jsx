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
        borderColor: darkMode ? "#60A5FA" : "#4B5563",
        backgroundColor: darkMode
          ? [
              "rgba(75, 85, 99, 0.8)",
              "rgba(234, 88, 12, 0.8)",
              "rgba(16, 185, 129, 0.8)",
              "rgba(250, 204, 21, 0.8)",
              "rgba(139, 92, 246, 0.8)",
            ]
          : [
              "rgba(75, 85, 99, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 205, 86, 0.6)",
              "rgba(201, 203, 207, 0.6)",
            ],
        borderWidth: 2,
        hoverBackgroundColor: darkMode ? "#60A5FA" : "#60A5FA",
        hoverBorderColor: darkMode ? "#60A5FA" : "#60A5FA",
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        backgroundColor: darkMode ? "#1F2937" : "#F9FAFB",
        titleColor: darkMode ? "#D1D5DB" : "#1F2937",
        bodyColor: darkMode ? "#D1D5DB" : "#1F2937",
        borderColor: darkMode ? "#4B5563" : "#4B5563",
        borderWidth: 1,
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: darkMode ? "#D1D5DB" : "#374151",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
    animation: {
      duration: 1000,
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
    <div className={`p-4 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg`}>
      <div className="flex flex-wrap mb-4 space-x-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-4 py-2 text-sm font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform 
      ${
        showAll
          ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
          : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:scale-105 hover:from-blue-500 hover:to-blue-700"
      }`}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
        <button
          onClick={() =>
            setChartType(chartType === "doughnut" ? "polarArea" : "doughnut")
          }
          className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-indigo-400 to-indigo-600 hover:scale-105 hover:from-indigo-500 hover:to-indigo-700"
        >
          {chartType === "doughnut" ? "Polar Area" : "Doughnut"}{" "}
          <FaSync className="inline-block ml-1" />
        </button>
        <button
          onClick={downloadChartAsImage}
          className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 hover:scale-105 hover:from-purple-500 hover:to-purple-700"
        >
          Image <FaDownload className="inline-block ml-1" />
        </button>
        <button
          onClick={downloadChartAsPDF}
          className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-pink-400 to-pink-600 hover:scale-105 hover:from-pink-500 hover:to-pink-700"
        >
          PDF <FaDownload className="inline-block ml-1" />
        </button>
      </div>

      <div className="chart-container h-96">{renderChart()}</div>
    </div>
  );
};

export default LikelihoodChart;
