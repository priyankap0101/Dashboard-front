import axios from 'axios';

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || 'dashboardaccess';

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

export { getData, getAllCities, getAllSwots, getAllPestles };
