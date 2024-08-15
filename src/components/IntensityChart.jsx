/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import {
  FaChartLine,
  FaChartBar,
  FaFilter,
  FaExpand,
  FaCompress,
  FaDownload,
  FaSyncAlt,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Sample data
const sampleData = [
  { topic: "Topic 1", intensity: 4 },
  { topic: "Topic 2", intensity: 7 },
  { topic: "Topic 3", intensity: 6 },
  { topic: "Topic 4", intensity: 8 },
  { topic: "Topic 5", intensity: 5 },
  { topic: "Topic 6", intensity: 9 },
  { topic: "Topic 7", intensity: 6 },
];

const IntensityGraphChart = ({ data = sampleData }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState("line");
  const [filter, setFilter] = useState("all");

  // Function to filter data based on intensity
  const getFilteredData = () => {
    if (filter === "all") {
      return data;
    }
    return data.filter((d) => d.intensity > 5);
  };

  // Filtered data based on the selected filter
  const filteredData = getFilteredData();

  // Slice data if not showing all
  const initialDataCount = 5;
  const displayedData = showAll
    ? filteredData
    : filteredData.slice(0, initialDataCount);

  const chartData = Array.isArray(displayedData)
    ? displayedData.map((item, index) => ({
        name: item.topic || `Topic ${index + 1}`,
        intensity: item.intensity || 0,
      }))
    : [];

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
          >
            {/* Removed CartesianGrid */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#555", fontSize: "10px" }}
              axisLine={false} // Removes axis line
              tickLine={false} // Removes tick lines
              label={{
                value: "Topics",
                position: "bottom",
                fill: "#555",
                fontSize: "12px",
              }}
            />
            <YAxis
              tick={{ fill: "#555", fontSize: "10px" }}
              axisLine={false} // Removes axis line
              tickLine={false} // Removes tick lines
              label={{
                value: "Intensity",
                angle: -90,
                position: "left",
                fill: "#555",
                fontSize: "12px",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "10px",
              }}
              labelStyle={{ color: "#555", fontSize: "10px" }}
              itemStyle={{ color: "#555", fontSize: "10px" }}
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
              dot={{ stroke: "#4a90e2", strokeWidth: 1, r: 3, fill: "#fff" }}
              activeDot={{ r: 5, stroke: "#4a90e2", strokeWidth: 2 }}
              isAnimationActive={true}
            >
              <LabelList dataKey="intensity" position="top" fontSize={8} />
            </Line>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4a90e2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Brush dataKey="name" height={20} stroke="#8884d8" />
            {/* Removed ReferenceLine */}
          </LineChart>
        );
      case "bar":
        return (
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
          >
            {/* Removed CartesianGrid */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#555", fontSize: "10px" }}
              axisLine={false} // Removes axis line
              tickLine={false} // Removes tick lines
              label={{
                value: "Topics",
                position: "bottom",
                fill: "#555",
                fontSize: "12px",
              }}
            />
            <YAxis
              tick={{ fill: "#555", fontSize: "10px" }}
              axisLine={false} // Removes axis line
              tickLine={false} // Removes tick lines
              label={{
                value: "Intensity",
                angle: -90,
                position: "left",
                fill: "#555",
                fontSize: "12px",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "10px",
              }}
              labelStyle={{ color: "#555", fontSize: "10px" }}
              itemStyle={{ color: "#555", fontSize: "10px" }}
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
              barSize={15}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            >
              <LabelList dataKey="intensity" position="top" fontSize={8} />
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4a90e2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Brush
              dataKey="name"
              height={15}
              stroke="#8884d8"
              fill="#8884d8"
              fontFamily="2px"
              width={100} // Adjust this value to reduce the width
              style={{ cursor: "pointer" }}
            />
            {/* Removed ReferenceLine */}
          </BarChart>
        );
      default:
        return null;
    }
  };

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector(
      ".recharts-responsive-container"
    );
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
    const chartElement = document.querySelector(
      ".recharts-responsive-container"
    );
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);

        // If content does not fit on one page, add additional pages
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

  const toggleFilter = () => {
    setFilter(filter === "all" ? "high" : "all");
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleChartType = () => {
    setChartType(chartType === "line" ? "bar" : "line");
  };

  return (
    <div className="w-full chart-container">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="mr-2 text-lg font-bold">Intensity Graph</h3>
          <button
            className="text-blue-500 transition-colors duration-200 hover:text-blue-600"
            onClick={toggleChartType}
          >
            {chartType === "line" ? (
              <FaChartBar className="w-5 h-5" />
            ) : (
              <FaChartLine className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
            onClick={toggleFilter}
          >
            <FaFilter className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
            onClick={toggleShowAll}
          >
            {showAll ? (
              <FaCompress className="w-5 h-5" />
            ) : (
              <FaExpand className="w-5 h-5" />
            )}
          </button>
          <button
            className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
            onClick={downloadChartAsImage}
          >
            <FaDownload className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
            onClick={downloadChartAsPDF}
          >
            <FaDownload className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
            onClick={() => window.location.reload()}
          >
            <FaSyncAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default IntensityGraphChart;
