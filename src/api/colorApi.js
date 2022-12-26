import axiosClient from './axiosClient';

// api/productApi.js
const colorApi = {
    getAll: (params) => {
        if (params) {
            const url = `/colors/all${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/colors/all';
            return axiosClient.get(url);
        }
    },
    getAllClient: () => {
        const url = 'allColor';
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = '/colors/create';
        return axiosClient.post(url, data);
    },
    delete: (id) => {
        const url = `/colors/${id}`;
        return axiosClient.delete(url);
    },
    update: (data, id) => {
        const url = `/colors/${id}`;
        return axiosClient.patch(url, data);
    },
    getById: (id) => {
        const url = `/colors/${id}`;
        return axiosClient.get(url);
    },
    // get: (id) => {
    //     const url = `/products/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default colorApi;
