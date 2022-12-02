import axiosClient from './axiosClient';

const warehouseStockApi = {
    getAllProvince: (Provide) => {
        const url = '/location/getAllProvince';
        return axiosClient.get(url);
    },
    getAllDistrict: (district) => {
        const url = '/location/getAllDistrict';
        return axiosClient.get(url);
    },
    getAllWard: (allWard) => {
        const url = '/location/getAllWard';
        return axiosClient.get(url);
    },
    getByIdVariant: (product_id, variant_id) => {
        const url = `/client/productsfindbylocation?product_id=${product_id}&variant_id=${variant_id}`;
        return axiosClient.get(url);
    },
};
export default warehouseStockApi;
