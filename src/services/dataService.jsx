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
        console.error('Error fetching data:', error);
        throw error;
    }
};

export { getData };
