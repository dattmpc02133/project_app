import axiosClient from './axiosClient';

// api/productApi.js
const productsBySubCateApi = {
    getBySubCate: (id) => {
        const url = `/productsBySubcate/${id}`;
        return axiosClient.get(url);
    },
};

export default productsBySubCateApi;
