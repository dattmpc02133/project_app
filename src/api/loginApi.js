import axiosClient from './axiosClient';

// api/productApi.js
const loginApi = {
    login: (data) => {
        const url = '/auth/login';
        return axiosClient.post(url, data);
    },
    callsms: (phone) => {
        const url = `auth/sms?phone=${phone}&action=login`;
        return axiosClient.get(url);
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
