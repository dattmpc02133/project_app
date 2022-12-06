import axiosClient from './axiosClient';

const categoriesApi = {
    create: (data) => {
        const url = '/admin/categories';
        return axiosClient.post(url, data);
    },

    getAll: (params) => {
        const url = '/admin/categories';
        return axiosClient.get(url, params);
    },

    getByIdCate: (id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.get(url);
    },
};

export default categoriesApi;
