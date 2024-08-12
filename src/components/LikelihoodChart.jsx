import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaChartLine, FaChartBar, FaDownload } from 'react-icons/fa';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LikelihoodChart = ({ data, darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState('line');

  const initialDataCount = 5;

  const transformData = () => {
    const likelihoodCounts = data.reduce((acc, curr) => {
      const likelihood = curr.likelihood;
      acc[likelihood] = acc[likelihood] ? acc[likelihood] + 1 : 1;
      return acc;
    }, {});

    return Object.keys(likelihoodCounts).map((likelihood) => ({
      label: likelihood,
      value: likelihoodCounts[likelihood],
    }));
  };

  const likelihoodData = transformData();
  const displayedData = showAll ? likelihoodData : likelihoodData.slice(0, initialDataCount);

  const chartData = {
    labels: displayedData.map(item => item.label),
    datasets: [
      {
        label: 'Likelihood Distribution',
        data: displayedData.map(item => item.value),
        borderColor: darkMode ? '#6EE7B7' : '#4B5563',
        backgroundColor: darkMode ? 'rgba(110, 231, 183, 0.2)' : 'rgba(75, 85, 99, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: darkMode ? '#6EE7B7' : '#4B5563',
        pointBorderColor: darkMode ? '#333' : '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        hoverBackgroundColor: darkMode ? '#34D399' : '#6366F1',
        hoverBorderColor: darkMode ? '#34D399' : '#6366F1',
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
        backgroundColor: darkMode ? '#1F2937' : '#F9FAFB',
        titleColor: darkMode ? '#E5E7EB' : '#1F2937',
        bodyColor: darkMode ? '#E5E7EB' : '#1F2937',
        borderColor: darkMode ? '#6EE7B7' : '#4B5563',
        borderWidth: 1,
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: darkMode ? '#D1D5DB' : '#374151',
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
          color: darkMode ? '#374151' : '#E5E7EB',
        },
        ticks: {
          color: darkMode ? '#D1D5DB' : '#374151',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB',
        },
        ticks: {
          color: darkMode ? '#D1D5DB' : '#374151',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  const renderChart = () => {
    return chartType === 'line' ? <Line data={chartData} options={options} /> : <Bar data={chartData} options={options} />;
  };

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector('.chart-container');
    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'chart.jpg';
        link.click();
      });
    }
  };

  const downloadChartAsPDF = () => {
    const chartElement = document.querySelector('.chart-container');
    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('chart.pdf');
      });
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-500 ease-in-out`}>
      <div className="flex mb-4 space-x-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-2 py-1 text-xs font-semibold rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105
            ${showAll ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400'}
            ${darkMode ? 'text-white' : 'text-white'}`}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
        <button
          onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
          className="px-2 py-1 text-xs font-semibold text-white transition-all duration-300 ease-in-out transform bg-gray-600 rounded-md shadow-sm hover:scale-105 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300"
        >
          {chartType === 'line' ? (
            <>
              <FaChartBar className="inline-block mr-1 text-sm" />
              Bar Chart
            </>
          ) : (
            <>
              <FaChartLine className="inline-block mr-1 text-sm" />
              Line Chart
            </>
          )}
        </button>
        <button
          onClick={downloadChartAsImage}
          className="px-2 py-1 text-xs font-semibold text-white transition-all duration-300 ease-in-out transform bg-blue-500 rounded-md shadow-sm hover:scale-105 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400"
        >
          <FaDownload className="inline-block mr-1 text-sm" />
          JPG
        </button>
        <button
          onClick={downloadChartAsPDF}
          className="px-2 py-1 text-xs font-semibold text-white transition-all duration-300 ease-in-out transform bg-green-500 rounded-md shadow-sm hover:scale-105 hover:bg-green-600 focus:ring-4 focus:ring-green-400"
        >
          <FaDownload className="inline-block mr-1 text-sm" />
          PDF
        </button>
      </div>
      <div className="chart-container" style={{ position: 'relative', height: '300px', width: '100%' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default LikelihoodChart;
