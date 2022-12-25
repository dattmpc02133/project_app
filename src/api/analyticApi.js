import axiosClient from './axiosClient';

// api/productApi.js
const analyticApi = {
    getRevenue: () => {
        const url = '/admin_statis/revenue';
        return axiosClient.get(url);
    },
    getOrder: () => {
        const url = '/admin_statis/order';
        return axiosClient.get(url);
    },

    getProductPL: () => {
        const url = '/admin_statis/popular-product';
        return axiosClient.get(url);
    },
    getRevenueDay: () => {
        const url = '/admin_statis/revenue-day';
        return axiosClient.get(url);
    },
    getTotalOrder: () => {
        const url = '/admin_statis/total-order';
        return axiosClient.get(url);
    },
};

export default analyticApi;
