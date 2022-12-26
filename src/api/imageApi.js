import axiosClient from './axiosClient';
const imageApi = {
    create: (data) => {
        const url = `/files`;
        return axiosClient.post(url, data);
    },
    deleteImg: (data) => {
        const url = `/delete-many-files`;
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        if (params) {
            const url = `/files${params}`;
            return axiosClient.get(url);
        } else {
            const url = `/files`;
            return axiosClient.get(url);
        }
    },
};
export default imageApi;
