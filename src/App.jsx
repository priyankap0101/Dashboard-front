// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import SaveProfile from './components/SaveProfile';
import UpdateProfile from './components/UpdateProfile';
import Register from './components/Register';
import Login from './components/Login';
import SearchProfile from './components/SearchProfile';
import CRM from './components/CRM'; // Correctly import CRM

// Placeholder components for other routes
const ECommerce = () => <div>E-commerce Content</div>;
const Logistics = () => <div>Logistics Content</div>;
const Academy = () => <div>Academy Content</div>;

const App = () => {
    return (
        <Router>
            <div className="flex">
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/crm/*" element={<CRM />} /> {/* Updated path */}
                        <Route path="/ecommerce" element={<ECommerce />} />
                        <Route path="/logistics" element={<Logistics />} />
                        <Route path="/academy" element={<Academy />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/saveprofile" element={<SaveProfile />} />
                        <Route path="/updateprofile" element={<UpdateProfile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/searchprofile/:query" element={<SearchProfile />} />
                        {/* Default route */}
                        <Route path="*" element={<div>Select an option from the sidebar</div>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
