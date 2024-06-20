import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RelevanceChart = ({ data }) => {
    return (
        <div className="chart-container">
            <h3>Relevance</h3>
            <BarChart
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
                <Bar dataKey="relevance" fill="#ffc658" />
            </BarChart>
        </div>
    );
};

export default RelevanceChart;
