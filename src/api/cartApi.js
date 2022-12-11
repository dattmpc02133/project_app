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
    getOrders: (params) => {
        if (params) {
            const url = `client/getOrders${params}`;
            return axiosClient.get(url);
        } else {
            const url = `client/getOrders`;
            return axiosClient.get(url);
        }
    },
    getAllOrders: (params) => {
        if (params) {
            const url = `/orders${params}`;
            return axiosClient.get(url);
        } else {
            const url = `/orders`;
            return axiosClient.get(url);
        }
    },
    getOrdersId(id) {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },
    getStatusOrder() {
        const url = `/order-status`;
        return axiosClient.get(url);
    },
    updateStatus(id, data) {
        const url = `/orders/${id}`;
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

export default cartApi;
