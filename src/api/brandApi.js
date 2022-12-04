import axiosClient from './axiosClient';

// api/productApi.js
const brandApi = {
    getAll: (params) => {
        const url = '/admin/brands';
        return axiosClient.get(url, { params });
    },
    create: (data) => {
        const url = `/admin/brands`;
        return axiosClient.post(url, data);
    },
};

export default brandApi;
