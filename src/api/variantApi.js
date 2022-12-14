import axiosClient from './axiosClient';

// api/productApi.js
const variantApi = {
    getAll: (params) => {
        const url = '/product_variants/';
        return axiosClient.get(url, { params });
    },
    getAllClient: () => {
        const url = '/client/product_variants/';
        return axiosClient.get(url);
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default variantApi;
