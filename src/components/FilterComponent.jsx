import React, { useState } from 'react';

const Filter = ({ applyFilters }) => {
  const [year, setYear] = useState('');
  const [region, setRegion] = useState('');

  const handleApplyFilters = () => {
    applyFilters({ year, region });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 mr-2 border rounded"
      />
      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="p-2 mr-2 border rounded"
      />
      <button
        onClick={handleApplyFilters}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
