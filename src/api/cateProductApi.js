import axiosClient from './axiosClient';

// api/productApi.js
const cateProductApi = {
    create: (data) => {
        const url = '/admin/postcategories';
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        const url = '/client/categories';
        return axiosClient.get(url, { params });
    },
};

export default cateProductApi;
