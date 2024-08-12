import React, { useState } from 'react';
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

  const initialDataCount = 5;
  const displayedData = showAll ? data : data.slice(0, initialDataCount);

  const chartData = displayedData.map((item, index) => ({
    topic: item.topic || `Topic ${index + 1}`,
    relevance: item.relevance || 0,
  }));

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector('.chart-container');
    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'chart.jpg';
        link.click();
      });
    }
  };

  const downloadChartAsPDF = () => {
    const chartElement = document.querySelector('.chart-container');
    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
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
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-300 ease-in-out
            ${showAll ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
            ${darkMode ? 'text-white' : 'text-white'}`}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
        <button
          onClick={() => setChartType(chartType === 'pie' ? 'radar' : 'pie')}
          className="px-3 py-1 text-xs font-medium text-white transition-all duration-300 ease-in-out transform bg-purple-500 rounded-md shadow-sm hover:scale-105 hover:bg-purple-600 focus:ring-4 focus:ring-purple-400"
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
          className="px-3 py-1 text-xs font-medium text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-md shadow-sm hover:scale-105 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400"
        >
          <FaDownload className="inline-block mr-1 text-sm" />
          JPG
        </button>
        <button
          onClick={downloadChartAsPDF}
          className="px-3 py-1 text-xs font-medium text-white transition-all duration-300 ease-in-out transform bg-green-500 rounded-md shadow-sm hover:scale-105 hover:bg-green-600 focus:ring-4 focus:ring-green-400"
        >
          <FaDownload className="inline-block mr-1 text-sm" />
          PDF
        </button>
      </div>
      <div className="chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
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
