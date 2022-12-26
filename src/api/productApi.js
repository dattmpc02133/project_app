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
    // product variant
    createVariant: (data) => {
        const url = `/product_variants`;
        return axiosClient.post(url, data);
    },
    getVariants: (data) => {
        const url = `/client/product_variants`;
        return axiosClient.get(url, data);
    },
    deleteVariants: (id) => {
        const url = `/product_variants/${id}`;
        return axiosClient.delete(url);
    },
    getByIdVariant: (id) => {
        const url = `/product_variants/${id}`;
        return axiosClient.get(url);
    },
    updateVariants: (data, id) => {
        const url = `/product_variants/${id}`;
        return axiosClient.patch(url, data);
    },
};

export default productApi;
