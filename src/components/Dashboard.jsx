import React, { useState, useEffect } from 'react';
import { getData } from '../services/dataService';
import FilterComponent from './FilterComponent';
import IntensityChart from './IntensityChart';
import LikelihoodChart from './LikelihoodChart';
import RelevanceChart from './RelevanceChart';
import YearlyTrendsChart from './YearlyTrendsChart';


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData(filters);
            setData(result);
        };

        fetchData();
    }, [filters]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Data Visualization Dashboard</h1>
            <div className="mb-8">
                <FilterComponent setFilters={setFilters} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                <IntensityChart data={data} />
                <LikelihoodChart data={data} />
                <RelevanceChart data={data} />
                <YearlyTrendsChart data={data} />
              
            </div>
        </div>
    );
};

export default Dashboard;
