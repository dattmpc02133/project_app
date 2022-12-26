import classNames from 'classnames/bind';
import style from '~/assets/scss/OrderCuccess.module.scss';
import { useParams } from 'react-router-dom';
import cartApi from '~/api/cartApi';
import locationApi from '~/api/locationApi';
import variantApi from '~/api/variantApi';
import colorApi from '~/api/colorApi';
import Loading from '~/components/Loading';
import { CartContext } from '~/Context/CartContext';
import { UserContext } from '~/Context/UserContext';
import { useEffect, useState, useContext } from 'react';
const cx = classNames.bind(style);
const OrderCuccess = () => {
    const [orders, setOrders] = useState(false);

    const { loading, setLoading, deleteCart, setListCartLocal } = useContext(CartContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const url = window.location.href;
        if (user) {
            if (url.indexOf('madh') > 0) {
                var index = url.indexOf('madh') + 5;
                let returnDataUrl = '';
                if (index > 0) {
                    returnDataUrl = url.slice(index);
                }

                if (returnDataUrl != null) {
                    const cartInfo = JSON.parse(localStorage.getItem('cartInfo'));
                    const returnData = async () => {
                        try {
                            const resultGetOrder = await cartApi.getOrdersCode(returnDataUrl);
                            console.log('resultGetOrder', resultGetOrder);
                            setOrders(resultGetOrder?.data[0]);
                            const cartLocal = JSON.parse(localStorage.getItem('listCart'));
                            if (cartLocal) {
                                localStorage.removeItem('listCart');
                                setListCartLocal([]);
                            } else {
                                deleteCart();
                            }
                        } catch (error) {
                            console.log('Failed to return data: ', error);
                        }
                    };
                    returnData();
                }
            } else if (url.indexOf('vnp_Amount') > 0) {
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

                            const cartLocal = JSON.parse(localStorage.getItem('listCart'));
                            if (cartLocal && user == undefined) {
                                localStorage.removeItem('listCart');
                                setListCartLocal([]);
                            } else {
                                deleteCart();
                                console.log('Delete cart');
                            }
                            console.log('Delete cart', user);
                        } catch (error) {
                            console.log('Failed to return data: ', error);
                        }
                    };

                    returnData();
                }
            }
        } else {
            // if (url.indexOf('madh') > 0) {
            //     const dataPay = JSON.parse(localStorage.getItem('payData'));
            //     console.log('dataPay', dataPay);
            //     setOrders(dataPay);
            //     const cartLocal = JSON.parse(localStorage.getItem('listCart'));
            //     if (cartLocal) {
            //         localStorage.removeItem('listCart');
            //         setListCartLocal([]);
            //     } else {
            //         deleteCart();
            //     }
            // } else if (url.indexOf('vnp_Amount') > 0) {
            //     var index = url.indexOf('vnp_Amount');
            //     let returnDataUrl = '';
            //     if (index > 0) {
            //         returnDataUrl = url.slice(index);
            //     }
            //     if (returnDataUrl != null) {
            //         const cartInfo = JSON.parse(localStorage.getItem('cartInfo'));
            //         const returnData = async () => {
            //             try {
            //                 const result = await cartApi.returnDataVnPay(returnDataUrl);
            //                 const code = result.data.order_code;
            //                 console.log('result', result);
            //                 cartInfo.code = code;
            //                 const resultCreteOrders = await cartApi.payVNPay(cartInfo);
            //                 console.log('resultCreteOrders', resultCreteOrders);
            //                 const resultGetOrder = await cartApi.getOrdersCode(code);
            //                 console.log('resultGetOrder', resultGetOrder);
            //                 setOrders(resultGetOrder?.data[0]);
            //                 const cartLocal = JSON.parse(localStorage.getItem('listCart'));
            //                 if (cartLocal && user == undefined) {
            //                     localStorage.removeItem('listCart');
            //                     setListCartLocal([]);
            //                 } else {
            //                     deleteCart();
            //                     console.log('Delete cart');
            //                 }
            //                 console.log('Delete cart', user);
            //             } catch (error) {
            //                 console.log('Failed to return data: ', error);
            //             }
            //         };
            //         returnData();
            //     }
            // }

            const dataPay = JSON.parse(localStorage.getItem('payData'));
            console.log('dataPay', dataPay);
            setOrders(dataPay);
            const cartLocal = JSON.parse(localStorage.getItem('listCart'));
            if (cartLocal) {
                localStorage.removeItem('listCart');
                setListCartLocal([]);
            } else {
                // deleteCart();
            }
        }
    }, [user]);

    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [variant, setVariant] = useState();
    const [color, setColor] = useState();
    useEffect(() => {
        // if (user == undefined) {
        const getLocation = async () => {
            try {
                const resultProvince = await locationApi.getAllProvince();
                const provinceFt = resultProvince?.data?.filter((item) => item.id == orders?.province_id);
                setProvince(provinceFt[0]?.name);
                //
                const resultDistricts = await locationApi.getAllDistricts();
                const districtFt = resultDistricts?.data?.filter((item) => item.id == orders?.province_id);
                setDistrict(districtFt[0]?.name);

                //
                const resultWard = await locationApi.getAllWard();
                const wardFt = resultWard?.data?.filter((item) => item.id == orders?.province_id);
                setWard(wardFt[0]?.name);

                const resultVariant = await variantApi.getAllClient();
                setVariant(resultVariant.data);
                const resultColor = await colorApi.getAllClient();
                setColor(resultColor.data);
                console.log('resultColor', resultColor);
            } catch (error) {
                console.log(error);
            }
        };
        getLocation();
        // }
    }, [user, orders]);
    console.log('orders', orders);
    const getColor = (id) => {
        const colorDetails = color?.filter((item) => item.id == id);
        if (colorDetails) {
            return colorDetails[0]?.name;
        }

        //
    };

    const getVariant = (id) => {
        const variantDetails = variant?.filter((item) => item.id == id);
        if (variantDetails) {
            // console.log('variantDetails', variantDetails);
            return variantDetails[0].variant_name;
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            {user ? (
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
                                    <th>Số lượng</th>
                                    <th>Tổng giá</th>
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
                                        <td>{item.quantity}</td>
                                        <td>
                                            {(Number(item.price) * Number(item.quantity)).toLocaleString('vi-VN', {
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
            ) : (
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
                                <p className="oreder__item--content">
                                    {orders?.payment_method_id == 2 ? 'COD' : 'VnPay'}
                                </p>
                            </div>
                            {/* <div className={cx('oreder__item')}>
                                <p className={cx('oreder__item--title')}>- Ngày đặt hàng: </p>
                                <p className="oreder__item--content">{orders?.created_at}</p>
                            </div> */}
                            <div className={cx('oreder__item')}>
                                <p className={cx('oreder__item--title')}>- Cách thức vận chuyển: </p>
                                <p className="oreder__item--content">
                                    {orders?.shipping_method_id == 5 ? 'Shop tự giao' : 'Giữ hàng tại cửa hàng'}
                                </p>
                            </div>
                            <div className={cx('oreder__item')}>
                                <p className={cx('oreder__item--title')}>- Địa chỉ: </p>
                                <p className="oreder__item--content">
                                    {province}, {district}, {ward}, {orders?.address}
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
                                <p className="oreder__item--content">{orders?.discount}</p>
                            </div>
                            <div className={cx('oreder__item')}>
                                <p className={cx('oreder__item--title')}>- Tổng giá trị: </p>
                                <p className="oreder__item--content">{Number(orders?.total).toLocaleString()}đ</p>
                            </div>
                            <div className={cx('oreder__item')}>
                                <p className={cx('oreder__item--title')}>- Trạng thái đơn hàng: </p>
                                {/* <p className="oreder__item--content">{orders?.status_name}</p> */}
                                <p className="oreder__item--content">Đang chờ xác nhận</p>
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
                                    <th>Số lượng</th>
                                    <th>Tổng giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.details?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div>
                                                <img className={cx('img__tbl')} src={item.image} />
                                            </div>
                                        </td>
                                        <td>
                                            <p className={cx('name__tbl')}>{item.name}</p>
                                        </td>
                                        <td>{getColor(item.color_id)}</td>
                                        <td>{getVariant(item.variant_id)}GB</td>
                                        <td>
                                            {Number(item.price).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {(Number(item.price) * Number(item.quantity)).toLocaleString('vi-VN', {
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
            )}
        </div>
    );
};

export default OrderCuccess;
