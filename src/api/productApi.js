import axiosClient from './axiosClient';

// api/productApi.js
const productApi = {
    getAll: (params) => {
        const url = '/client/products';
        return axiosClient.get(url, { params });
    },
    getAllAddmin: (params) => {
        if (params) {
            const url = `/products${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/products';
            return axiosClient.get(url);
        }
    },
    getHomeAll: (params) => {
        const url = '/client/getallproductbysubcategories';
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `/client/products/${id}`;
        return axiosClient.get(url);
    },
    getProductByCate: (id) => {
        const url = `/client/products/category/${id}`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/products`;
        return axiosClient.post(url, data);
    },
    update: (data, id) => {
        const url = `/products/update/${id}`;
        return axiosClient.patch(url, data);
    },
    delete: (id) => {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default productApi;
