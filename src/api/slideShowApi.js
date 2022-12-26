import axiosClient from './axiosClient';

// api/productApi.js
const slideShowApi = {
    getAll: (data) => {
        const url = `/slideshowclient`;
        return axiosClient.get(url, { data });
    },
    getById: (id) => {
        const url = `/clients/slideshow/${id}`;
        return axiosClient.get(url);
    },
    getFile: (id) => {
        const url = `/files`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `/slideshow`;
        return axiosClient.post(url, data);
    },
    getSlideCate: (id) => {
        const url = `/showSlideBycate?category_id=${id}`;
        return axiosClient.get(url);
    },
    getSlideAd: (data) => {
        const url = `/listSlideShowByCate`;
        return axiosClient.get(url, { data });
    },
    getSlideAdMain: (data) => {
        const url = `/listSlideshowMain`;
        return axiosClient.get(url, { data });
    },
    update: (data) => {
        const url = `/updateSlideMain`;
        return axiosClient.post(url, data);
    },
    delete: (id) => {
        const url = `/slideshow/${id}`;
        return axiosClient.delete(url);
    },
    deleteDetails: (id) => {
        const url = `/deleteSlideDetails/${id}`;
        return axiosClient.delete(url);
    },
    updateSub: (data) => {
        const url = `/active_slide_cate`;
        return axiosClient.post(url, data);
    },
};
export default slideShowApi;
