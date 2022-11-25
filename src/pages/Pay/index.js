import { AiOutlineShopping } from 'react-icons/ai';
import { GiMoneyStack } from 'react-icons/gi';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Pay.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
const Pay = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-pay')}>
                <div className={cx('middleCart-wrapper')}>
                    <div className={cx('alertSuccess')}>
                        <AiOutlineShopping className={cx('icon-shopping')} />
                        <strong>Đặt hàng thành công</strong>
                    </div>
                    <div className={cx('orderContent')}>
                        <div className={cx('thankOderCustomer')}>
                            <p>
                                Cảm ơn: <b>Trần Minh Đạt</b> đã cho TopZone cơ hội được phục vụ.
                            </p>
                        </div>
                        <div className={cx('infoOder')}>
                            <div className={cx('info-order-header')}>
                                <h4>
                                    Đơn hàng: <span style={{ color: '#2997ff' }}>#63328309</span>
                                </h4>
                                <div className={cx('header-right')}>
                                    <Link className={cx('managementOder')}>Quản lý đơn hàng</Link>
                                    <div className={cx('cancel-order-new')}>
                                        <span>•</span>
                                        <Link>Hủy</Link>
                                    </div>
                                </div>
                            </div>
                            <label>
                                <ul>
                                    <li>
                                        <b>Người nhận</b> Trần Minh Đạt, 0978456123
                                    </li>
                                </ul>
                            </label>
                            <label>
                                <ul>
                                    <li>
                                        <b>Giao đến</b> tét, Thị trấn Thứ Ba, Huyện An Biên, Kiên Giang (nhân viên sẽ
                                        gọi xác nhận trước khi giao).
                                    </li>
                                </ul>
                            </label>
                            <label>
                                <ul>
                                    <li>
                                        <b>Phí giao hàng</b> 90.000đ
                                    </li>
                                </ul>
                            </label>
                            <label>
                                <ul>
                                    <li>
                                        <b>Tổng tiền</b> 59.070.000đ
                                    </li>
                                </ul>
                            </label>
                            <label>
                                <ul>
                                    <li>
                                        <b>Yêu cầu khác</b> test
                                    </li>
                                </ul>
                            </label>
                        </div>
                        <div className={cx('order-infor-alert')}>
                            <h4> Đơn hàng chưa được thanh toán </h4>
                        </div>
                        <div className={cx('payment-method-new')}>
                            <h3> Chọn hình thức thanh toán: </h3>
                            <ul>
                                <li>
                                    <Link className={cx('text-payment')}>
                                        <input type="checkbox" />
                                        <div className={cx('paymentHead')}>
                                            <GiMoneyStack />
                                            <span>Thanh toán tiền mặt khi nhận hàng</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                            <button className={cx('confirm-payment-button')}>XÁC NHẬN</button>
                            <div className={cx('refund-popup')}>
                                <span>
                                    Khi cần hỗ trợ vui lòng gọi <a href="tel:1900 9696 42"></a> (08h00 - 21h30)
                                </span>
                            </div>
                        </div>
                        <div className={cx('timeTakeGoods')}>
                            <h4> Thời gian nhận hàng </h4>
                            <div className={cx('box-order')}>
                                <div className={cx('rowTime')}>
                                    <span> Giao trước 14h00 Ngày mai (15/11)</span>
                                </div>
                                <ul>
                                    <li>
                                        <Link className={cx('link-oder-item')}>
                                            <img src="https://cdn.tgdd.vn/Products/Images/42/245545/s16/iPhone-14-plus-topzone%20(5)-200x200.png" />
                                        </Link>
                                        <div className={cx('text-order')}>
                                            <div className={cx('text-order__product-name')}>iPhone 14 Plus 128GB</div>
                                            <div className={cx('amount-color')}>
                                                <small>Màu: Tím nhạt</small>
                                                <small>Số lượng: 1</small>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <Link className={cx('buyanotherNew')}>Về trang chủ TopZone</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
