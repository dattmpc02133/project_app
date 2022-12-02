import axiosClient from './axiosClient';

// api/productApi.js
const colorApi = {
    getAll: (params) => {
        const url = '/colors/all';
        return axiosClient.get(url, { params });
    },
    create: (data) => {
        const url = '/colors/create';
        return axiosClient.post(url, data);
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default colorApi;
