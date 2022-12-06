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
};
export default commentsApi;
