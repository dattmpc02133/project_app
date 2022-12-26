import axiosClient from './axiosClient';

const roleApi = {
    getAll: (params) => {
        const url = '/get-roles-by-lvl';
        return axiosClient.get(url);
    },
};

export default roleApi;
