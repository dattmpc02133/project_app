import axiosClient from './axiosClient';

const usersApi = {
    create: (data) => {
        const url = 'users';
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `users/${id}`;
        return axiosClient.post(url);
    },

    editUser: (id, data) => {
        const url = `users/${id}`;
        return axiosClient.put(url, data);
    },
};

export default usersApi;
