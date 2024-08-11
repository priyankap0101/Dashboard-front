import React from 'react';
import {
  RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer, Label
} from 'recharts';

const IntensityRadialBarChart = ({ data = [] }) => {
  // Ensure data is an array and transform it for the chart
  const chartData = Array.isArray(data) ? data.map((item, index) => ({
    name: item.topic || `Topic ${index + 1}`,
    intensity: item.intensity || 0
  })) : [];

  if (chartData.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">Intensity Radial Bar</h3>
        <p className="text-center text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">Intensity Radial Bar</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadialBarChart
          innerRadius="20%"
          outerRadius="90%"
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8bc34a" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <RadialBar
            minAngle={15}
            background
            clockWise={true}
            dataKey="intensity"
            stroke="url(#gradientColor)"
          >
            <Label
              value="{value}"
              position="inside"
              fill="#fff"
              fontSize="16"
              fontWeight="bold"
            />
          </RadialBar>
          <Tooltip
            contentStyle={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              fontSize: '14px'
            }}
            labelStyle={{ color: '#333' }}
            itemStyle={{ color: '#333' }}
          />
          <Legend
            wrapperStyle={{ top: 0, left: 0, fontSize: '14px', color: '#333' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IntensityRadialBarChart;
