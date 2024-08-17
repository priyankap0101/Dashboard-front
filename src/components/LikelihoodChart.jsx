import React, { useState, useEffect } from 'react';
import { Doughnut, PolarArea, Bubble, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDotCircle, FaChartArea, FaSnowflake, FaDownload } from 'react-icons/fa';

ChartJS.register(ArcElement, PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const LikelihoodChart = ({ data, darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState('doughnut');

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
    labels: displayedData.map((item) => item.label),
    datasets: [
      {
        label: 'Likelihood Distribution',
        data: displayedData.map((item) => item.value),
        borderColor: darkMode ? '#60A5FA' : '#4B5563',
        backgroundColor: darkMode
          ? ['rgba(75, 85, 99, 0.8)', 'rgba(234, 88, 12, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(250, 204, 21, 0.8)', 'rgba(139, 92, 246, 0.8)']
          : ['rgba(75, 85, 99, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 205, 86, 0.6)', 'rgba(201, 203, 207, 0.6)'],
        borderWidth: 2,
        hoverBackgroundColor: darkMode ? '#60A5FA' : '#60A5FA',
        hoverBorderColor: darkMode ? '#60A5FA' : '#60A5FA',
        hoverBorderWidth: 3,
      },
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'Bubble Dataset',
        data: displayedData.map((item, index) => ({
          x: index,
          y: item.value,
          r: item.value * 2, // Radius proportional to the value
        })),
        backgroundColor: darkMode ? 'rgba(75, 85, 99, 0.8)' : 'rgba(75, 85, 99, 0.6)',
        borderColor: darkMode ? '#60A5FA' : '#4B5563',
        borderWidth: 2,
        hoverBackgroundColor: darkMode ? '#60A5FA' : '#60A5FA',
        hoverBorderColor: darkMode ? '#60A5FA' : '#60A5FA',
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
        titleColor: darkMode ? '#D1D5DB' : '#1F2937',
        bodyColor: darkMode ? '#D1D5DB' : '#1F2937',
        borderColor: darkMode ? '#4B5563' : '#4B5563',
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
    layout: {
      padding: 0,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Likelihood',
          color: darkMode ? '#D1D5DB' : '#374151',
          font: {
            size: 14,
            weight: 'bold',
          },
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
          display: false,
        },
        title: {
          display: true,
          text: 'Count',
          color: darkMode ? '#D1D5DB' : '#374151',
          font: {
            size: 14,
            weight: 'bold',
          },
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
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
    animation: {
      duration: 1000,
    },
    backgroundColor: 'transparent',
  };

  useEffect(() => {
    const canvasElements = document.querySelectorAll('canvas');
    canvasElements.forEach((canvas) => {
      canvas.style.backgroundColor = 'transparent';
    });
  }, [darkMode, chartType]);

  const renderChart = () => {
    switch (chartType) {
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      case 'polarArea':
        return <PolarArea data={chartData} options={options} />;
      case 'bubble':
        return <Bubble data={bubbleData} options={options} />;
      case 'scatter':
        return <Scatter data={chartData} options={options} />;
      default:
        return <Doughnut data={chartData} options={options} />;
    }
  };

  const downloadChartAsImage = () => {
    const chartElement = document.querySelector('.chart-container');
    if (chartElement) {
      html2canvas(chartElement).then((canvas) => {
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
      html2canvas(chartElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
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
    <div className={`p-6 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg`}>
      <div className="flex flex-wrap mb-4 space-x-2">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform
            ${showAll ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'}`}
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
        <button
          onClick={() => setChartType('doughnut')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform
            ${chartType === 'doughnut' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'}`}
        >
          Doughnut <FaDotCircle className="inline-block ml-1" />
        </button>
        <button
          onClick={() => setChartType('polarArea')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform
            ${chartType === 'polarArea' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'}`}
        >
          Polar Area <FaChartArea className="inline-block ml-1" />
        </button>
        <button
          onClick={() => setChartType('bubble')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform
            ${chartType === 'bubble' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'}`}
        >
          Bubble <FaSnowflake className="inline-block ml-1" />
        </button>
        <button
          onClick={() => setChartType('scatter')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform
            ${chartType === 'scatter' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'}`}
        >
          Scatter <FaSnowflake className="inline-block ml-1" />
        </button>
        <button
          onClick={downloadChartAsImage}
          className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out transform bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 hover:scale-105"
        >
          Download as Image <FaDownload className="inline-block ml-1" />
        </button>
        <button
          onClick={downloadChartAsPDF}
          className="px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out transform bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 hover:scale-105"
        >
          Download as PDF <FaDownload className="inline-block ml-1" />
        </button>
      </div>
      <div className="chart-container" style={{ position: 'relative', height: '400px' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default LikelihoodChart;
