import React, { useState, useEffect } from 'react';
import { getData } from '../services/dataService';
import FilterComponent from './FilterComponent';
import IntensityChart from './IntensityChart';
import LikelihoodChart from './LikelihoodChart';
import RelevanceChart from './RelevanceChart';
import YearlyTrendsChart from './YearlyTrendsChart';
import { FaSun, FaMoon } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getData(filters);
                setData(result);
                setFilteredData(result);
                extractFilterOptions(result);
            } catch (error) {
                toast.error('Error fetching data');
            }
            setLoading(false);
        };

        fetchData();
    }, [filters]);

    useEffect(() => {
        const applyFilters = () => {
            let filteredResult = data;

            if (filters.endYear) {
                filteredResult = filteredResult.filter(item => item.year === parseInt(filters.endYear));
            }
            if (filters.topics) {
                filteredResult = filteredResult.filter(item => item.topic === filters.topics);
            }
            if (filters.sector) {
                filteredResult = filteredResult.filter(item => item.sector === filters.sector);
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
    };

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
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
            <div className="container p-6 mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Data Visualization Dashboard</h1>
                    <button onClick={toggleDarkMode} className="text-2xl">
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
                <FilterComponent 
                    setFilters={setFilters} 
                    darkMode={darkMode} 
                    topics={topics} 
                    sectors={sectors} 
                    years={years} 
                />
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <ClipLoader color={darkMode ? '#ffffff' : '#000000'} loading={loading} size={50} />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center mb-4 space-x-4">
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'intensity' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setActiveChart('intensity')}
                            >
                                Intensity
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'likelihood' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setActiveChart('likelihood')}
                            >
                                Likelihood
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'relevance' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setActiveChart('relevance')}
                            >
                                Relevance
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeChart === 'trends' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
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
