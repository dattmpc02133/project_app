import axiosClient from './axiosClient';

// api/productApi.js
const wareHouseApi = {
    getAll: (params) => {
        const url = '/warehouses';
        return axiosClient.get(url, { params });
    },
    create: (data) => {
        const url = '/warehouses';
        return axiosClient.post(url, data);
    },
    update: (data, id) => {
        const url = `/warehouses/${id}`;
        return axiosClient.put(url, data);
    },
    getByID: (id) => {
        const url = `/warehouses/${id}`;
        return axiosClient.get(url);
    },
    delete: (id) => {
        const url = `/warehouses/${id}`;
        return axiosClient.delete(url);
    },
};

export default wareHouseApi;
