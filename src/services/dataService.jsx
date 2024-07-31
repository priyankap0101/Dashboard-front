import axios from 'axios';

// Your existing token
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || 'dashboardaccess';

// Existing functions for fetching data from APIs
const getData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/data', {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching main data:', error);
        throw error;
    }
};

const getAllCities = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/data/city', {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching city data:', error);
        throw error;
    }
};

const getAllSwots = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/data/swot', {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching SWOT data:', error);
        throw error;
    }
};

const getAllPestles = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/data/pestle', {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching PESTLE data:', error);
        throw error;
    }
};

// Dummy data functions for sales, orders, total profit, etc.
export const getSalesData = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    sales: [
                        { month: 'Jan', sales: 12000 },
                        { month: 'Feb', sales: 15000 },
                        { month: 'Mar', sales: 17000 },
                        { month: 'Apr', sales: 18000 },
                    ],
                });
            }, 1000); // Simulate network delay
        });
    } catch (error) {
        throw new Error('Error fetching sales data');
    }
};

export const getOrdersData = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    orders: [
                        { date: 'Jan', orders: 300 },
                        { date: 'Feb', orders: 350 },
                        { date: 'Mar', orders: 400 },
                        { date: 'Apr', orders: 450 },
                    ],
                });
            }, 1000); // Simulate network delay
        });
    } catch (error) {
        throw new Error('Error fetching orders data');
    }
};

export const getTotalProfitData = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    totalProfit: [
                        { month: 'Jan', profit: 5000 },
                        { month: 'Feb', profit: 6000 },
                        { month: 'Mar', profit: 7000 },
                        { month: 'Apr', profit: 7500 },
                    ],
                });
            }, 1000); // Simulate network delay
        });
    } catch (error) {
        throw new Error('Error fetching total profit data');
    }
};

export const getRevenueGrowthData = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    revenueGrowth: [
                        { month: 'Jan', revenue: 20000 },
                        { month: 'Feb', revenue: 22000 },
                        { month: 'Mar', revenue: 24000 },
                        { month: 'Apr', revenue: 26000 },
                    ],
                });
            }, 1000); // Simulate network delay
        });
    } catch (error) {
        throw new Error('Error fetching revenue growth data');
    }
};

export const getSalesByCountriesData = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    salesByCountries: [
                        { country: 'USA', sales: 50000 },
                        { country: 'Canada', sales: 30000 },
                        { country: 'UK', sales: 20000 },
                        { country: 'Germany', sales: 15000 },
                    ],
                });
            }, 1000); // Simulate network delay
        });
    } catch (error) {
        throw new Error('Error fetching sales by countries data');
    }
};

// Updated dummy data function with unique project names
export const getProjectStatusData = async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    projectStatus: [
                        { project: 'Alpha Initiative', status: 70 },
                        { project: 'Beta Expansion', status: 85 },
                        { project: 'Gamma Redesign', status: 50 },
                        { project: 'Delta Integration', status: 90 },
                        { project: 'Epsilon Research', status: 60 },
                    ],
                });
            }, 1000); // Simulate network delay
        });
    } catch (error) {
        throw new Error('Error fetching project status data');
    }
};

// Export the functions
export { getData, getAllCities, getAllSwots, getAllPestles };
