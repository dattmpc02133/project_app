import axiosClient from './axiosClient';
const searchApi = {
    searchItem: (keywords) => {
        const url = `/client_products_search?keywords=${keywords}`;
        return axiosClient.get(url);
    },
};

export default searchApi;
