import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Import Sidebar component
import Header from './Header'; // Import Header component

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/profile/register', {
                firstName,
                lastName,
                email,
                phone,
                address,
                city,
                state,
                zip,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header /> {/* Include the Header component here */}
            <div className="flex flex-1">
                <Sidebar /> {/* Include the Sidebar component here */}
                <div className="flex-1 p-6">
                    <h2 className="mb-6 text-3xl font-bold">Register</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Phone:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Address:</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">State:</label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Zip Code:</label>
                            <input
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
