import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaDownload, FaChartLine, FaChartBar } from "react-icons/fa";

const IntensityGraphChart = ({ data, darkMode }) => {
  const [chartType, setChartType] = useState("bar"); // Default chart type
  const [visibleData, setVisibleData] = useState(data.slice(0, 5));
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: darkMode ? "#000000" : "#f7f7f7",
      borderRadius: "8px",
      boxShadow: darkMode ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "1000px",
      margin: "auto",
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    button: {
      padding: "4px 8px",
      backgroundColor: darkMode ? "#FFFFFF" : "#2D3748",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "10px",
      display: "flex",
      alignItems: "center",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      width: "100px",
      textAlign: "center",
      marginRight: "8px",
    },
    buttonHover: {
      backgroundColor: darkMode ? "#4a4a4a" : "#0056b3",
    },
    buttonActive: {
      transform: "scale(0.98)",
    },
    loadMoreButton: {
      padding: "4px 8px",
      backgroundColor: darkMode ? "#4caf50" : "#28a745",
      color: "#ffffff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      width: "100px",
      textAlign: "center",
    },
    loadingSpinner: {
      border: "2px solid #f3f3f3",
      borderRadius: "50%",
      borderTop: `2px solid ${darkMode ? "#007bff" : "#007bff"}`,
      width: "10px",
      height: "10px",
      animation: "spin 2s linear infinite",
    },
    chartContainer: {
      height: "400px",
      marginTop: "20px",
      borderRadius: "8px",
      boxShadow: darkMode ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "10px", // Add padding to avoid cutting off chart edges
    },
    buttonIcon: {
      marginRight: "2px",
    },
  };

  const handleChartTypeToggle = () => {
    setChartType((prevType) => (prevType === "bar" ? "line" : "bar"));
  };

  const handleLoadMore = () => {
    if (loading || visibleData.length >= data.length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisibleData((prevData) => {
        const nextIndex = prevData.length;
        const newData = [
          ...prevData.slice(1),
          { ...data[nextIndex], isNew: true },
        ];
        return newData;
      });
    }, 1000);
  };

  const handleExportPDF = () => {
    const input = document.getElementById("chart-container");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
        pdf.save("chart.pdf");
      });
    }
  };

  const handleExportImage = () => {
    const input = document.getElementById("chart-container");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "chart.png";
        link.click();
      });
    }
  };

  const renderChart = (data) => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke={darkMode ? "#ffffff" : "#000000"} 
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis 
              stroke={darkMode ? "#FFFFFF" : "#2D3748"} 
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? "#333" : "#ffffff", 
                color: darkMode ? "#ffffff" : "#000000", 
                borderRadius: 8, 
                border: '1px solid', 
                borderColor: darkMode ? "#444" : "#ccc", 
                padding: '8px 12px' 
              }} 
            />
            <Bar 
              dataKey="intensity" 
              fill={darkMode ? "#ff7f0e" : "#1f77b4"} 
              barSize={30}
            />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <XAxis dataKey="name" stroke={ darkMode ? "#E5E7EB" : "#2D3748"} />
            <YAxis stroke={ darkMode ? "#E5E7EB" : "#2D3748"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#ffffff", color: darkMode ? "#f7dc6f " : "#000000" }} />
            <Line type="monotone" dataKey="intensity" stroke= "#d35400 " strokeWidth={1} />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div id="chart-container" >
      <div className="flex justify-center mb-4 space-x-2">
        <button
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
          onClick={handleChartTypeToggle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
        >
          {chartType === "bar" ? (
            <>
              <FaChartLine className="mr-2" /> Line
            </>
          ) : (
            <>
              <FaChartBar className="mr-2" /> Bar
            </>
          )}
        </button>
        <button
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
          onClick={handleExportPDF}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
        >
          <FaDownload className="mr-2" /> PDF
        </button>
        <button
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
          onClick={handleExportImage}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
        >
          <FaDownload className="mr-2" /> Image
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {renderChart(visibleData)}
      </ResponsiveContainer>
      {visibleData.length < data.length && (
        <button
          className="flex items-center justify-center w-32 px-2 py-1 text-xs font-semibold text-white transition-transform duration-300 transform bg-green-500 rounded-md shadow-lg h-7 hover:bg-green-600 hover:scale-105"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? (
            <div style={styles.loadingSpinner}></div>
          ) : (
            "Load More"
          )}
        </button>
      )}
    </div>
  );
};

export default IntensityGraphChart;
