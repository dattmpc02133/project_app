import axiosClient from './axiosClient';

const catePostApi = {
    create: (data) => {
        const url = '/admin/categories_post';
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        const url = `/admin/categories_post`;
        return axiosClient.get(url, { params });
    },
    // subs
    createdSubs: (data) => {
        const url = '/admin/subcategories';
        return axiosClient.post(url, data);
    },

    getAllSubs: (params) => {
        const url = '/admin/subcategories';
        return axiosClient.get(url, params);
    },

    deleteSubs: (id) => {
        const url = `/admin/subcategories/${id}`;
        return axiosClient.delete(url);
    },

    editSubs: (data, id) => {
        const url = `/admin/subcategories/${id}`;
        return axiosClient.patch(url, data);
    },

    getByIdSubs: (id) => {
        const url = `/admin/subcategories/${id}`;
        return axiosClient.get(url);
    },
    //end
    updateCatePost: (data, id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.patch(url, data);
    },

    getByIdCate: (id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.get(url);
    },

    deleteCatePost: (id) => {
        const url = `/admin/categories/${id}`;
        return axiosClient.delete(url);
    },
};

export default catePostApi;
