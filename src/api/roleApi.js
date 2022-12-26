import axiosClient from './axiosClient';

const roleApi = {
    getAll: () => {
        const url = '/get-roles-by-lvl';
        return axiosClient.get(url);
    },
};

export default roleApi;
