import axiosClient from './axiosClient';

// api/productApi.js
const proImportSlip = {
    getAll: (params) => {
        const url = '/client/subcategories';
        return axiosClient.get(url, { params });
    },
    getProductSlip: (params) => {
        if (params) {
            const url = `/productImportSlip/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/productImportSlip';
            return axiosClient.get(url);
        }
    },

    getById: (params) => {
        const url = '/product_import_slip_details';
        return axiosClient.get(url, params);
    },

    create: (data) => {
        const url = '/productImportSlip';
        return axiosClient.post(url, data);
    },
};

export default proImportSlip;
