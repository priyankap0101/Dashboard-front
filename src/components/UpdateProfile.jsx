import React, { useState, useEffect } from 'react';

const UpdateProfile = () => {
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        email: '',
        // other fields
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Fetch the profile on component mount if needed
        // Example: fetchProfileById(1);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const updateProfile = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedProfile = await response.json();
            console.log('Profile updated successfully:', updatedProfile);
            setSuccess(true);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={profile.id}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Add more fields as needed */}
                <button type="submit">Update Profile</button>
            </form>
            {success && <p>Profile updated successfully!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default UpdateProfile;
