import axiosClient from './axiosClient';

// api/productApi.js
const cartApi = {
    addCart: (data) => {
        const url = '/carts/add';
        return axiosClient.post(url, data);
    },
    getAll: (params) => {
        const url = '/carts/view';
        return axiosClient.get(url, { params });
    },
    delete: (idpro, idVar, idColor) => {
        const url = `carts/delete-detail/${idpro}/${idVar}/${idColor}`;
        return axiosClient.delete(url);
    },
    update: (data) => {
        const url = '/carts/update';
        return axiosClient.put(url, data);
    },
    payCOD: (data) => {
        const url = '/create-order';
        return axiosClient.post(url, data);
    },
    // payCOD: (data) => {
    //     const url = '/orders';
    //     return axiosClient.post(url, data);
    // },
    payVNPay: (data) => {
        const url = '/orders';
        return axiosClient.post(url, data);
    },
    deleteAll: () => {
        const url = 'carts/delete-cart';
        return axiosClient.delete(url);
    },
    getOrders: (params) => {
        if (params) {
            const url = `client/getOrders${params}`;
            return axiosClient.get(url);
        } else {
            const url = `client/getOrders`;
            return axiosClient.get(url);
        }
    },
    getAllOrders: (params) => {
        if (params) {
            const url = `/orders${params}`;
            return axiosClient.get(url);
        } else {
            const url = `/orders`;
            return axiosClient.get(url);
        }
    },
    getOrdersId(id) {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },
    getOrdersCode(code) {
        const url = `/client/getOrders?code=${code}`;
        return axiosClient.get(url);
    },
    getStatusOrder(id) {
        const url = `/get-order-status-process/${id}`;
        return axiosClient.get(url);
    },
    updateStatus(id, data) {
        const url = `/orders/${id}`;
        return axiosClient.put(url, data);
    },

    approveOrders(id, data) {
        const url = `/orders/approve-order/${id}`;
        return axiosClient.post(url, data);
    },

    vnPay(amount) {
        // const url = `vnpay/create?amount=${amount}&returnUrl=http://localhost:3000/paycucess`;
        const url = `vnpay/create?amount=${amount}&returnUrl=${process.env.REACT_APP_DOMAIN_URL}/paycucess`;
        return axiosClient.post(url);
    },
    returnDataVnPay(data) {
        const url = `/vnpay/returnData?${data}`;
        return axiosClient.get(url);
    },

    // login: (data) => {
    //     const url = '/posts';
    //     return axiosClient.post(url, data);
    // },
    // getAll: (params) => {
    //     const url = '/user';
    //     return axiosClient.get(url, { params });
    // },
};

export default cartApi;
