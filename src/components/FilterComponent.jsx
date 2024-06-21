import React from 'react';

const FilterComponent = ({ setFilters, darkMode }) => {
    const handleFilterChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value }));
    };

    return (
        <div className={`p-4 rounded-lg shadow-md mb-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h3 className="mb-2 text-lg font-semibold">Filters</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">End Year</label>
                    <input
                        type="text"
                        name="endYear"
                        className={`w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md px-3 py-2`}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Topics</label>
                    <select
                        name="topics"
                        className={`w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md px-3 py-2`}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Topic</option>
                        {/* Populate options dynamically */}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Sector</label>
                    <select
                        name="sector"
                        className={`w-full border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md px-3 py-2`}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Sector</option>
                        {/* Populate options dynamically */}
                    </select>
                </div>
                {/* Add more filters as needed */}
            </div>
        </div>
    );
};

export default FilterComponent;
