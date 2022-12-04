import axiosClient from './axiosClient';

// api/productApi.js
const cartApi = {
    addCart: (data) => {
        const url = '/carts/add';
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        const url = '/carts/view';
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

export default cartApi;
