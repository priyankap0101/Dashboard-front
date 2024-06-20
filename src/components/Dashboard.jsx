import React, { useState, useEffect } from 'react';
import { getData } from '../services/dataService';
import FilterComponent from './FilterComponent';
import IntensityChart from './IntensityChart';
import LikelihoodChart from './LikelihoodChart';
import RelevanceChart from './RelevanceChart';

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
        <div>
            <h1>Data Visualization Dashboard</h1>
            <FilterComponent setFilters={setFilters} />
            <IntensityChart data={data} />
            <LikelihoodChart data={data} />
            <RelevanceChart data={data} />
        </div>
    );
};

export default Dashboard;
