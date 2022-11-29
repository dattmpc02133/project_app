import 'react-image-gallery/styles/css/image-gallery.css';
import { GoChevronUp, GoPackage } from 'react-icons/go';
import { FcApproval } from 'react-icons/fc';
import style from '~/assets/scss/ProductDetail.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// api
import productApi from '../../api/productApi';
const cx = classNames.bind(style);
const images = [
    {
        original:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-1_purple_color-0-650x650.jpg',
        thumbnail:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-1_purple_color-0-200x200.jpg',
    },
    {
        original:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-1_purple_color-1-650x650.jpg',
        thumbnail:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-1_purple_color-1-200x200.jpg',
    },
    {
        original:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-2_design-2-4-650x650.jpg',
        thumbnail:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-2_design-2-4-200x200.jpg',
    },
    {
        original:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-3_camera-3-4-650x650.jpg',
        thumbnail:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-3_camera-3-4-200x200.jpg',
    },
    {
        original:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-4_lineup-4-4-650x650.jpg',
        thumbnail:
            'https://cdn.tgdd.vn/Products/Images/42/245545/s16/iphone_14_plus_pdp_position-4_lineup-4-4-650x650.jpg',
    },
];
const DetailProduct = () => {
    const [seeliststore, setSeeListStore] = useState();
    const [cityprovince, setCityProvince] = useState();
    const [city, setCity] = useState();
    const handleSeenList = () => {
        setSeeListStore(!seeliststore);
    };
    const HandleCityProvince = () => {
        setCityProvince(!cityprovince);
    };
    const HandleCity = () => {
        setCity(!city);
    };
    const { state } = useLocation();
    const productID = state.item.id;
    const [productDetail, setProductDetail] = useState();
    const [listTypeGB, setListTypeGB] = useState();
    const [dataVariants, setDataVariants] = useState();
    const [variantID, setVariantID] = useState('1');
    const [itemColorActive, setItemColorActive] = useState();

    const listColors = useMemo(() => {
        if (dataVariants) {
            const results = dataVariants?.filter((variant) => variant?.variant_id == variantID);

            if (results.length > 0) {
                setItemColorActive(results[0]);
            }
            return results;
        }
        return [];
    }, [variantID, dataVariants]); // 1: 128, 2: 256
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const resData = await productApi.get(productID);
                const ProductDetailItem = resData?.data;
                setProductDetail(ProductDetailItem);
                setListTypeGB(ProductDetailItem?.variants);
                setDataVariants(ProductDetailItem?.dataVariants);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductDetails();
    }, [productID]);

    const handleChangeTypeGB = ({ itemTypeGB, index }) => {
        setVariantID(itemTypeGB?.id);
    };
    let PriceDisCount = itemColorActive?.price * ((100 - itemColorActive?.discount) / 100);
    return (
        <div>
            {productDetail ? (
                <div className={cx('content')}>
                    <div className={cx('article', 'c-6')}>
                        <div className={cx('thumbnail-image')}>
                            <img src={productDetail.url_image} />
                        </div>
                    </div>
                    <div className={cx('aside', 'c-6')}>
                        <div style={{ width: '100%' }}>
                            <h1>
                                {productDetail.name} <div className={cx('aside-new')}>Mới</div>
                            </h1>
                            <div className={cx('price-product-detail')}>
                                {Number(PriceDisCount).toLocaleString()}đ &nbsp;
                                <del>{Number(itemColorActive?.price).toLocaleString()}đ</del>&nbsp;
                                <small>-{itemColorActive?.discount}</small>%
                            </div>
                            <div className={cx('capacity')}>
                                <span>Dung lượng</span>
                                <div className={cx('capacity-gb')}>
                                    {listTypeGB?.map((itemTypeGB, index) => (
                                        <div
                                            className={cx('capacity-gb_link')}
                                            key={index}
                                            onClick={() => handleChangeTypeGB({ itemTypeGB, index })}
                                        >
                                            {itemTypeGB?.variant_name}GB
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('detail-color')}>
                                <span>Màu: {itemColorActive?.color_name}</span>
                                <div className={cx('item-color')}>
                                    <div className={cx('item-color-li')}>
                                        {listColors?.map((itemColor, index) => {
                                            return (
                                                <div
                                                    className={cx('item-color-link')}
                                                    style={{ backgroundColor: itemColor?.color_code }}
                                                    key={index}
                                                    onClick={() => {
                                                        setItemColorActive(itemColor);
                                                    }}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('btn-pays')}>
                                <div className={cx('cart-pays')}>Mua ngay</div>
                            </div>
                            <div className={cx('box-promotion')}>
                                <span>Khuyến mãi</span>
                                <small>Giá và khuyến mãi dự kiến áp dụng đến 23:00 | 31/10</small>
                                <div className={cx('content-promotion')}>
                                    <p>
                                        <i></i>
                                        <b>Tặng Gói bảo hiểm rơi vỡ 12 tháng</b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>Tặng gói bảo hành 24 tháng chính hãng</b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Thu cũ Đổi mới: Giảm đến 2 triệu (Tuỳ model máy cũ, không áp dụng kèm giảm
                                            giá qua cổng thanh toán)
                                            <div>Xem chi tiết</div>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Giảm giá 35% iPad (Tuỳ model) khi mua kèm iPhone (Không kèm khuyến mãi khác
                                            của iPad)
                                            <div>Xem chi tiết</div>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Phụ kiện chính hãng Apple giảm 30% khi mua kèm iPhone{' '}
                                            <div>Xem chi tiết</div>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Nhập mã SPPMWG giảm 10% tối đa 100.000đ khi thanh toán qua Ví ShopeePay{' '}
                                            <div>Xem chi tiết</div>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Nhập mã TGDD giảm 4% tối đa 200.000đ cho đơn hàng từ 500.000đ trở lên khi
                                            thanh toán qua Ví Moca trên ứng dụng Grab <div>Xem chi tiết</div>
                                        </b>
                                    </p>
                                </div>
                                <p className={cx('text')}>
                                    <em>(*)</em> Giá hoặc khuyến mãi không áp dụng trả góp lãi suất đặc biệt (0%, 0.5%,
                                    1%)
                                </p>
                            </div>
                            <div className={cx('check-goods')} onClick={handleSeenList}>
                                <GoPackage />
                                Xem TopZone có hàng
                            </div>
                            <div
                                className={cx('popup-list-store')}
                                style={{ display: seeliststore ? 'block' : 'none' }}
                            >
                                <div className={cx('bg-popup')} onClick={handleSeenList}></div>
                                <div className={cx('list-store')}>
                                    <b>Danh sách cửa hàng TopZone</b>
                                    <div className={cx('close-list-store')} onClick={handleSeenList}>
                                        &times;
                                    </div>
                                    <div className={cx('tab-store')}>
                                        <div className={cx('ts-province')}>
                                            <span onClick={HandleCityProvince}>
                                                Hồ Chí Minh <GoChevronUp className={cityprovince ? cx('icon') : ''} />
                                            </span>
                                            <ul style={{ display: cityprovince ? 'block' : 'none' }}>
                                                <li>Thái Nguyên</li>
                                                <li>Đồng Nai</li>
                                                <li>Hồ Chí Minh</li>
                                                <li>Hà Nội</li>
                                                <li>Tây Ninh</li>
                                                <li>Bình Thuận</li>
                                                <li>Bình Dương</li>
                                                <li>Cần Thơ</li>
                                                <li>Gia Lai</li>
                                                <li>Nam Định</li>
                                            </ul>
                                        </div>
                                        <div className={cx('ts-district')}>
                                            <span onClick={HandleCity}>
                                                Chọn quận huyện <GoChevronUp className={city ? cx('icon') : ''} />
                                            </span>
                                            <ul style={{ display: city ? 'block' : 'none' }}>
                                                <li>Quận Bình Tân</li>
                                                <li>Quận Tân Phú</li>
                                                <li>Hồ Chí Minh</li>
                                                <li>Quận 4</li>
                                                <li>TP.Thủ Đức</li>
                                                <li>Quận 10</li>
                                                <li>Quận 12</li>
                                                <li>Quận 8</li>
                                                <li>Quận Tân Bình</li>
                                                <li>Quận 7</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <ul className={cx('tab-list-store', 'tab-box')}>
                                        <li className={cx('tab-item-wrap')}>
                                            <div className={cx('info-store')}>
                                                <strong>TopZone Nguyễn Thị Tú</strong>
                                                <span>
                                                    229 Nguyễn Thị Tú, P.Bình Hưng Hòa B, Q.Bình Tân, TP. Hồ Chí Minh
                                                </span>
                                                <small>
                                                    <FcApproval /> Có hàng
                                                </small>
                                            </div>
                                            <a className={cx('oder-store')}>Đặt giữ hàng</a>
                                        </li>
                                        <li className={cx('tab-item-wrap')}>
                                            <div className={cx('info-store')}>
                                                <strong>TopZone Nguyễn Thị Tú</strong>
                                                <span>
                                                    229 Nguyễn Thị Tú, P.Bình Hưng Hòa B, Q.Bình Tân, TP. Hồ Chí Minh
                                                </span>
                                                <small>
                                                    <FcApproval /> Có hàng
                                                </small>
                                            </div>
                                            <a className={cx('oder-store')}>Đặt giữ hàng</a>
                                        </li>
                                        <li className={cx('tab-item-wrap')}>
                                            <div className={cx('info-store')}>
                                                <strong>TopZone Nguyễn Thị Tú</strong>
                                                <span>
                                                    229 Nguyễn Thị Tú, P.Bình Hưng Hòa B, Q.Bình Tân, TP. Hồ Chí Minh
                                                </span>
                                                <small>
                                                    <FcApproval /> Có hàng
                                                </small>
                                            </div>
                                            <a className={cx('oder-store')}>Đặt giữ hàng</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx('policy')}>
                                <span>
                                    <i></i>
                                    Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C
                                </span>
                                <span>
                                    Hư gì đổi nấy 12 tháng tại 3452 siêu thị trên toàn quốc
                                    <a style={{ color: '#0071e3' }}> Xem chi tiết chính sách bảo hành, đổi trả </a>
                                </span>
                                <span>
                                    <i></i>
                                    Bảo hành chính hãng 1 năm{' '}
                                </span>
                                <span>
                                    Giao hàng nhanh toàn quốc
                                    <a style={{ color: '#0071e3' }}> Xem chi tiết </a>
                                </span>
                                <span>
                                    Tổng đài:&nbsp;
                                    <a href="tel:1900.9696.42" style={{ color: '#0071e3' }}>
                                        1900.9696.42
                                    </a>
                                    &nbsp;(9h00 - 21h00 mỗi ngày)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                false
            )}
        </div>
    );
};

export default DetailProduct;
