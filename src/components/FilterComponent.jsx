import React, { useState } from 'react';

const FilterComponent = ({ setFilters }) => {
    const [endYear, setEndYear] = useState('');
    const [topic, setTopic] = useState('');
    const [sector, setSector] = useState('');
    const [region, setRegion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters({ endYear, topic, sector, region });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                End Year:
                <input type="text" value={endYear} onChange={(e) => setEndYear(e.target.value)} />
            </label>
            <label>
                Topic:
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </label>
            <label>
                Sector:
                <input type="text" value={sector} onChange={(e) => setSector(e.target.value)} />
            </label>
            <label>
                Region:
                <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
            </label>
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default FilterComponent;
