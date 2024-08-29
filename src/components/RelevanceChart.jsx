import React, { useState, useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Sector,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload, FaChartPie } from "react-icons/fa";
import { MdRadar } from "react-icons/md";

// Color palettes
const LIGHT_MODE_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF4D4F",
];
const DARK_MODE_COLORS = [
  "#4B77BE",
  "#5B8C5A",
  "#F1C40F",
  "#E67E22",
  "#C0392B",
];
const LIGHT_CHART_BACKGROUND_COLOR = "#F9FAFB"; // Lighter for light mode
const DARK_CHART_BACKGROUND_COLOR = "#1A202C"; // Darker for dark mode

const RelevanceChart = ({ data = [], darkMode }) => {
  const [displayedData, setDisplayedData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [chartType, setChartType] = useState("pie");
  const chartRef = useRef(null);

  useEffect(() => {
    loadMoreData();
  }, [data]);

  const loadMoreData = () => {
    if (startIndex + 5 > data.length) return;

    const newData = data.slice(startIndex, startIndex + 5);
    setDisplayedData(newData);
    setStartIndex((prevStartIndex) => prevStartIndex + 5);
  };

  const downloadChartAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, {
        useCORS: true,
        backgroundColor: darkMode
          ? DARK_CHART_BACKGROUND_COLOR
          : LIGHT_CHART_BACKGROUND_COLOR,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "chart.jpg";
        link.click();
      });
    }
  };

  const formatTick = (tick) => {
    const MAX_LABEL_LENGTH = 12; // Adjust this value as needed
    return tick.length > MAX_LABEL_LENGTH
      ? `${tick.slice(0, MAX_LABEL_LENGTH)}...`
      : tick;
  };

  const downloadChartAsPDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, {
        useCORS: true,
        backgroundColor: darkMode
          ? DARK_CHART_BACKGROUND_COLOR
          : LIGHT_CHART_BACKGROUND_COLOR,
      }).then((canvas) => {
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

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 15) * cos;
    const sy = cy + (outerRadius + 15) * sin;
    const ex = cx + (outerRadius + 25) * cos;
    const ey = cy + (outerRadius + 25) * sin;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text
          x={ex}
          y={ey}
          dy={8}
          textAnchor={textAnchor}
          fill={fill}
          fontSize={12}
          fontWeight="bold"
          className="shadow-md"
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#fff"
          strokeWidth={2}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={fill}
          opacity={0.6}
        />
      </g>
    );
  };

  const renderChart = () => {
    if (!displayedData || displayedData.length === 0) {
      return (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No data available
        </p>
      );
    }

    if (chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                border: `1px solid ${darkMode ? "#666" : "#ddd"}`,
                borderRadius: "8px",
                padding: "10px",
                fontSize: "1rem",
                color: darkMode ? "#E5E7EB" : "#2D3748",
              }}
              formatter={(value, name) => [
                `${value}`,
                `${name}: ${value} (${(
                  (value /
                    data.reduce((acc, item) => acc + item.relevance, 0)) *
                  100
                ).toFixed(1)}%)`,
              ]}
              labelFormatter={(label) => `Topic: ${label}`}
            />
            <Pie
              data={displayedData}
              dataKey="relevance"
              nameKey="topic"
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                name,
              }) => {
                const RADIAN = Math.PI / 180;
                const sin = Math.sin(-RADIAN * midAngle);
                const cos = Math.cos(-RADIAN * midAngle);
                const x = cx + (outerRadius + 20) * cos;
                const y = cy + (outerRadius + 20) * sin;

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#FF7F0E"
                    textAnchor={cos >= 0 ? "start" : "end"}
                    dominantBaseline="middle"
                    fontSize="12px"
                    fontWeight="bold"
                    className="shadow-md"
                  >
                    {name.length > 12 ? `${name.slice(0, 12)}...` : name}
                  </text>
                );
              }}
              activeShape={renderActiveShape}
            >
              {displayedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    darkMode
                      ? DARK_MODE_COLORS[index % DARK_MODE_COLORS.length]
                      : LIGHT_MODE_COLORS[index % LIGHT_MODE_COLORS.length]
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={displayedData}>
              <PolarGrid stroke={darkMode ? "#444" : "#ddd"} />
              <PolarAngleAxis
                dataKey="topic"
                stroke={darkMode ? "#E5E7EB" : "#2D3748"}
                tickMargin={15} // Increased margin for better label visibility
                tick={{ fill: darkMode ? "#FFC107" : "#FF7F0E", fontSize: 9 }}
                tickFormatter={(tick) =>
                  tick.length > 3 ? `${tick.slice(0, 15)}...` : tick
                }
              />
              <PolarRadiusAxis angle={50} domain={[0, 100]} />
              <Radar
                name="Relevance"
                dataKey="relevance"
                stroke={darkMode ? "#FFC107" : "#FF7F0E"}
              />
              <Tooltip
                contentStyle={{
                  border: `1px solid ${darkMode ? "#666" : "#ddd"}`,
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: darkMode ? "#E5E7EB" : "#2D3748",
                }}
                formatter={(value, name) => [`${value}`, `${name}: ${value}`]}
                labelFormatter={(label) => `Topic: ${label}`}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  return (
    <div>
      {/* Centered Button Group Above the Chart */}
      <div className="flex items-center justify-center mb-4 space-x-2">
        {/* Chart Type Toggle Button */}
        <button
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
          onClick={() => setChartType(chartType === "pie" ? "radar" : "pie")}
        >
          {chartType === "pie" ? (
            <>
              <MdRadar className="mr-1 text-2xl" />
              Radar
            </>
          ) : (
            <>
              <FaChartPie className="mr-1 text-2xl" />
              Pie
            </>
          )}
        </button>

        <button
          onClick={downloadChartAsPDF}
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          <FaDownload className="inline mr-1" />
          PDF
        </button>

        <button
          onClick={downloadChartAsImage}
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          <FaDownload className="inline mr-1" />
          JPG
        </button>
      </div>

      {/* Chart */}
      <div ref={chartRef} className="mb-4 h-96">
        {renderChart()}
      </div>

      {/* Load More Button Below the Chart */}
      <div className="flex justify-start mt-4">
        <button
          className="flex items-center justify-center w-32 px-2 py-1 text-xs font-semibold text-white transition-transform duration-300 transform bg-green-500 rounded-md shadow-lg h-7 hover:bg-green-600 hover:scale-105"
          onClick={loadMoreData}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default RelevanceChart;
