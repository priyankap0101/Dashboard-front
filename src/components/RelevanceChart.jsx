import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const RelevanceChart = ({ data = [] }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-center text-xl font-semibold mb-4">Relevance</h3>
      <LineChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" />
        <YAxis dataKey="relevance" />
        <Tooltip formatter={(value, name) => [`${value}`, `${name.charAt(0).toUpperCase() + name.slice(1)}`]} />
        <Legend />
        <Line type="monotone" dataKey="relevance" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default RelevanceChart;
