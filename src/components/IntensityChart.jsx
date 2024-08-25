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
  LabelList,
} from "recharts";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaDownload, FaExchangeAlt } from "react-icons/fa";

const IntensityGraphChart = ({ data, darkMode }) => {
  const [chartType, setChartType] = useState("bar");
  const [visibleData, setVisibleData] = useState(data.slice(0, 5));
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: darkMode ? "#2a2a2a" : "#ffffff",
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
      backgroundColor: darkMode ? "#3a3a3a" : "#007bff",
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
      backgroundColor: darkMode ? "#2a2a2a" : "#ffffff", // Updated background color based on darkMode
      borderRadius: "8px",
      boxShadow: darkMode ? "0 4px 8px rgba(0, 0, 0, 0.5)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "10px", // Add padding to avoid cutting off chart edges
    },
    buttonIcon: {
      marginRight: "2px",
    },
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

  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "line" ? "bar" : "line"));
  };

  const handleExportPDF = () => {
    const input = document.getElementById("chart-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
      pdf.save("chart.pdf");
    });
  };

  const handleExportImage = () => {
    const input = document.getElementById("chart-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "chart.png";
      link.click();
    });
  };

  const renderChart = (data) => {
    switch (chartType) {
      case "bar":
        return (
          <BarChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
            <XAxis dataKey="name" stroke={darkMode ? "#ffffff" : "#000000"} />
            <YAxis stroke={darkMode ? "#ffffff" : "#000000"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }} />
            <Bar dataKey="intensity" fill="#ff7f0e">
              <LabelList dataKey="intensity" position="top" fill={darkMode ? "#ffffff" : "#000000"} />
            </Bar>
          </BarChart>
        );
      case "line":
        return (
          <LineChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
            <XAxis dataKey="name" stroke={darkMode ? "#ffffff" : "#000000"} />
            <YAxis stroke={darkMode ? "#ffffff" : "#000000"} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }} />
            <Line type="monotone" dataKey="intensity" stroke="#1f77b4" strokeWidth={2}>
              <LabelList dataKey="intensity" position="top" fill={darkMode ? "#ffffff" : "#000000"} />
            </Line>
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={toggleChartType}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
        >
          <FaExchangeAlt style={styles.buttonIcon} /> Switch
        </button>
        <button
          style={styles.button}
          onClick={handleExportImage}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
        >
          <FaDownload style={styles.buttonIcon} /> Image
        </button>
        <button
          style={styles.button}
          onClick={handleExportPDF}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = ""}
        >
          <FaDownload style={styles.buttonIcon} /> PDF
        </button>
        {visibleData.length < data.length && (
          <button
            style={styles.loadMoreButton}
            onClick={handleLoadMore}
          >
            {loading ? (
              <span style={styles.loadingSpinner}></span>
            ) : (
              "Load More"
            )}
          </button>
        )}
      </div>
      <div id="chart-container" style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart(visibleData)}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IntensityGraphChart;
