import axiosClient from './axiosClient';

// api/productApi.js
const subCateProductApi = {
    getAll: (params) => {
        const url = '/client/subcategories';
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/admin/subcategories/${id}`;
        return axiosClient.get(url);
    },
};

export default subCateProductApi;
