import axiosClient from './axiosClient';

const categoriesApi = {
    create: (data) => {
        const url = '/admin/categories';
        return axiosClient.post(url, data);
    },

    getAll: (params) => {
        const url = '/admin/categories_products';
        return axiosClient.get(url, params);
    },

    getByIdCate: (id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.get(url);
    },

    getByIdCategories: (id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.get(url);
    },

    deleteCateProduct: (id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.delete(url);
    },

    editCateProduct: (data, id) => {
        const url = `/admin/subcategories/${id}`;
        return axiosClient.patch(url, data);
    },
};

export default categoriesApi;
