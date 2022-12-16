import axiosClient from './axiosClient';

// api/productApi.js
const proImportSlip = {
    getAll: (params) => {
        const url = '/slideshowclient';
        return axiosClient.get(url, { params });
    },
};

export default proImportSlip;
