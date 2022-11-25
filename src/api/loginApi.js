import axiosClient from './axiosClient';

// api/productApi.js
const loginApi = {
    login: (data) => {
        const url = '/auth/login';
        return axiosClient.post(url, data);
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

export default loginApi;
