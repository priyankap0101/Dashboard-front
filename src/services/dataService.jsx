import axios from 'axios';

const getData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/data', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export { getData };
