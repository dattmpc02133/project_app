import axiosClient from './axiosClient';

// api/productApi.js
const slideShowApi = {
    getAll: (data) => {
        const url = `/slideshowclient`;
        return axiosClient.get(url, { data });
    },
    getById: (id) => {
        const url = `/clients/slideshow/${id}`;
        return axiosClient.get(url);
    },
    getFile: (id) => {
        const url = `/files`;
        return axiosClient.get(url);
    },
    create: (params) => {
        const url = `/slideshow`;
        return axiosClient.post(url, { params });
    },
};

export default slideShowApi;
