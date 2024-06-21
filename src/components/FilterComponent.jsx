import React from 'react';

const FilterComponent = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    // Update filters based on user input
    // Example: setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm mb-1">End Year</label>
          <input
            type="text"
            name="endYear"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Topics</label>
          <select
            name="topics"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            onChange={handleFilterChange}
          >
            <option value="">Select Topic</option>
            {/* Populate options dynamically */}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-1">Sector</label>
          <select
            name="sector"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
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
