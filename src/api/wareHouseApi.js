import axiosClient from './axiosClient';

// api/productApi.js
const wareHouseApi = {
    getAll: (params) => {
        if (params) {
            const url = `/warehouses${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/warehouses';
            return axiosClient.get(url);
        }
    },
    getClient: () => {
        const url = '/getAllNoPaginate';
        return axiosClient.get(url);
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
    getProductStore: (params) => {
        const url = '/getproductByWarehouse';
        return axiosClient.get(url, { params });
    },
};

export default wareHouseApi;
