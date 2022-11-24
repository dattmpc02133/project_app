import axiosClient from './axiosClient';

// api/productApi.js
const catePostApi = {
    create: (data) => {
        const url = '/admin/v1/postcategories';
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        const url = '/admin/v1/postcategories';
        return axiosClient.get(url, { params });
    },
    // login: (data) => {
    //     const url = '/posts';
    //     return axiosClient.post(url, data);
    // },
    // getAll: (params) => {
    //     const url = '/user';
    //     return axiosClient.get(url, { params });
    // },
};

export default catePostApi;
