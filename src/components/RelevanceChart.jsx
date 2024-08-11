import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const RelevanceChart = ({ data = [], darkMode }) => {
  const [showAll, setShowAll] = useState(false);

  // Adjust the number of bars shown initially
  const initialDataCount = 5;
  const displayedData = showAll ? data : data.slice(0, initialDataCount);

  const chartData = displayedData.map((item, index) => ({
    topic: item.topic || `Topic ${index + 1}`,
    relevance: item.relevance || 0,
    lineData: item.relevance || 0
  }));

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h3 className={`mb-6 text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Relevance
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#e0e0e0'} />
          <XAxis dataKey="topic" tick={{ fill: darkMode ? '#ddd' : '#555' }} axisLine={{ stroke: darkMode ? '#666' : '#ddd', strokeWidth: 1 }} tickLine={{ stroke: darkMode ? '#666' : '#ddd' }} />
          <YAxis tick={{ fill: darkMode ? '#ddd' : '#555' }} axisLine={{ stroke: darkMode ? '#666' : '#ddd', strokeWidth: 1 }} tickLine={{ stroke: darkMode ? '#666' : '#ddd' }} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#555' : '#fff', border: `1px solid ${darkMode ? '#888' : '#ddd'}`, borderRadius: '8px' }} />
          <Legend wrapperStyle={{ color: darkMode ? '#ddd' : '#555' }} />
          <Bar
            dataKey="relevance"
            fill={darkMode ? '#9ACD32' : '#1F77B4'}
            barSize={30}
            radius={[5, 5, 0, 0]}
            onMouseEnter={(e) => e.target.setAttribute('fill', darkMode ? '#7ACD32' : '#1177B4')}
            onMouseLeave={(e) => e.target.setAttribute('fill', darkMode ? '#9ACD32' : '#1F77B4')}
          />
          {/* Adding a LineChart for additional visual interest */}
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <Line
              type="monotone"
              dataKey="lineData"
              stroke={darkMode ? '#FFC107' : '#FF7F0E'}
              strokeWidth={2}
              dot={{ stroke: darkMode ? '#FFC107' : '#FF7F0E', strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: darkMode ? '#FFC107' : '#FF7F0E', strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </LineChart>
        </BarChart>
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

export default RelevanceChart;
