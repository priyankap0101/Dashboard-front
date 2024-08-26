import React, { useState, useRef, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Sector
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaChartPie } from 'react-icons/fa';
import { MdRadar } from 'react-icons/md';

const LIGHT_MODE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4D4F'];
const DARK_MODE_COLORS = ['#4B77BE', '#5B8C5A', '#F1C40F', '#E67E22', '#C0392B'];
const LIGHT_CHART_BACKGROUND_COLOR = '#E5E7EB'; // Light mode background color
const DARK_CHART_BACKGROUND_COLOR = '#2D3748'; // Dark mode background color

const RelevanceChart = ({ data = [], darkMode }) => {
  const [displayedData, setDisplayedData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [chartType, setChartType] = useState('pie');
  const [showAll, setShowAll] = useState(false); // Moved inside the component function
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
        backgroundColor: darkMode ? DARK_CHART_BACKGROUND_COLOR : LIGHT_CHART_BACKGROUND_COLOR,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'chart.jpg';
        link.click();
      });
    }
  };

  const downloadChartAsPDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, {
        useCORS: true,
        backgroundColor: darkMode ? DARK_CHART_BACKGROUND_COLOR : LIGHT_CHART_BACKGROUND_COLOR,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('chart.pdf');
      });
    }
  };

  const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 15) * cos;
    const sy = cy + (outerRadius + 15) * sin;
    const ex = cx + (outerRadius + 25) * cos;
    const ey = cy + (outerRadius + 25) * sin;
    const textAnchor = cos >= 0 ? 'start' : 'end';

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
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 15}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={fill}
          opacity={0.5}
        />
      </g>
    );
  };

  const renderChart = () => {
    if (!displayedData || displayedData.length === 0) {
      return <p className="text-center text-gray-600 dark:text-gray-300">No data available</p>;
    }

    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#333' : '#fff',
                border: `1px solid ${darkMode ? '#666' : '#ddd'}`,
                borderRadius: '8px',
                padding: '10px',
                fontSize: '12px',
                color: darkMode ? "#E5E7EB" : "#2D3748",
              }}
              formatter={(value, name) => [`${value}`, `${name}: ${value} (${(value / data.reduce((acc, item) => acc + item.relevance, 0) * 100).toFixed(1)}%)`]}
              labelFormatter={(label) => `Topic: ${label}`}
            />
            <Pie
              data={displayedData}
              dataKey="relevance"
              nameKey="topic"
              outerRadius={80}
              fill={"#FF0000"}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
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
                    textAnchor={cos >= 0 ? 'start' : 'end'}
                    dominantBaseline="middle"
                    fontSize="10px"
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '80px' }}
                  >
                    {name.length > 12 ? `${name.slice(0, 12)}...` : name}
                  </text>
                );
              }}
              activeShape={renderActiveShape}
            >
              {displayedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={darkMode ? DARK_MODE_COLORS[index % DARK_MODE_COLORS.length] : LIGHT_MODE_COLORS[index % LIGHT_MODE_COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={displayedData}>
            <PolarGrid stroke={darkMode ? '#555' : '#ddd'} />
            <PolarAngleAxis
              dataKey="topic"
              stroke={darkMode ? "#E5E7EB" : "#2D3748"}
              tick={{ fill: '#FF7F0E' }}
              tickFormatter={(tick) => tick.length > 12 ? `${tick.slice(0, 12)}...` : tick}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Relevance"
              dataKey="relevance"
              stroke={darkMode ? '#FFC107' : '#FF7F0E'}
              fill={darkMode ? '#FFC107' : '#FF7F0E'}
              fillOpacity={0.6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#333' : '#fff',
                border: `1px solid ${darkMode ? '#666' : '#ddd'}`,
                borderRadius: '8px',
                padding: '10px',
                fontSize: '12px',
                color: darkMode ? "#E5E7EB" : "#2D3748",
              }}
              formatter={(value, name) => [`${value}`, `${name}: ${value}`]}
              labelFormatter={(label) => `Topic: ${label}`}
            />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg`}>
      <div className="flex justify-center mb-4 space-x-2">
        
      <button
          onClick={() => setChartType(chartType === 'pie' ? 'radar' : 'pie')}
         className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          {chartType === 'pie' ? <MdRadar /> : <FaChartPie  />}
          {chartType === 'pie' ? 'Radar Chart' : 'Pie Chart'}
        </button>
        
        
          <button
           className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
            onClick={downloadChartAsImage}
          >
            <FaDownload className="inline-block" /> Image
          </button>
          <button
           className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
            onClick={downloadChartAsPDF}
          >
            <FaDownload className="inline-block" /> PDF
          </button>

          {!showAll && startIndex < data.length && (
        <button
         className="flex items-center px-3 py-1.5 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={loadMoreData}
        >
          Load More
        </button>
      )}
       
      </div>
      <div ref={chartRef}>
        {renderChart()}
      </div>
      
    </div>
  );
};

export default RelevanceChart;
