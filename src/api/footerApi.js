import aixosClient from './axiosClient';

const footerApi = {
    getAll: (params) => {
        const url = '/footer-category';
        return aixosClient.get(url, { params });
    },

    getAllContent: (param) => {
        const url = 'client/footer-content/load-all';
        return aixosClient.get(url, { param });
    },
};

export default footerApi;
