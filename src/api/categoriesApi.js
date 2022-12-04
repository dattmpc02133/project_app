import axiosClient from './axiosClient';

const categoriesApi = {
    create: (data) => {
        const url = '/admin/categories';
        return axiosClient.post(url, data);
    },
};

export default categoriesApi;
