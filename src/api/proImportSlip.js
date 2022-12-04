import axiosClient from './axiosClient';

// api/productApi.js
const proImportSlip = {
    getAll: (params) => {
        const url = '/client/subcategories';
        return axiosClient.get(url, { params });
    },
    getProductSlip: (params) => {
        const url = '/productsinfoimport';
        return axiosClient.get(url, { params });
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default proImportSlip;
