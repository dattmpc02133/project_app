import axiosClient from './axiosClient';

const catePostApi = {
    create: (data) => {
        const url = '/admin/categories';
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        if (params) {
            const url = `/admin/categories_post/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/admin/categories_post';
            return axiosClient.get(url);
        }
    },

    getCatePost: (params) => {
        if (params) {
            const url = `/admin/categories_post/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/admin/categories_post';
            return axiosClient.get(url);
        }
    },
    // subs
    createdSubs: (data) => {
        const url = '/admin/subcategories';
        return axiosClient.post(url, data);
    },

    getAllSubs: (params) => {
        if (params) {
            const url = `/admin/subcategories/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/admin/subcategories';
            return axiosClient.get(url);
        }
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

    // lấy tin tức theo danh mục
    getByIdCatePost: (id) => {
        const url = `client/subcategories/loadPostByCate/${id}`;
        return axiosClient.get(url);
    },

    getAllSubsPost: (params) => {
        if (params) {
            const url = `/admin/subcategoriesIsPosts/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/admin/subcategoriesIsPosts';
            return axiosClient.get(url);
        }
    },
};

export default catePostApi;
