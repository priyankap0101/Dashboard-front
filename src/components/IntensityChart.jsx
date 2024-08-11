import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList, Brush, ReferenceLine
} from 'recharts';
import { PDFDownloadLink, Page, Text, View, Document } from '@react-pdf/renderer';
import { FaDownload, FaChartLine, FaChartBar, FaFilter, FaExpand, FaCompress } from 'react-icons/fa';

// Sample data
const sampleData = [
  { topic: 'Topic 1', intensity: 4 },
  { topic: 'Topic 2', intensity: 7 },
  { topic: 'Topic 3', intensity: 6 },
  { topic: 'Topic 4', intensity: 8 },
  { topic: 'Topic 5', intensity: 5 },
  { topic: 'Topic 6', intensity: 9 },
  { topic: 'Topic 7', intensity: 6 },
];

const IntensityGraphChart = ({ data = sampleData }) => {
  const [showAll, setShowAll] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [filter, setFilter] = useState('all');

  const initialDataCount = 5;
  const filteredData = filter === 'all' ? data : data.filter(d => d.intensity > 5);
  const displayedData = showAll ? filteredData : filteredData.slice(0, initialDataCount);

  const chartData = Array.isArray(displayedData) ? displayedData.map((item, index) => ({
    name: item.topic || `Topic ${index + 1}`,
    intensity: item.intensity || 0
  })) : [];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#555', fontSize: '12px' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Topics', position: 'bottom', fill: '#555', fontSize: '14px' }}
            />
            <YAxis
              tick={{ fill: '#555', fontSize: '12px' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Intensity', angle: -90, position: 'left', fill: '#555', fontSize: '14px' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', fontSize: '12px' }}
              labelStyle={{ color: '#555', fontSize: '12px' }}
              itemStyle={{ color: '#555', fontSize: '12px' }}
              formatter={(value) => [`Intensity: ${value}`, '']}
            />
            <Legend wrapperStyle={{ bottom: 0, left: 0 }} align="left" verticalAlign="bottom" />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={{ stroke: '#4a90e2', strokeWidth: 1, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: '#4a90e2', strokeWidth: 2 }}
              isAnimationActive={true}
            >
              <LabelList dataKey="intensity" position="top" fontSize={10} />
            </Line>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4a90e2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Brush dataKey="name" height={20} stroke="#8884d8" />
            <ReferenceLine y={10} label="Threshold" stroke="red" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#555', fontSize: '12px' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Topics', position: 'bottom', fill: '#555', fontSize: '14px' }}
            />
            <YAxis
              tick={{ fill: '#555', fontSize: '12px' }}
              axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
              tickLine={{ stroke: '#ddd' }}
              label={{ value: 'Intensity', angle: -90, position: 'left', fill: '#555', fontSize: '14px' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', fontSize: '12px' }}
              labelStyle={{ color: '#555', fontSize: '12px' }}
              itemStyle={{ color: '#555', fontSize: '12px' }}
              formatter={(value) => [`Intensity: ${value}`, '']}
            />
            <Legend wrapperStyle={{ bottom: 0, left: 0 }} align="left" verticalAlign="bottom" />
            <Bar
              dataKey="intensity"
              fill="url(#barGradient)"
              barSize={20}
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            >
              <LabelList dataKey="intensity" position="top" fontSize={10} />
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4a90e2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Brush dataKey="name" height={20} stroke="#8884d8" />
            <ReferenceLine y={10} label="Threshold" stroke="red" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg">
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 text-sm font-semibold transition-transform duration-300 ease-in-out bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-4 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400"
        >
          {showAll ? <FaCompress className="inline-block mr-1" /> : <FaExpand className="inline-block mr-1" />}
          {showAll ? 'Show Less Insights' : 'Show More Insights'}
        </button>
        <button
          onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}
          className="px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-in-out bg-gray-700 rounded-lg shadow-md hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <FaChartLine className={`inline-block mr-1 ${chartType === 'line' ? 'opacity-50' : ''}`} />
          <FaChartBar className={`inline-block mr-1 ${chartType === 'bar' ? 'opacity-50' : ''}`} />
          {chartType === 'line' ? 'Switch to Bar Chart' : 'Switch to Line Chart'}
        </button>
        <button
          onClick={() => setFilter(filter === 'all' ? 'high' : 'all')}
          className="px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-in-out bg-gray-700 rounded-lg shadow-md hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <FaFilter className="inline-block mr-1" />
          {filter === 'all' ? 'Filter High Intensity' : 'Show All'}
        </button>
        <PDFDownloadLink
          document={
            <Document>
              <Page size="A4" style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, marginBottom: 12 }}>Intensity Graph Report</Text>
                {filteredData.map((item, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text>{`Topic: ${item.topic}`}</Text>
                    <Text>{`Intensity: ${item.intensity}`}</Text>
                  </View>
                ))}
              </Page>
            </Document>
          }
          fileName="intensity-report.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Generating PDF...' : (
              <button
                className="px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-in-out bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-500 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400"
              >
                <FaDownload className="inline-block mr-1" />
                Download Report
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
      <div className="h-96">
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IntensityGraphChart;
