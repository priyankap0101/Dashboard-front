import React, { useState, useEffect } from 'react';
import { getData } from '../services/dataService';
import FilterComponent from './FilterComponent';
import IntensityChart from './IntensityChart';
import LikelihoodChart from './LikelihoodChart';
import RelevanceChart from './RelevanceChart';
import YearlyTrendsChart from './YearlyTrendsChart';
import { FaHome, FaChartLine, FaCog, FaSun, FaMoon } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [activeChart, setActiveChart] = useState('Intensity'); // State to track active chart

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getData(filters);
                setData(result);
                setFilteredData(result); // Initially set filtered data same as fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    useEffect(() => {
        const applyFilters = () => {
            let filteredResult = data;

            // Apply filters based on user selections
            if (filters.endYear) {
                filteredResult = filteredResult.filter(item => item.year === filters.endYear);
            }
            // Add more filter conditions as needed

            setFilteredData(filteredResult);
        };

        applyFilters();
    }, [data, filters]);

    const handleApplyFilters = () => {
        // Trigger data fetching and filtering based on selected filters
        fetchData();
    };

    const toggleDarkMode = () => {
        // Toggle dark mode
        setDarkMode(!darkMode);
    };

    const handleChartClick = (chart) => {
        setActiveChart(chart); // Set active chart based on user click
    };

    return (
        <div className={`flex flex-col md:flex-row h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Sidebar */}
            <aside className={`w-full md:w-64 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} border-r border-gray-300`}>
                <h2 className="mb-8 text-2xl font-bold">Dashboard</h2>
                <nav>
                    <ul>
                        <li
                            className={`mb-4 flex items-center cursor-pointer ${activeChart === 'Intensity' ? 'text-blue-500 font-bold' : ''}`}
                            onClick={() => handleChartClick('Intensity')}
                        >
                            <FaChartLine className="mr-2" />
                            Intensity
                        </li>
                        <li
                            className={`mb-4 flex items-center cursor-pointer ${activeChart === 'Likelihood' ? 'text-blue-500 font-bold' : ''}`}
                            onClick={() => handleChartClick('Likelihood')}
                        >
                            <FaChartLine className="mr-2" />
                            Likelihood
                        </li>
                        <li
                            className={`mb-4 flex items-center cursor-pointer ${activeChart === 'Relevance' ? 'text-blue-500 font-bold' : ''}`}
                            onClick={() => handleChartClick('Relevance')}
                        >
                            <FaChartLine className="mr-2" />
                            Relevance
                        </li>
                        <li
                            className={`mb-4 flex items-center cursor-pointer ${activeChart === 'YearlyTrends' ? 'text-blue-500 font-bold' : ''}`}
                            onClick={() => handleChartClick('YearlyTrends')}
                        >
                            <FaChartLine className="mr-2" />
                            Yearly Trends
                        </li>
                    </ul>
                </nav>
                <button
                    className={`mt-4 flex items-center justify-center w-full py-2 px-4 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'} font-bold`}
                    onClick={toggleDarkMode}
                >
                    {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </aside>

            {/* Main content area */}
            <main className="flex-1 p-6 overflow-y-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Data Visualization Dashboard</h1>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${darkMode ? 'text-gray-900' : 'text-white'}`}
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </header>

                {/* Filters */}
                <div className="mb-8">
                    <FilterComponent setFilters={setFilters} darkMode={darkMode} />
                    <div className="text-right">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${darkMode ? 'text-gray-900' : 'text-white'}`}
                            onClick={handleApplyFilters}
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* Charts */}
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <ClipLoader color={darkMode ? "#FFFFFF" : "#0000FF"} loading={loading} size={150} />
                    </div>
                ) : (
                    <div>
                        {activeChart === 'Intensity' && <IntensityChart data={filteredData} />}
                        {activeChart === 'Likelihood' && <LikelihoodChart data={filteredData} />}
                        {activeChart === 'Relevance' && <RelevanceChart data={filteredData} />}
                        {activeChart === 'YearlyTrends' && <YearlyTrendsChart data={filteredData} />}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
