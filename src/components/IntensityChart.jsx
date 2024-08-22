/* eslint-disable react/prop-types */
import React, { useState, useMemo, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  Brush,
} from "recharts";
import { FaChartLine, FaChartBar, FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FixedSizeList as List } from "react-window";

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  listContainer: {
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxHeight: '300px', // Set max height for scroll
    overflowY: 'auto',  // Enable vertical scroll
  },
  listItem: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#fafafa',
    transition: 'background-color 0.3s',
  },
  listItemHover: {
    backgroundColor: '#e0e0e0',
  },
  chartContainer: {
    height: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
};

const sampleData = [
  { topic: "Topic 1", intensity: 4 },
  { topic: "Topic 2", intensity: 7 },
  { topic: "Topic 3", intensity: 6 },
  { topic: "Topic 4", intensity: 8 },
  { topic: "Topic 5", intensity: 5 },
  { topic: "Topic 6", intensity: 9 },
  { topic: "Topic 7", intensity: 6 },
  // Add more data here for testing
];

const IntensityGraphChart = ({ data = sampleData }) => {
  const [visibleDataCount, setVisibleDataCount] = useState(5);
  const [chartType, setChartType] = useState("line");
  const [filter, setFilter] = useState("all");

  const getFilteredData = useMemo(() => {
    return filter === "all"
      ? data
      : data.filter((d) => d.intensity > 5);
  }, [filter, data]);

  const filteredData = getFilteredData;

  const handleLoadMore = useCallback(() => {
    setVisibleDataCount((prevCount) => Math.min(prevCount + 1, filteredData.length));
  }, [filteredData.length]);

  const displayedData = filteredData.slice(-visibleDataCount);

  const chartData = useMemo(() => {
    return displayedData.map((item, index) => ({
      name: item.topic || `Topic ${index + 1}`,
      intensity: item.intensity || 0,
    }));
  }, [displayedData]);

  const renderChart = (chartDataSubset) => {
    switch (chartType) {
      case "line":
        return (
          <LineChart
            data={chartDataSubset}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            style={styles.chartContainer}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#333", fontSize: "12px" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Topics",
                position: "bottom",
                fill: "#333",
                fontSize: "14px",
              }}
            />
            <YAxis
              tick={{ fill: "#333", fontSize: "12px" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Intensity",
                angle: -90,
                position: "left",
                fill: "#333",
                fontSize: "14px",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#333", fontSize: "12px" }}
              itemStyle={{ color: "#333", fontSize: "12px" }}
              formatter={(value) => [`Intensity: ${value}`, ""]}
            />
            <Legend
              wrapperStyle={{ bottom: 0, left: 0 }}
              align="left"
              verticalAlign="bottom"
            />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={{ stroke: "#007bff", strokeWidth: 2, r: 4, fill: "#fff" }}
              activeDot={{ r: 6, stroke: "#007bff", strokeWidth: 2 }}
            >
              <LabelList dataKey="intensity" position="top" fontSize={10} />
            </Line>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Brush dataKey="name" height={20} stroke="#8884d8" />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart
            data={chartDataSubset}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            style={styles.chartContainer}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#333", fontSize: "12px" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Topics",
                position: "bottom",
                fill: "#333",
                fontSize: "14px",
              }}
            />
            <YAxis
              tick={{ fill: "#333", fontSize: "12px" }}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Intensity",
                angle: -90,
                position: "left",
                fill: "#333",
                fontSize: "14px",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#333", fontSize: "12px" }}
              itemStyle={{ color: "#333", fontSize: "12px" }}
              formatter={(value) => [`Intensity: ${value}`, ""]}
            />
            <Legend
              wrapperStyle={{ bottom: 0, left: 0 }}
              align="left"
              verticalAlign="bottom"
            />
            <Bar
              dataKey="intensity"
              fill="url(#barGradient)"
              barSize={20}
              radius={[5, 5, 0, 0]}
            >
              <LabelList dataKey="intensity" position="top" fontSize={10} />
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
              </linearGradient>
            </defs>
          </BarChart>
        );
      default:
        return null;
    }
  };

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector(".recharts-responsive-container");
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "chart.png";
        link.click();
      });
    }
  };

  const downloadChartAsPDF = () => {
    const chartElement = document.querySelector(".recharts-responsive-container");
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = 295;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save("chart.pdf");
      });
    }
  };

  const Row = ({ index, style }) => (
    <div
      style={{
        ...styles.listItem,
        ...style,
        ':hover': styles.listItemHover,
      }}
    >
      {displayedData[index].topic} - Intensity: {displayedData[index].intensity}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button
          onClick={downloadChartAsImage}
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          <FaDownload style={{ marginRight: '8px' }} />Image
        </button>
        <button
          onClick={downloadChartAsPDF}
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          <FaDownload style={{ marginRight: '8px' }} />PDF
        </button>
        <button
          onClick={() => setFilter(filter === "all" ? "intensity" : "all")}
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Filter: {filter === "all" ? "High Intensity" : "All"}
        </button>
        <button
          onClick={handleLoadMore}
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Load More
        </button>
      </div>
      <div style={styles.listContainer}>
        <List height={300} itemCount={displayedData.length} itemSize={60} width={1000}>
          {Row}
        </List>
      </div>
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart(chartData)}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IntensityGraphChart;
