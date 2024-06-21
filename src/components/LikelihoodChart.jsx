// LikelihoodChart.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const LikelihoodChart = ({ data }) => {
    // Function to transform data into required format for pie chart
    const transformData = () => {
        // Assuming 'data' contains fields like 'likelihood' with values like 'Low', 'Medium', 'High'
        const likelihoodCounts = data.reduce((acc, curr) => {
            const likelihood = curr.likelihood;
            if (acc[likelihood]) {
                acc[likelihood]++;
            } else {
                acc[likelihood] = 1;
            }
            return acc;
        }, {});

        // Transform into an array of objects with name and value properties
        const transformedData = Object.keys(likelihoodCounts).map((likelihood) => ({
            name: likelihood,
            value: likelihoodCounts[likelihood],
        }));

        return transformedData;
    };

    // Get transformed data for the pie chart
    const likelihoodData = transformData();

    // Colors for the pie chart slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Add more colors as needed

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Likelihood Chart</h2>
            <PieChart width={400} height={300}>
                <Pie
                    dataKey="value"
                    data={likelihoodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {likelihoodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default LikelihoodChart;
