import aixosClient from './axiosClient';

const footerApi = {
    create: (data) => {
        const url = 'client/footer-category/load-all';
        return aixosClient.get(url, { data });
    },

    getAll: (params) => {
        const url = 'client/footer-category/load-all';
        return aixosClient.get(url, { params });
    },
};
export default footerApi;
