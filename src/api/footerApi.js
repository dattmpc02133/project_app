import axiosClient from './axiosClient';

const footerApi = {
    // start client
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

    //end footer category

    //start admin
    createContent: (data) => {
        const url = '/footer-content';
        return axiosClient.post(url, data);
    },

    updateContent: (data, id) => {
        const url = `/footer-content/${id}`;
        return axiosClient.put(url, data);
    },

    deleteContent: (id) => {
        const url = `/footer-content/${id}`;
        return axiosClient.delete(url);
    },

    getAllContent: (param) => {
        const url = '/client/footer-content/load-all';
        return axiosClient.get(url, param);
    },

    getAllContentFoo: (params) => {
        if (params) {
            const url = `/footer-content/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/footer-content';
            return axiosClient.get(url);
        }
    },

    getAllFooter: (params) => {
        if (params) {
            const url = `/footer-category/${params}`;
            return axiosClient.get(url);
        } else {
            const url = '/footer-category';
            return axiosClient.get(url);
        }
    },

    //end

    getById: (id) => {
        const url = `/footer-category/${id}`;
        return axiosClient.get(url);
    },

    getIdContent: (id) => {
        const url = `/footer-content/${id}`;
        return axiosClient.get(url);
    },

    // contact
    createContact: (data) => {
        const url = '/contact';
        return axiosClient.post(url, data);
    },

    updateContacts: (data, id) => {
        const url = `/contact/${id}`;
        return axiosClient.put(url, data);
    },

    deleteContact: (id) => {
        const url = `/contact/${id}`;
        return axiosClient.delete(url);
    },

    getAllContact: (params) => {
        const url = '/contact';
        return axiosClient.get(url, { params });
    },
    getIdContact: (id) => {
        const url = `/contact/${id}`;
        return axiosClient.get(url);
    },

    getIdContent: (id) => {
        const url = `/footer-content/${id}`;
        return axiosClient.get(url);
    },

    getIdContentClient: (id) => {
        const url = `client/load-footer-content/${id}`;
        return axiosClient.get(url);
    },

    // contact
    createContact: (data) => {
        const url = '/contact';
        return axiosClient.post(url, data);
    },

    updateContact: (data, id) => {
        const url = `/contact/${id}`;
        return axiosClient.put(url, data);
    },

    deleteContact: (id) => {
        const url = `/contact/${id}`;
        return axiosClient.delete(url);
    },

    getAllContact: (params) => {
        const url = '/contact';
        return axiosClient.get(url, { params });
    },
    getIdContact: (id) => {
        const url = `/contact/${id}`;
        return axiosClient.get(url);
    },

    getIdContent: (id) => {
        const url = `/footer-content/${id}`;
        return axiosClient.get(url);
    },
};

export default footerApi;
