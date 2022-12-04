import axiosClient from './axiosClient';

const categoriesApi = {
    create: (data) => {
        const url = '/admin/categories';
        return axiosClient.post(url, data);
    },

    createdSubs: (data) => {
        const url = '/admin/subcategories';
        return axiosClient.post(url, data);
    },

    getAll: (params) => {
        const url = '/admin/categories';
        return axiosClient.get(url, params);
    },
};

export default categoriesApi;
