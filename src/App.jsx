import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Analytics from './components/Analytics'; // Import the Analytics component
import Profile from './components/Profile';

// Placeholder components for other routes
const CRM = () => <div>CRM Content</div>;
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
                        <Route path="/analytics" element={<Analytics />} /> {/* Ensure correct path */}
                        <Route path="/crm" element={<CRM />} />
                        <Route path="/ecommerce" element={<ECommerce />} />
                        <Route path="/logistics" element={<Logistics />} />
                        <Route path="/academy" element={<Academy />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
