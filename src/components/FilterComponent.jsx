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

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#000000' : darkMode ? '#e2e8f0' : '#000000',
            backgroundColor: state.isSelected ? darkMode ? '#2d3748' : '#edf2f7' : darkMode ? '#1a202c' : '#ffffff',
            '&:hover': {
                backgroundColor: darkMode ? '#2d3748' : '#f0f4f8',
                color: '#000000',
            },
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: darkMode ? '#1a202c' : '#ffffff',
            borderColor: darkMode ? '#2d3748' : '#ced4da',
            '&:hover': {
                borderColor: darkMode ? '#2d3748' : '#adb5bd',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: darkMode ? '#121a24' : '#000000',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: darkMode ? '#2d3748' : '#f0f4f8',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: darkMode ? '#121a24' : '#000000',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: darkMode ? '#121a24' : '#000000',
            '&:hover': {
                backgroundColor: darkMode ? '#718096' : '#ced4da',
                color: '#ffffff',
            },
        }),
    };

    return (
        <div className={`p-4 mb-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'}`}>
            <h2 className={`mb-4 text-xl font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-900'}`}>Filters</h2>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Topics</label>
                    <MultiSelect
                        options={formatOptions(topics)}
                        value={selectedTopics}
                        onChange={setSelectedTopics}
                        labelledBy="Select Topics"
                        className={`multi-select ${darkMode ? 'dark-multi-select' : ''}`}
                        styles={customStyles}
                    />
                </div>
                <div>
                    <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Sectors</label>
                    <MultiSelect
                        options={formatOptions(sectors)}
                        value={selectedSectors}
                        onChange={setSelectedSectors}
                        labelledBy="Select Sectors"
                        className={`multi-select ${darkMode ? 'dark-multi-select' : ''}`}
                        styles={customStyles}
                    />
                </div>
                <div>
                    <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Years</label>
                    <MultiSelect
                        options={formatOptions(years)}
                        value={selectedYears}
                        onChange={setSelectedYears}
                        labelledBy="Select Years"
                        className={`multi-select ${darkMode ? 'dark-multi-select' : ''}`}
                        styles={customStyles}
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    onClick={handleClearFilters}
                    className={`px-4 py-2 font-medium rounded ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-800' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                >
                    Clear Filters
                </button>
                <button
                    onClick={handleApplyFilters}
                    className={`px-4 py-2 font-medium rounded ${darkMode ? 'bg-blue-700 text-gray-200 hover:bg-blue-800' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
