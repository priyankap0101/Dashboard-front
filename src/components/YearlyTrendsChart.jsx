import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YearlyTrendsChart = ({ data }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-center text-gray-800">Yearly Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="intensity" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default YearlyTrendsChart;
