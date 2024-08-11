import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const IntensityGraphChart = ({ data = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const initialDataCount = 5;
  const displayedData = showAll ? data : data.slice(0, initialDataCount);

  const chartData = Array.isArray(displayedData) ? displayedData.map((item, index) => ({
    name: item.topic || `Topic ${index + 1}`,
    intensity: item.intensity || 0
  })) : [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Intensity Graph</h3>
      <ResponsiveContainer width="100%" height={400}>
        {showAll ? (
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#555' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Topics', position: 'bottom', fill: '#555' }}
            />
            <YAxis
              tick={{ fill: '#555' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Intensity', angle: -90, position: 'left', fill: '#555' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
              labelStyle={{ color: '#555' }}
              itemStyle={{ color: '#555' }}
            />
            <Legend wrapperStyle={{ bottom: 0, left: 0 }} align="left" verticalAlign="bottom" />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#4a90e2"
              strokeWidth={3}
              dot={{ stroke: '#4a90e2', strokeWidth: 2, r: 6, fill: '#fff' }}
              activeDot={{ r: 8, stroke: '#4a90e2', strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </LineChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#555' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Topics', position: 'bottom', fill: '#555' }}
            />
            <YAxis
              tick={{ fill: '#555' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Intensity', angle: -90, position: 'left', fill: '#555' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
              labelStyle={{ color: '#555' }}
              itemStyle={{ color: '#555' }}
            />
            <Legend wrapperStyle={{ bottom: 0, left: 0 }} align="left" verticalAlign="bottom" />
            <Bar
              dataKey="intensity"
              fill="#4a90e2"
              barSize={30}
              radius={[5, 5, 0, 0]} // Rounded corners for the top of bars
              onMouseEnter={(e) => {
                e.target.setAttribute('fill', '#357ABD'); // Darker blue on hover
              }}
              onMouseLeave={(e) => {
                e.target.setAttribute('fill', '#4a90e2'); // Original color on leave
              }}
            />
          </BarChart>
        )}
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

export default IntensityGraphChart;
