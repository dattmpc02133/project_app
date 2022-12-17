import axiosClient from './axiosClient';

const LogoApi = {
    getAll: (params) => {
        const url = '/logo/';
        return axiosClient.get(url, { params });
    },

    getById: (id) => {
        const url = `/logo/${id}`;
        return axiosClient.get(url);
    },

    editLogo: (data, id) => {
        const url = `/logo/${id}`;
        return axiosClient.put(url, data);
    },
};
export default LogoApi;