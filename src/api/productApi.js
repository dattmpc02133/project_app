import axiosClient from './axiosClient';

// api/productApi.js
const productApi = {
    getAll: (params) => {
        const url = '/client/products';
        return axiosClient.get(url, { params });
    },
<<<<<<< HEAD
    getById: (id) => {
        const url = `/products/${id}`;
=======
    get: (id) => {
        const url = `/client/products/${id}`;
        return axiosClient.get(url);
    },
    getProductByCate: (id) => {
        const url = `/client/products/category/${id}`;
>>>>>>> a4210153efae64805b35bf47dc403c642cddbb5e
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/products`;
        return axiosClient.post(url, data);
    },
};

export default productApi;
