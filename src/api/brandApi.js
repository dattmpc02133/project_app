import axiosClient from './axiosClient';

// api/productApi.js
const brandApi = {
    getAll: (params) => {
        const url = '/admin/v1/brands';
        return axiosClient.get(url, { params });
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default brandApi;
