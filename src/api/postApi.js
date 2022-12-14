import axiosClient from './axiosClient';

// api/productApi.js
const postsApi = {
    getAll: (params) => {
        if (params) {
            const url = `/posts${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/posts';
            return axiosClient.get(url);
        }
    },

    getAllClient: (params) => {
        if (params) {
            const url = `client/load-post${params}`;
            return axiosClient.get(url);
        } else {
            const url = 'client/load-post/';
            return axiosClient.get(url);
        }
    },

    get: (id) => {
        const url = `/posts/${id}`;
        return axiosClient.get(url);
    },

    getByClient: (id) => {
        const url = `client/load-post/${id}`;
        return axiosClient.get(url);
    },

    createPost: (data) => {
        const url = '/posts';
        return axiosClient.post(url, data);
    },

    editPost: (data, id) => {
        const url = `/posts/${id}`;
        return axiosClient.put(url, data);
    },

    deletePost: (id) => {
        const url = `/posts/${id}`;
        return axiosClient.delete(url);
    },

    getFirts: () => {
        const url = '/client/posts/get-firts-new-post';
        return axiosClient.get(url);
    },

    getTwoAfter: () => {
        const url = '/client/posts/get-two-post-after-new';
        return axiosClient.get(url);
    },

    getByFirtsSliderById: (id) => {
        const url = `client/subcategories/get-firts-new-post-by-cate/${id}`;
        return axiosClient.get(url);
    },

    getByTwoSliderById: (id) => {
        const url = `client/subcategories/get-two-post-after-new/${id}`;
        return axiosClient.get(url);
    },
};

export default postsApi;
