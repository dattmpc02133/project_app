import axiosClient from './axiosClient';

// api/productApi.js
const slideShowApi = {
    getAll: (data) => {
        const url = `/slideshowclient`;
        return axiosClient.get(url, { data });
    },
    getFile: (id) => {
        const url = `/files`;
        return axiosClient.get(url);
    },
};

export default slideShowApi;
