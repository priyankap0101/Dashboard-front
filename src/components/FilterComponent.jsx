import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';

const FilterComponent = ({ setFilters, darkMode, topics, sectors, years, defaultFilters }) => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);

    useEffect(() => {
        if (defaultFilters.topics && defaultFilters.topics.length > 0) {
            setSelectedTopics(defaultFilters.topics.map(topic => ({ label: topic, value: topic })));
        }
        if (defaultFilters.sectors && defaultFilters.sectors.length > 0) {
            setSelectedSectors(defaultFilters.sectors.map(sector => ({ label: sector, value: sector })));
        }
        if (defaultFilters.years && defaultFilters.years.length > 0) {
            setSelectedYears(defaultFilters.years.map(year => ({ label: year.toString(), value: year.toString() })));
        }
    }, [defaultFilters]);

    const handleApplyFilters = () => {
        const filters = {
            topics: selectedTopics.map(option => option.value),
            sectors: selectedSectors.map(option => option.value),
            years: selectedYears.map(option => parseInt(option.value)), // Convert back to numbers if needed
        };
        setFilters(filters);
    };

    const handleClearFilters = () => {
        setSelectedTopics([]);
        setSelectedSectors([]);
        setSelectedYears([]);
        setFilters({});
    };

    const formatOptions = (options) => {
        if (!options || !Array.isArray(options)) {
            return [];
        }
    
        return options.map(option => ({
            label: option ? option.toString() : '',
            value: option ? option.toString() : ''
        }));
    };

    return (
        <div className="p-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Filters</h2>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label className="block mb-2 text-sm font-medium">Topics</label>
                    <MultiSelect
                        options={formatOptions(topics)}
                        value={selectedTopics}
                        onChange={setSelectedTopics}
                        labelledBy="Select Topics"
                        className={darkMode ? 'dark-multi-select' : ''}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Sectors</label>
                    <MultiSelect
                        options={formatOptions(sectors)}
                        value={selectedSectors}
                        onChange={setSelectedSectors}
                        labelledBy="Select Sectors"
                        className={darkMode ? 'dark-multi-select' : ''}
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium">Years</label>
                    <MultiSelect
                        options={formatOptions(years)}
                        value={selectedYears}
                        onChange={setSelectedYears}
                        labelledBy="Select Years"
                        className={darkMode ? 'dark-multi-select' : ''}
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                    Clear Filters
                </button>
                <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
