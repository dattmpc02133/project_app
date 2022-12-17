import classNames from 'classnames/bind';
import style from '~/assets/scss/OrderCuccess.module.scss';
import { useParams } from 'react-router-dom';
import cartApi from '~/api/cartApi';
import Loading from '~/components/Loading';
import { CartContext } from '~/Context/CartContext';
import { useEffect, useState, useContext } from 'react';
const cx = classNames.bind(style);
const OrderCuccess = () => {
    const [orders, setOrders] = useState(false);

    const { loading, setLoading, deleteCart } = useContext(CartContext);

    useEffect(() => {
        const url = window.location.href;
        var index = url.indexOf('vnp_Amount');
        let returnDataUrl = '';
        if (index > 0) {
            returnDataUrl = url.slice(index);
        }

        if (returnDataUrl != null) {
            const cartInfo = JSON.parse(localStorage.getItem('cartInfo'));

            const returnData = async () => {
                try {
                    const result = await cartApi.returnDataVnPay(returnDataUrl);
                    const code = result.data.order_code;
                    console.log('result', result);

                    cartInfo.code = code;

                    const resultCreteOrders = await cartApi.payVNPay(cartInfo);
                    console.log('resultCreteOrders', resultCreteOrders);

                    const resultGetOrder = await cartApi.getOrdersCode(code);
                    console.log('resultGetOrder', resultGetOrder);
                    setOrders(resultGetOrder?.data[0]);
                    deleteCart();
                } catch (error) {
                    console.log('Failed to return data: ', error);
                }
            };

            returnData();
        }

        const getOrdersDetails = async () => {
            setLoading(true);
            try {
                const resultOrder = await cartApi.getOrdersId(57);
                console.log(resultOrder);
                setOrders(resultOrder.data);
                setLoading(false);
            } catch (error) {
                console.log('Fail to get orders: ', error);
                setLoading(false);
            }
        };
        getOrdersDetails();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('order__wrapper', 'grid', 'wide')}>
                <div className={cx('order__block')}>
                    <div className={cx('oreder__heading')}>
                        <h2>Thông tin đơn hàng</h2>
                    </div>
                    <div className={cx('oreder__content')}>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Mã đơn hàng: </p>
                            <p className="oreder__item--content">{orders?.code}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Tên khách hàng: </p>
                            <p className="oreder__item--content">{orders?.user_name}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Số điện thoại: </p>
                            <p className="oreder__item--content">{orders?.phone}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Phương thức thanh toán: </p>
                            <p className="oreder__item--content">{orders?.payment_method_name}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Ngày đặt hàng: </p>
                            <p className="oreder__item--content">{orders?.created_at}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Cách thức vận chuyển: </p>
                            <p className="oreder__item--content">{orders?.shipping_method}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Địa chỉ: </p>
                            <p className="oreder__item--content">
                                {orders?.province}, {orders?.district}, {orders?.ward}, {orders?.address}
                            </p>
                        </div>

                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Số lượng sản phẩm: </p>
                            <p className="oreder__item--content">{orders?.details?.length} sản phẩm</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Phí giao hàng: </p>
                            <p className="oreder__item--content">{orders?.fee_ship_formatted}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Giảm giá: </p>
                            <p className="oreder__item--content">{orders?.discount_formatted}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Tổng giá trị: </p>
                            <p className="oreder__item--content">{orders?.total_formatted}</p>
                        </div>
                        <div className={cx('oreder__item')}>
                            <p className={cx('oreder__item--title')}>- Trạng thái đơn hàng: </p>
                            <p className="oreder__item--content">{orders?.status_name}</p>
                        </div>
                    </div>
                </div>

                <div className={cx('table__block')}>
                    <table className={cx('table')}>
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
                                            <img className={cx('img__tbl')} src={item.product_image} />
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
    );
};

export default OrderCuccess;
