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
    // login: (data) => {
    //     const url = '/posts';
    //     return axiosClient.post(url, data);
    // },
    // getAll: (params) => {
    //     const url = '/user';
    //     return axiosClient.get(url, { params });
    // },
    // getCatePostId: (id) => {
    //     const url = `/post-categories/${id}`;
    //     return axiosClient.get(url);
    // },
};

export default catePostApi;
