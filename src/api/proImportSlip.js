import axiosClient from './axiosClient';

// api/productApi.js
const proImportSlip = {
    getAll: (params) => {
        const url = '/client/subcategories';
        return axiosClient.get(url, { params });
    },
    getProductSlip: (params) => {
        const url = '/productsinfoimport';
        return axiosClient.get(url, { params });
    },

    create: (data) => {
        const url = '/productImportSlip';
        return axiosClient.post(url, data);
    },

    getAllProductSlip: (params) => {
        if (params) {
            const url = `/productImportSlip/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/productImportSlip';
            return axiosClient.get(url);
        }
    },

    getAllProductSlipDetails: (params) => {
        const url = '/product_import_slip_details';
        return axiosClient.get(url, params);
    },

    getByIdProductSlip: (id) => {
        const url = `/productImportSlip/${id}`;
        return axiosClient.get(url);
    },
};

export default proImportSlip;
