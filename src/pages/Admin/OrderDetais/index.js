import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import storeApi from '~/api/storeApi';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import cartApi from '~/api/cartApi';
import wareHouseApi from '~/api/wareHouseApi';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';

const ListStore = () => {
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);
    const [orders, setOrders] = useState(false);
    const [statusList, setStatusList] = useState();
    const [statusId, setStatusId] = useState(false);
    const [listWareHouse, setListWareHouse] = useState();
    const [WareHouseId, setWareHouseId] = useState();

    const params = useParams();

    useEffect(() => {
        const getOrdersDetails = async () => {
            setLoading(true);
            try {
                const resultOrder = await cartApi.getOrdersId(params.id);
                setOrders(resultOrder.data);
                setWareHouseId(resultOrder.data.warehouse_id);
                const resultStatus = await cartApi.getStatusOrder(params.code);
                setStatusList(resultStatus.data);
                setStatusId(resultOrder.data.status);
                const resultWareHouse = await wareHouseApi.getClient();
                // console.log('resultWareHouse', resultWareHouse);
                setListWareHouse(resultWareHouse.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get orders', error);
                setLoading(false);
            }
        };
        getOrdersDetails();
    }, []);

    const handleUpdateStatus = (id) => {
        setStatusId(id);
        const data = {
            phone: orders.phone,
            email: orders.email,
            status: id,
            address: orders.address,
            ward_id: orders.ward_id,
            district_id: orders.district_id,
            province_id: orders.province_id,
            payment_method_id: orders.payment_method_id,
            shipping_method_id: orders.shipping_method_id,
        };

        const updateStatus = async () => {
            setLoading(true);
            try {
                const result = await cartApi.updateStatus(params.id, data);
                console.log(result);
                setModal(true);
                setMessStatus(result.message);
                setStatusHandle(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to update status', error);
                setLoading(false);
                // setModal(true);
                // setMessStatus(result.status);
                // setStatusHandle(false);
            }
        };

        if (id != 10 && id != 11) {
            updateStatus();
        }
    };

    // console.log('statusList', statusList);

    const handleCheckOrders = () => {
        const data = {
            warehouse_id: WareHouseId,
        };

        const approveOrders = async (code, data) => {
            setLoading(true);
            try {
                const result = await cartApi.approveOrders(code, data);
                console.log(result);
                setModal(true);
                setMessStatus(result.message);
                setStatusHandle(true);
                setLoading(false);
            } catch (error) {
                console.log('Fail to update approveOrders', error);
                setLoading(false);
            }
        };

        if (WareHouseId) {
            approveOrders(params.code, data);
        }
    };

    console.log('orders', orders);

    return (
        <div className="wrapper">
            {/* {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}*/}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Chi tiết đơn hàng</h2>
                <p className="content__heading--subtitle">Đơn hàng</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="oreder__block">
                        <div className="oreder__heading">
                            <h2>Thông tin đơn hàng</h2>
                        </div>
                        <div className="oreder__content">
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Mã đơn hàng: </p>
                                <p className="oreder__item--content">{orders?.code}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Tên khách hàng: </p>
                                <p className="oreder__item--content">{orders?.user_name}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Số điện thoại: </p>
                                <p className="oreder__item--content">{orders?.phone}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Phương thức thanh toán: </p>
                                <p className="oreder__item--content">{orders?.payment_method_name}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Ngày đặt hàng: </p>
                                <p className="oreder__item--content">{orders?.created_at}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Cách thức vận chuyển: </p>
                                <p className="oreder__item--content">{orders?.shipping_method}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Địa chỉ: </p>
                                <p className="oreder__item--content">
                                    {orders?.province}, {orders?.district}, {orders?.ward}, {orders?.address}
                                </p>
                            </div>

                            <div className="oreder__item">
                                <p className="oreder__item--title">- Số lượng sản phẩm: </p>
                                <p className="oreder__item--content">{orders?.details?.length} sản phẩm</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Phí giao hàng: </p>
                                <p className="oreder__item--content">{orders?.fee_ship_formatted}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Giảm giá: </p>
                                <p className="oreder__item--content">{orders?.discount_formatted}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Tổng giá trị: </p>
                                <p className="oreder__item--content">{orders?.total_formatted}</p>
                            </div>
                            <div className="oreder__item">
                                <p className="oreder__item--title">- Trạng thái đơn hàng: </p>
                                <div className="oreder__item--ctrl--block">
                                    <select
                                        className="oreder__item--ctrl"
                                        onChange={(e) => handleUpdateStatus(e.target.value)}
                                        value={statusId}
                                        disabled={statusList == 16 || statusList == 15 || statusList == 14}
                                    >
                                        {Array.isArray(statusList) &&
                                            statusList.map((item, index) => (
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>

                                    <div style={{ display: 'flex' }}>
                                        <select
                                            className="oreder__item--ctrl"
                                            style={{ marginLeft: '20px' }}
                                            onChange={(e) => setWareHouseId(e.target.value)}
                                            value={WareHouseId}
                                            disabled={statusId > 11}
                                        >
                                            <option>--Chọn kho--</option>
                                            {Array.isArray(listWareHouse) &&
                                                listWareHouse.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {statusId == 10 ||
                                            (statusId == 11 && (
                                                <div
                                                    disabled={statusId > 11}
                                                    className="oreder__item--btn"
                                                    onClick={() => handleCheckOrders()}
                                                >
                                                    Duyệt đơn
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Màu sản phẩm</th>
                                    <th>Dung lượng</th>
                                    <th>Giá sản phẩm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.details?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div>
                                                <img className="img__tbl" src={item.product_image} />
                                            </div>
                                        </td>
                                        <td>{item.product_name}</td>
                                        <td>{item.color_name}</td>
                                        <td>{item.variant_name}GB</td>
                                        <td>
                                            {Number(item.price).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListStore;
