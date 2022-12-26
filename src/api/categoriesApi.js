import axiosClient from './axiosClient';

const categoriesApi = {
    create: (data) => {
        const url = '/admin/categories';
        return axiosClient.post(url, data);
    },

    getAll: (params) => {
        if (params) {
            const url = `/admin/categories_products${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/admin/categories_products';
            return axiosClient.get(url);
        }
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

    getAllSubsProduct: (params) => {
        if (params) {
            const url = `/admin/subcategoriesProducts${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/admin/subcategoriesProducts';
            return axiosClient.get(url);
        }
    },
};

export default categoriesApi;
