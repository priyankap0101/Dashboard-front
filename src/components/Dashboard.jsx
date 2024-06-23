import React, { useState, useEffect } from 'react';
import { getData } from '../services/dataService';
import FilterComponent from './FilterComponent';
import IntensityChart from './IntensityChart';
import LikelihoodChart from './LikelihoodChart';
import RelevanceChart from './RelevanceChart';
import YearlyTrendsChart from './YearlyTrendsChart';
import { FaSun, FaMoon } from 'react-icons/fa';
import { BiExport } from 'react-icons/bi';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [topics, setTopics] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [years, setYears] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeChart, setActiveChart] = useState('intensity');
    const [showExportMenu, setShowExportMenu] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getData();
                setData(result);
                setFilteredData(result);
                extractFilterOptions(result);
                setDefaultFilters(result);
            } catch (error) {
                toast.error('Error fetching data');
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const setDefaultFilters = (data) => {
        const defaultTopic = [...new Set(data.map(item => item.topic))][0];
        const defaultSector = [...new Set(data.map(item => item.sector))][0];
        const defaultYear = [...new Set(data.map(item => item.year))][0];

        setFilters({
            topics: [defaultTopic],
            sectors: [defaultSector],
            endYear: [defaultYear.toString()],
        });
    };

    useEffect(() => {
        const applyFilters = () => {
            let filteredResult = data;

            if (filters.endYear && filters.endYear.length > 0) {
                filteredResult = filteredResult.filter(item => filters.endYear.includes(item.year.toString()));
            }
            if (filters.topics && filters.topics.length > 0) {
                filteredResult = filteredResult.filter(item => filters.topics.includes(item.topic));
            }
            if (filters.sectors && filters.sectors.length > 0) {
                filteredResult = filteredResult.filter(item => filters.sectors.includes(item.sector));
            }

            setFilteredData(filteredResult);
        };

        applyFilters();
    }, [data, filters]);

    const extractFilterOptions = (data) => {
        const uniqueTopics = [...new Set(data.map(item => item.topic))];
        const uniqueSectors = [...new Set(data.map(item => item.sector))];
        const uniqueYears = [...new Set(data.map(item => item.year))];

        setTopics(uniqueTopics);
        setSectors(uniqueSectors);
        setYears(uniqueYears);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);
    };

    const handleExport = (format) => {
        switch (format) {
            case 'csv':
                exportToCSV(filteredData, 'data_export.csv');
                break;
            case 'pdf':
                exportToPDF(filteredData, 'data_export.pdf');
                break;
            case 'zip':
                const zip = new JSZip();
                zip.file('data_export.csv', exportToCSV(filteredData, null, true));
                zip.file('data_export.pdf', exportToPDF(filteredData, null, true));
                zip.generateAsync({ type: 'blob' }).then(content => {
                    saveAs(content, 'data_export.zip');
                });
                break;
            default:
                toast.error('Invalid export format');
        }
        setShowExportMenu(false);
    };

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
    }, []);

    const renderChart = () => {
        switch (activeChart) {
            case 'intensity':
                return <IntensityChart data={filteredData} />;
            case 'likelihood':
                return <LikelihoodChart data={filteredData} />;
            case 'relevance':
                return <RelevanceChart data={filteredData} />;
            case 'trends':
                return <YearlyTrendsChart data={filteredData} />;
            default:
                return <IntensityChart data={filteredData} />;
        }
    };

    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen transition-colors duration-300`}>
            <div className="container p-6 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Data Visualization Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={toggleDarkMode} 
                            className="text-2xl focus:outline-none" 
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                        <div className="relative">
                            <button 
                                onClick={() => setShowExportMenu(!showExportMenu)} 
                                className="text-2xl focus:outline-none" 
                                aria-label="Export Data"
                            >
                                <BiExport />
                            </button>
                            {showExportMenu && (
                                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                                    <button onClick={() => handleExport('csv')} className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Export as CSV</button>
                                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-8 lg:grid-cols-3">
                    <div className="p-4 bg-blue-100 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-semibold">Total Records</h2>
                        <p className="mt-2 text-2xl">{filteredData.length}</p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-semibold">Unique Topics</h2>
                        <p className="mt-2 text-2xl">{topics.length}</p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow-md dark:bg-gray-800">
                        <h2 className="text-xl font-semibold">Unique Sectors</h2>
                        <p className="mt-2 text-2xl">{sectors.length}</p>
                    </div>
                </div>
                <FilterComponent 
                    setFilters={setFilters} 
                    darkMode={darkMode} 
                    topics={topics} 
                    sectors={sectors} 
                    years={years} 
                    defaultFilters={filters}
                />
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <ClipLoader color={darkMode ? '#ffffff' : '#000000'} loading={loading} size={50} />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center mb-4 space-x-4">
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'intensity' ? 'bg-blue-500 text-white' : 'bg-gray-300'} transition-colors duration-300`}
                                onClick={() => setActiveChart('intensity')}
                            >
                                Intensity
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'likelihood' ? 'bg-blue-500 text-white' : 'bg-gray-300'} transition-colors duration-300`}
                                onClick={() => setActiveChart('likelihood')}
                            >
                                Likelihood
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'relevance' ? 'bg-blue-500 text-white' : 'bg-gray-300'} transition-colors duration-300`}
                                onClick={() => setActiveChart('relevance')}
                            >
                                Relevance
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'trends' ? 'bg-blue-500 text-white' : 'bg-gray-300'} transition-colors duration-300`}
                                onClick={() => setActiveChart('trends')}
                            >
                                Trends
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-8">
                            {renderChart()}
                        </div>
                    </>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Dashboard;
