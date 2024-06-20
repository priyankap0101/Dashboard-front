import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LikelihoodChart = ({ data }) => {
    return (
        <AreaChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="likelihood" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
    );
};

export default LikelihoodChart;
