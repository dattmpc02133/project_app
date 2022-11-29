import axiosClient from './axiosClient';

// api/productApi.js
const colorApi = {
    getAll: (params) => {
        const url = '/colors/all';
        return axiosClient.get(url, { params });
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default colorApi;
