import axiosClient from './axiosClient';

// api/productApi.js
const storeApi = {
    getAll: (params) => {
        if (params) {
            const url = `/getStore${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/getStore';
            return axiosClient.get(url);
        }
    },
    create: (data) => {
        const url = '/admin/stores';
        return axiosClient.post(url, data);
    },
    delete: (id) => {
        const url = `/admin/stores/${id}`;
        return axiosClient.delete(url);
    },
    getById: (id) => {
        const url = `/admin/stores/${id}`;
        return axiosClient.get(url);
    },
};

export default storeApi;
