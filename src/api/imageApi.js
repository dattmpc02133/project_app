import axiosClient from './axiosClient';
const imageApi = {
    create: (data) => {
        const url = `/files`;
        return axiosClient.post(url, data);
    },
};
export default imageApi;
