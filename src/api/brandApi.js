import axiosClient from './axiosClient';

// api/productApi.js
const brandApi = {
    getAll: (params) => {
        const url = '/admin/v1/brands';
        return axiosClient.get(url, { params });
    },
    create: (data) => {
        const url = `/brands`;
        return axiosClient.post(url, data);
    },
};

export default brandApi;
