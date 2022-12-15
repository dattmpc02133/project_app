import axiosClient from './axiosClient';

// api/productApi.js
const location = {
    getAllProvince: (params) => {
        const url = '/location/getAllProvince';
        return axiosClient.get(url, { params });
    },
    getAllDistricts: (params) => {
        const url = '/location/getAllDistrict';
        return axiosClient.get(url, { params });
    },
    getAllWard: (params) => {
        const url = '/location/getAllWard';
        return axiosClient.get(url, { params });
    },
    getByIdVariant: (product_id, variant_id) => {
        const url = `/client/productsfindbylocation?product_id=${product_id}&variant_id=${variant_id}`;
        return axiosClient.get(url);
    },
    getProvinceStore: (params) => {
        const url = 'allStoreID';
        return axiosClient.get(url, { params });
    },
};

export default location;
