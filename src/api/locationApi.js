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
};

export default location;
