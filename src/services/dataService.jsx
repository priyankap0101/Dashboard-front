import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/data';

const getData = async (filters) => {
    const response = await axios.get(API_BASE_URL, { params: filters });
    return response.data;
};

export { getData };
