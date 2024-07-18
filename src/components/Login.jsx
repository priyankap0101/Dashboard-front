import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Login = ({ darkMode }) => {
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value,
        });
    };

    const loginUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const loggedInUser = await response.json();
            console.log('Login successful:', loggedInUser);
            setSuccess(true);
            navigate('/dashboard');  // Redirect to dashboard or any other page after login
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message);
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <Header darkMode={darkMode} />
            <div className="flex">
                <Sidebar darkMode={darkMode} />
                <main className="flex-grow p-8">
                    <h2 className="mb-6 text-2xl font-bold">Login</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            loginUser();
                        }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={loginDetails.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={loginDetails.password}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>
                    {success && <p className="mt-4 text-green-600">Login successful!</p>}
                    {error && <p className="mt-4 text-red-600">Error: {error}</p>}
                </main>
            </div>
        </div>
    );
};

export default Login;
