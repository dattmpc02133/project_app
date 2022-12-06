import axiosClient from './axiosClient';
const commentsApi = {
    create: (data) => {
        const url = `/comments`;
        return axiosClient.post(url, data);
    },
};
export default commentsApi;
