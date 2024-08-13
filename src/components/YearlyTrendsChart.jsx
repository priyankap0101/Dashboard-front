import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, LabelList,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaChartBar, FaChartPie } from 'react-icons/fa';

const YearlyTrendsChart = ({ data = [], darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState('bar'); // Default to BarChart

  const initialDataCount = 5;
  const displayedData = showAll ? data : data.slice(0, initialDataCount);

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
    <div className="p-4 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg">
    
      <div className="flex justify-center mb-4 space-x-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md shadow-md transition-all duration-300 ease-in-out 
            ${showAll ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
            ${darkMode ? 'text-white' : 'text-white'}`}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
        <button
          onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
          className="px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ease-in-out transform bg-purple-500 rounded-md shadow-md hover:scale-105 hover:bg-purple-600 focus:ring-4 focus:ring-purple-400"
        >
          {chartType === 'bar' ? (
            <>
              <FaChartPie className="inline-block mr-1 text-xs" />
              Pie Chart
            </>
          ) : (
            <>
              <FaChartBar className="inline-block mr-1 text-xs" />
              Bar Chart
            </>
          )}
        </button>
        <button
          onClick={downloadChartAsImage}
          className="px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-md shadow-md hover:scale-105 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400"
        >
          <FaDownload className="inline-block mr-1 text-xs" />
          JPG
        </button>
        <button
          onClick={downloadChartAsPDF}
          className="px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ease-in-out transform bg-green-500 rounded-md shadow-md hover:scale-105 hover:bg-green-600 focus:ring-4 focus:ring-green-400"
        >
          <FaDownload className="inline-block mr-1 text-xs" />
          PDF
        </button>
      </div>
      <div className={`p-4 rounded-lg chart-container`} style={{ position: 'relative', height: '350px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={displayedData} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ddd'} />
              <XAxis
                dataKey="year"
                tick={{ fill: darkMode ? '#ddd' : '#555', fontSize: 12 }}
                axisLine={{ stroke: darkMode ? '#666' : '#ddd', strokeWidth: 1 }}
                tickLine={{ stroke: darkMode ? '#666' : '#ddd' }}
                label={{ value: 'Year', position: 'bottom', fill: darkMode ? '#ddd' : '#555', fontSize: 14 }}
              />
              <YAxis
                tick={{ fill: darkMode ? '#ddd' : '#555', fontSize: 12 }}
                axisLine={{ stroke: darkMode ? '#666' : '#ddd', strokeWidth: 1 }}
                tickLine={{ stroke: darkMode ? '#666' : '#ddd' }}
                label={{ value: 'Intensity', angle: -90, position: 'left', fill: darkMode ? '#ddd' : '#555', fontSize: 14 }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: `1px solid ${darkMode ? '#555' : '#ccc'}`, borderRadius: '8px' }}
                labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                cursor={false}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ color: darkMode ? '#ddd' : '#555' }} />
              <Bar dataKey="intensity" fill={darkMode ? 'url(#gradient)' : '#8884d8'} animationDuration={1000}>
                <LabelList dataKey="intensity" position="top" fill={darkMode ? '#ddd' : '#555'} fontSize={12} fontWeight="bold" />
              </Bar>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFC107" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          ) : (
            <PieChart>
              <Tooltip
                contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: `1px solid ${darkMode ? '#555' : '#ccc'}`, borderRadius: '8px' }}
                labelStyle={{ color: darkMode ? '#fff' : '#000' }}
                itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                cursor={false}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ color: darkMode ? '#ddd' : '#555' }} />
              <Pie
                data={displayedData}
                dataKey="intensity"
                fill={darkMode ? '#FFC107' : '#8884d8'}
                label
                animationDuration={1000}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyTrendsChart;
