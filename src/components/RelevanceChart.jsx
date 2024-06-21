import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RelevanceChart = ({ data = [] }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-6 text-2xl font-semibold text-center">Relevance</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="topic" tick={{ fill: '#8884d8' }} />
          <YAxis tick={{ fill: '#8884d8' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#8884d8', borderRadius: '10px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value, name) => [`${value}`, `${name.charAt(0).toUpperCase() + name.slice(1)}`]}
          />
          <Legend wrapperStyle={{ color: '#8884d8' }} />
          <Bar dataKey="relevance" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RelevanceChart;
