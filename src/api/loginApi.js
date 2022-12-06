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
    getUser: () => {
        const url = '/client/userData';
        return axiosClient.get(url);
    },
    logout: () => {
        const url = '/logout';
        return axiosClient.post(url);
    },
    updateUser: (data) => {
        const url = '/client/updateUserData';
        return axiosClient.put(url, data);
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
