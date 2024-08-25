import React, { useState, useRef } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaChartPie, FaChartLine } from 'react-icons/fa';

// Define colors for light and dark modes
const LIGHT_MODE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4D4F'];
const DARK_MODE_COLORS = ['#4B77BE', '#5B8C5A', '#F1C40F', '#E67E22', '#C0392B'];
const LIGHT_CHART_BACKGROUND_COLOR = '#ffffff'; // Light background for charts
const DARK_CHART_BACKGROUND_COLOR = '#2D2D2D'; // Dark background for charts

const RelevanceChart = ({ data = [], darkMode }) => {
  const [displayedData, setDisplayedData] = useState(data.slice(0, 5));
  const [startIndex, setStartIndex] = useState(0);
  const [chartType, setChartType] = useState('pie');
  const chartRef = useRef(null);

  const loadMoreData = () => {
    setDisplayedData((prevData) => {
      if (startIndex + prevData.length >= data.length) return prevData;

      const newData = data.slice(startIndex + 1, startIndex + 6);
      setStartIndex((prevStartIndex) => prevStartIndex + 1);

      return newData;
    });
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

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => setChartType(chartType === 'pie' ? 'radar' : 'pie')}
          className="flex items-center justify-center text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg w-28 h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
        >
          {chartType === 'pie' ? (
            <>
              <FaChartPie className="inline-block mr-1 text-sm" />
              Radar Chart
            </>
          ) : (
            <>
              <FaChartLine className="inline-block mr-1 text-sm" />
              Pie Chart
            </>
          )}
        </button>
        <button
          onClick={downloadChartAsImage}
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
        >
          <FaDownload className="inline-block mr-1 text-sm" />
          JPG
        </button>
        <button
          onClick={downloadChartAsPDF}
          className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
        >
          <FaDownload className="inline-block mr-1 text-sm" />
          PDF
        </button>
      </div>
      <div ref={chartRef} className="chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#444' : '#fff',
                  border: `1px solid ${darkMode ? '#666' : '#ddd'}`,
                  borderRadius: '8px',
                }}
                formatter={(value, name) => [`${value}`, `${name}: ${value} (${(value / data.reduce((acc, item) => acc + item.relevance, 0) * 100).toFixed(1)}%)`]}
                labelFormatter={(label) => `Topic: ${label}`}
              />
              <Pie
                data={displayedData}
                dataKey="relevance"
                nameKey="topic"
                outerRadius={120}
                fill={darkMode ? '#FFC107' : '#FF7F0E'}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
              >
                {displayedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={darkMode ? DARK_MODE_COLORS[index % DARK_MODE_COLORS.length] : LIGHT_MODE_COLORS[index % LIGHT_MODE_COLORS.length]} />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ color: darkMode ? '#ccc' : '#000' }}
                formatter={(value) => `Topic: ${value}`}
              />
            </PieChart>
          ) : (
            <RadarChart outerRadius={150} width={500} height={500} data={displayedData}>
              <PolarGrid stroke={darkMode ? '#555' : '#ddd'} />
              <PolarAngleAxis dataKey="topic" stroke={darkMode ? '#ccc' : '#000'} />
              <PolarRadiusAxis angle={30} stroke={darkMode ? '#ccc' : '#000'} />
              <Radar
                name="Relevance"
                dataKey="relevance"
                stroke={darkMode ? '#FFC107' : '#FF7F0E'}
                fill={darkMode ? '#FFC107' : '#FF7F0E'}
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#444' : '#fff',
                  border: `1px solid ${darkMode ? '#666' : '#ddd'}`,
                  borderRadius: '8px',
                }}
                formatter={(value, name) => [`${value}`, `Relevance: ${value}`]}
                labelFormatter={(label) => `Topic: ${label}`}
              />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>
      {data.length > displayedData.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreData}
            className="w-32 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-teal-400 to-teal-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RelevanceChart;
