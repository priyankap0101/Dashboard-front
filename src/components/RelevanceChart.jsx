import React, { useState, useRef } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaChartPie, FaChartLine } from 'react-icons/fa';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4D4F'];

const RelevanceChart = ({ data = [], darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState('pie');
  const chartRef = useRef(null); // Create a ref for the chart container

  const initialDataCount = 5;
  const displayedData = showAll ? data : data.slice(0, initialDataCount);

  const chartData = displayedData.map((item, index) => ({
    topic: item.topic || `Topic ${index + 1}`,
    relevance: item.relevance || 0,
  }));

  const downloadChartAsImage = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current, {
        useCORS: true,
        backgroundColor: null,
      }).then(canvas => {
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
        backgroundColor: null,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
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
    <div className={`p-6 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg`}>
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`w-20 h-7 text-xs font-semibold rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105 
            ${
              showAll
                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                : "bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700"
            } flex items-center justify-center`}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
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
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#555' : '#fff', border: `1px solid ${darkMode ? '#888' : '#ddd'}`, borderRadius: '8px' }} />
              <Pie
                data={chartData}
                dataKey="relevance"
                nameKey="topic"
                outerRadius={120}
                fill={darkMode ? '#FFC107' : '#FF7F0E'}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <RadarChart outerRadius={120} width={730} height={250} data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="topic" />
              <PolarRadiusAxis />
              <Radar
                name="Relevance"
                dataKey="relevance"
                stroke={darkMode ? '#FFC107' : '#FF7F0E'}
                fill={darkMode ? '#FFC107' : '#FF7F0E'}
                fillOpacity={0.6}
              />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#555' : '#fff', border: `1px solid ${darkMode ? '#888' : '#ddd'}`, borderRadius: '8px' }} />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RelevanceChart;
