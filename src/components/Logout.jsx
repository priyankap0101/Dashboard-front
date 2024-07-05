import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        alert('Logging out');
        // Implement actual logout logic here
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
