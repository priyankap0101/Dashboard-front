import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const YearlyTrendsChart = ({ data = [], darkMode }) => {
  const [showAll, setShowAll] = useState(false);

  // Adjust the number of years shown initially
  const initialDataCount = 5;
  const displayedData = showAll ? data : data.slice(0, initialDataCount);

  return (
    <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h3 className={`mb-4 text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Yearly Trends
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={displayedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e0e0e0'} />
          <XAxis
            dataKey="year"
            tick={{ fill: darkMode ? '#ddd' : '#555' }}
            axisLine={{ stroke: darkMode ? '#666' : '#ddd', strokeWidth: 1 }}
            tickLine={{ stroke: darkMode ? '#666' : '#ddd' }}
            label={{ value: 'Year', position: 'bottom', fill: darkMode ? '#ddd' : '#555' }}
          />
          <YAxis
            tick={{ fill: darkMode ? '#ddd' : '#555' }}
            axisLine={{ stroke: darkMode ? '#666' : '#ddd', strokeWidth: 1 }}
            tickLine={{ stroke: darkMode ? '#666' : '#ddd' }}
            label={{ value: 'Intensity', angle: -90, position: 'left', fill: darkMode ? '#ddd' : '#555' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: darkMode ? '#555' : '#fff', border: `1px solid ${darkMode ? '#888' : '#ccc'}`, borderRadius: '8px' }}
            labelStyle={{ color: darkMode ? '#fff' : '#000' }}
            itemStyle={{ color: darkMode ? '#fff' : '#000' }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: darkMode ? '#ddd' : '#555' }} />
          <Area
            type="monotone"
            dataKey="intensity"
            stroke={darkMode ? '#FFC107' : '#8884d8'}
            fill={darkMode ? 'rgba(255, 193, 7, 0.4)' : 'rgba(136, 132, 216, 0.4)'}
            dot={{ stroke: darkMode ? '#FFC107' : '#8884d8', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: darkMode ? '#FFC107' : '#8884d8', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out 
            ${showAll ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400'}`}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

export default YearlyTrendsChart;
