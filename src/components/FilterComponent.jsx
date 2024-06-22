import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

const FilterComponent = ({ setFilters, darkMode, topics, sectors, years }) => {
    const [selectedTopics, setSelectedTopics] = React.useState([]);
    const [selectedSectors, setSelectedSectors] = React.useState([]);
    const [selectedYears, setSelectedYears] = React.useState([]);

    const handleFilterChange = () => {
        setFilters({
            topics: selectedTopics.map(topic => topic.value),
            sectors: selectedSectors.map(sector => sector.value),
            endYear: selectedYears.length ? selectedYears[0].value : null,
        });
    };

    // Handle clearing all filters
    const clearFilters = () => {
        setSelectedTopics([]);
        setSelectedSectors([]);
        setSelectedYears([]);
        setFilters({});
    };

    React.useEffect(() => {
        handleFilterChange();
    }, [selectedTopics, selectedSectors, selectedYears]);

    return (
        <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="mb-4 text-xl font-semibold">Filters</h2>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Topics</label>
                <MultiSelect
                    options={topics.map(topic => ({ label: topic, value: topic }))}
                    value={selectedTopics}
                    onChange={setSelectedTopics}
                    labelledBy="Select Topics"
                    overrideStrings={{ selectSomeItems: 'Select Topics' }} // Custom placeholder
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Sectors</label>
                <MultiSelect
                    options={sectors.map(sector => ({ label: sector, value: sector }))}
                    value={selectedSectors}
                    onChange={setSelectedSectors}
                    labelledBy="Select Sectors"
                    overrideStrings={{ selectSomeItems: 'Select Sectors' }} // Custom placeholder
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Years</label>
                <MultiSelect
                    options={years.map(year => ({ label: year, value: year }))}
                    value={selectedYears}
                    onChange={setSelectedYears}
                    labelledBy="Select Years"
                    overrideStrings={{ selectSomeItems: 'Select Years' }} // Custom placeholder
                />
            </div>
            <div className="flex justify-between">
                <button
                    className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={handleFilterChange}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
