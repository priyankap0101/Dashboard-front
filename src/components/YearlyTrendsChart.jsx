import React, { useState, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList, Legend,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaChartBar, FaChartPie, FaSpinner } from 'react-icons/fa';

const YearlyTrendsChart = ({ data = [], darkMode }) => {
  const [currentData, setCurrentData] = useState(data.slice(0, 5).map((item, index) => ({ ...item, isNew: index === 4 })));
  const [currentIndex, setCurrentIndex] = useState(5);
  const [chartType, setChartType] = useState('bar');
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);

  // Download chart as an image or PDF
  const downloadChart = (format) => {
    if (chartRef.current) {
      html2canvas(chartRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        if (format === 'pdf') {
          const pdf = new jsPDF('landscape');
          pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
          pdf.save('chart.pdf');
        } else {
          link.href = canvas.toDataURL(`image/${format}`);
          link.download = `chart.${format}`;
          link.click();
        }
      }).catch((error) => console.error('Error downloading chart:', error));
    }
  };

  // Load more data and update chart
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      if (currentIndex < data.length) {
        const newData = [
          ...currentData.slice(1),
          { ...data[currentIndex], isNew: true }
        ].map((item, index) => ({ ...item, isNew: index === currentData.length - 1 }));
        setCurrentData(newData);
        setCurrentIndex(currentIndex + 1);
      }
      setLoading(false);
    }, 1000);
  };

  // Handle chart type toggle
  const toggleChartType = () => setChartType(prevType => (prevType === 'bar' ? 'pie' : 'bar'));

  // Define chart color based on dark mode and new data
  const getChartColor = (isNew) => (isNew ? '#ff7300' : (darkMode ? '#8884d8' : '#82ca9d'));

  // Render chart
  const renderChart = () => {
    if (chartType === 'bar') {
      return (
        <BarChart data={currentData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <XAxis
            dataKey="year"
            tick={{ fill: darkMode ? '#ddd' : '#555' }}
            axisLine={{ stroke: darkMode ? '#666' : '#ddd' }}
            tickLine={{ stroke: darkMode ? '#666' : '#ddd' }}
            label={{ value: 'Year', position: 'bottom', fill: darkMode ? '#ddd' : '#555' }}
          />
          <YAxis
            tick={{ fill: darkMode ? '#ddd' : '#555' }}
            axisLine={{ stroke: darkMode ? '#666' : '#ddd' }}
            tickLine={{ stroke: darkMode ? '#666' : '#ddd' }}
            label={{ value: 'Intensity', angle: -90, position: 'left', fill: darkMode ? '#ddd' : '#555' }}
          />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ddd' }} />
          <Bar dataKey="intensity" fill={darkMode ? '#8884d8' : '#82ca9d'} animationDuration={500}>
            {currentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getChartColor(entry.isNew)} />
            ))}
          </Bar>
          <Legend
            wrapperStyle={{ padding: 10 }}
            iconType="circle"
            iconSize={12}
            formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
          />
        </BarChart>
      );
    } else {
      return (
        <PieChart>
          <Pie
            data={currentData}
            dataKey="intensity"
            nameKey="year"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={darkMode ? '#8884d8' : '#82ca9d'}
            animationDuration={500}
            labelLine={false} // Disables label lines
            label={({ name }) => <span style={{ fill: darkMode ? '#ddd' : '#555' }}>{name}</span>}
          >
            {currentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getChartColor(entry.isNew)} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ddd' }} />
          <Legend
            wrapperStyle={{ padding: 10 }}
            iconType="circle"
            iconSize={12}
            formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
          />
        </PieChart>
      );
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg transition-colors ${darkMode ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      {/* Controls Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleChartType}
             className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
            title={`Switch to ${chartType === 'bar' ? 'Pie' : 'Bar'} Chart`}
          >
            {chartType === 'bar' ? <FaChartBar className="inline-block ml-1" /> : <FaChartPie className="inline-block ml-1" />}
            {chartType === 'bar' ? 'Bar Chart' : 'Pie Chart'}
          </button>
      
       
          {currentIndex < data.length && (
            <button
              onClick={loadMore}
              className="flex items-center justify-center w-32 px-2 py-1 text-xs font-semibold text-white transition-transform duration-300 transform bg-green-500 rounded-md shadow-lg h-7 hover:bg-green-600 hover:scale-105"
              aria-label="Show More"
            >
              {loading ? <FaSpinner className="mr-2 text-base animate-spin" /> : 'Load More'}
            </button>
          )}
          <button
            onClick={() => downloadChart('jpeg')}
             className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
            aria-label="Download Chart as JPG"
          >
            <FaDownload className="inline-block mr-1 text-base" />
            JPG
          </button>
          <button
            onClick={() => downloadChart('pdf')}
              className="flex items-center justify-center w-20 text-xs font-semibold text-white transition-transform duration-300 transform rounded-md shadow-lg h-7 hover:scale-105 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700"
            aria-label="Download Chart as PDF"
          >
            <FaDownload className="inline-block mr-1 text-base" />
            PDF
          </button>
          </div>
          
      </div>

      {/* Main Chart Section */}
      <div ref={chartRef} className="relative h-96">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearlyTrendsChart;
