import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register required components with ChartJS
ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const LikelihoodChart = ({ data, darkMode }) => {
    // Transform data
    const transformData = () => {
        const likelihoodCounts = data.reduce((acc, curr) => {
            const likelihood = curr.likelihood;
            if (acc[likelihood]) {
                acc[likelihood]++;
            } else {
                acc[likelihood] = 1;
            }
            return acc;
        }, {});

        return Object.keys(likelihoodCounts).map((likelihood) => ({
            label: likelihood,
            value: likelihoodCounts[likelihood],
        }));
    };

    const likelihoodData = transformData();

    const chartData = {
        labels: likelihoodData.map(item => item.label),
        datasets: [
            {
                label: 'Likelihood Distribution',
                data: likelihoodData.map(item => item.value),
                borderColor: darkMode ? '#9ACD32' : '#1F77B4',
                backgroundColor: darkMode ? 'rgba(154, 205, 50, 0.2)' : 'rgba(31, 119, 180, 0.2)',
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: darkMode ? '#9ACD32' : '#1F77B4',
                pointBorderColor: darkMode ? '#333' : '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
                backgroundColor: darkMode ? '#555' : '#333',
                titleColor: darkMode ? '#fff' : '#fff',
                bodyColor: darkMode ? '#fff' : '#fff',
                borderColor: darkMode ? '#888' : '#666',
                borderWidth: 1,
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: darkMode ? '#ddd' : '#333',
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                    color: darkMode ? '#444' : '#ddd',
                },
                ticks: {
                    color: darkMode ? '#ddd' : '#333',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: darkMode ? '#444' : '#ddd',
                },
                ticks: {
                    color: darkMode ? '#ddd' : '#333',
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <h2 className={`mb-4 text-3xl font-bold text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Likelihood Distribution</h2>
            <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default LikelihoodChart;
