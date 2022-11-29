import axiosClient from './axiosClient';

// api/productApi.js
const productApi = {
    getAll: (params) => {
        const url = '/client/products';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/client/products/${id}`;
        return axiosClient.get(url);
    },
    getProductByCate: (id) => {
        const url = `/client/products/category/${id}`;
        return axiosClient.get(url);
    },
};

export default productApi;
