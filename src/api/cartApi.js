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
    delete: (idpro, idVar, idColor) => {
        const url = `carts/delete-detail/${idpro}/${idVar}/${idColor}`;
        return axiosClient.delete(url);
    },
    update: (data) => {
        const url = '/carts/update';
        return axiosClient.put(url, data);
    },
    payCOD: (data) => {
        const url = '/orders';
        return axiosClient.post(url, data);
    },
    deleteAll: () => {
        const url = 'carts/delete-cart';
        return axiosClient.delete(url);
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
