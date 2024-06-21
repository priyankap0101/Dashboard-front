import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const YearlyTrendsChart = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-center text-xl font-semibold mb-4">Yearly Trends</h3>
            <AreaChart
                width={400}
                height={400}
                data={data}
                className="mx-auto"
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="intensity" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    );
};

export default YearlyTrendsChart;
