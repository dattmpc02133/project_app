import axiosClient from './axiosClient';

// api/productApi.js
const subCateProductApi = {
    getAll: (params) => {
        const url = '/client/subcategories';
        return axiosClient.get(url, { params });
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default subCateProductApi;
