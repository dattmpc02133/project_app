import axios from 'axios';
export default axios.create({
    baseUrl: 'http://localhost:3000/',
});
export const axiosClient = axios.create({
    baseUrl: 'http://localhost:3000/',
    headers: {
        'content-type': 'application/json',
    },
});
