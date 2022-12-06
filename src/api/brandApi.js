import axiosClient from './axiosClient';

// api/productApi.js
const brandApi = {
    getAll: (params) => {
        const url = '/admin/brands';
        return axiosClient.get(url, { params });
    },
    create: (data) => {
        const url = `/admin/brands`;
        return axiosClient.post(url, data);
    },

    update: (data, id) => {
        const url = `/admin/brands/${id}`;
        return axiosClient.patch(url, data);
    },

    delete: (id) => {
        const url = `/admin/brands/${id}`;
        return axiosClient.delete(url);
    },

    getById: (id) => {
        const url = `/admin/brands/${id}`;
        return axiosClient.get(url);
    },
};

export default brandApi;
