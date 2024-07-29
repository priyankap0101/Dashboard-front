import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchProfile = () => {
    const { query } = useParams();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/profile/search?query=${query}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfiles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, [query]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Search Results</h1>
            {profiles.length > 0 ? (
                <ul>
                    {profiles.map(profile => (
                        <li key={profile.id}>{profile.name}</li>
                    ))}
                </ul>
            ) : (
                <div>No profiles found</div>
            )}
        </div>
    );
};

export default SearchProfile;
