import axiosClient from './axiosClient';

// api/productApi.js
const postsApi = {
    getAll: (params) => {
        const url = '/posts';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/posts/${id}`;
        return axiosClient.get(url);
    },
};

export default postsApi;
