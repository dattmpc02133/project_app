import axiosClient from './axiosClient';

// api/productApi.js
const productApi = {
    getAll: (params) => {
        const url = '/client/products';
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/products`;
        return axiosClient.post(url, data);
    },
};

export default productApi;
