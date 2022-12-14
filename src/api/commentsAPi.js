import axiosClient from './axiosClient';
const commentsApi = {
    create: (data) => {
        const url = `/comments`;
        return axiosClient.post(url, data);
    },
    getAllComments: (params) => {
        const url = '/commentsAll';
        return axiosClient.get(url, { params });
    },
    getAll: (params) => {
        const url = '/productsHaveComment';
        return axiosClient.get(url, { params });
    },
    getCommentById: (id) => {
        const url = `/replycommentByCommentID/${id}`;
        return axiosClient.get(url);
    },
    update: (data, id) => {
        const url = `/comments/${id}`;
        return axiosClient.put(url, data);
    },
    delete: (id) => {
        const url = `/comments/${id}`;
        return axiosClient.delete(url);
    },
    deleteRepcomment: (id) => {
        const url = `/deleteRepcomment/${id}`;
        return axiosClient.delete(url);
    },
};
export default commentsApi;
