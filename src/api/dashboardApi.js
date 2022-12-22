import axiosClient from './axiosClient';

const dashboardApi = {
    // start client
    get: (data) => {
        const url = '/admin_statis/statistical';
        return axiosClient.get(url, data);
    },


};

export default dashboardApi;
