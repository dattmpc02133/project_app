import axiosClient from './axiosClient';

const footerApi = {
    create: (data) => {
        const url = '/footer-category';
        return axiosClient.post(url, data);
    },

    update: (data, id) => {
        const url = `/footer-category/${id}`;
        return axiosClient.put(url, data);
    },

    delete: (id) => {
        const url = `/footer-category/${id}`;
        return axiosClient.delete(url);
    },

    getAll: (params) => {
        const url = 'client/footer-category/load-all';
        return axiosClient.get(url, { params });
    },

    getAllContent: (param) => {
        const url = 'client/footer-content/load-all';
        return axiosClient.get(url, param);
    },
    getById: (id) => {
        const url = `/footer-category/${id}`;
        return axiosClient.get(url);
    },

    getAllContact: (params) => {
        const url = '/client/footer-category/categories_contact';
        return axiosClient.get(url, params);
    },

    getByIdContent: (id) => {
        const url = `/footer-category/${id}`;
        return axiosClient.get(url);
    },

    createContent: (datas) => {
        const url = '/client/footer-content/load-all';
        return axiosClient.post(url, datas);
    },
};

export default footerApi;
