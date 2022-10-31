import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from '~/assets/scss/ProductDetail.module.scss';
import classNames from 'classnames/bind';
// antd tab descriptions
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// end antd tab descriptions
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
const list_accessory = [
    {
        id: 2000,
        img: 'https://cdn.tgdd.vn/Products/Images/7077/234918/s16/apple-watch-se-40mm-vien-nhom-day-cao-su-vang-650x650.png',
        title: 'Apple Watch SE GPS 40mm',
        price_reducer: '6.990.000',
        price: '8.990.000',
        discount: '-22%',
    },
    {
        id: 2001,
        img: 'https://cdn.tgdd.vn/Products/Images/58/232630/s16/1-650x650.png',
        title: 'Cáp USB - Lightning MFI Belkin CAA002 2m',
        price_reducer: '405.000',
        price: '580.000',
        discount: '-30%',
    },
    {
        id: 2003,
        img: 'https://cdn.tgdd.vn/Products/Images/57/266084/s16/pin-apple-magsafe-battery-pack-211221-090310-650x650.png',
        title: 'Pin Dự Phòng MagSafe',
        price_reducer: '2.390.000',
        price: '2.990.000',
        discount: '-20%',
    },
    {
        id: 2004,
        img: 'https://cdn.tgdd.vn/Products/Images/7077/229063/s16/apple-watch-se-44mm-vien-nhom-day-cao-su-thumbtznew-650x650.png',
        title: 'Apple Watch SE GPS 44mm',
        price_reducer: '7.990.000',
        price: '9.990.000',
        discount: '-20%',
    },
    {
        id: 2005,
        img: 'https://cdn.tgdd.vn/Products/Images/58/232634/s16/cap-lightning-mfi-belkin-duratex-plus-f8j243-trang-thumb-650x650.png',
        title: 'Cáp Type C - Lightning MFI Belkin Duratex Plus F8J243 1.2m',
        price_reducer: '640.000',
        price: '800.000',
        discount: '-15%',
    },
    {
        id: 2006,
        img: 'https://cdn.tgdd.vn/Products/Images/57/221622/s16/sac-du-phong-10000mah-anker-powercore-ii-a1230-thumb-1-650x650.png',
        title: 'Pin sạc dự phòng 10000mAh PowerIQ 2.0 Anker PowerCore II A1230',
        price_reducer: '805.000',
        price: '950.000',
        discount: '-15%',
    },
    {
        id: 2007,
        img: 'https://cdn.tgdd.vn/Products/Images/7077/229059/s16/apple-watch-se-lte-44mm-1-650x650.png',
        title: 'Apple Watch SE GPS + Cellular 44mm',
        price_reducer: '9.790.000',
        price: '11.990.000',
        discount: '-18%',
    },
    {
        id: 2008,
        img: 'https://cdn.tgdd.vn/Products/Images/58/205792/s16/cap-lightning-mfi-09m-anker-a8121xx2-do-thumb-650x650.png',
        title: 'Cáp sạc USB - Lightning 0.9m MFI Anker A8121xx2',
        price_reducer: '310.000',
        price: '370.000',
        discount: '-16%',
    },
];
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
};
const ProductDetail = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-box')}>
                <div className={cx('content')}>
                    <div className={cx('article', 'c-6')}>
                        <ImageGallery
                            showFullscreenButton={false}
                            showPlayButton={false}
                            items={images}
                            className={cx('thumbnail-image')}
                        />
                        ;
                    </div>
                    <div className={cx('aside', 'c-6')}>
                        <div style={{ width: '100%' }}>
                            <h1>
                                iPhone 14 <div className={cx('aside-new')}>Mới</div>
                            </h1>
                            <div className={cx('promotion-local')}>
                                <span>Giá và khuyến mãi tại: Hồ Chí Minh</span>
                            </div>
                            <div className={cx('price-product-detail')}>
                                23.490.000₫ *<del>24.990.000₫</del>
                                <small>-6%</small>
                            </div>
                            <div className={cx('capacity')}>
                                <span>Dung lượng</span>
                                <div className={cx('capacity-gb')}>
                                    <Link className={cx('capacity-gb_link')}>128GB</Link>
                                    <Link className={cx('capacity-gb_link')}>128GB</Link>
                                    <Link className={cx('capacity-gb_link')}>128GB</Link>
                                </div>
                            </div>
                            <div className={cx('detail-color')}>
                                <span>Màu: Xanh Dương</span>
                                <div className={cx('item-color')}>
                                    <div className={cx('item-color-li')}>
                                        <Link className={cx('item-color-link')}></Link>
                                        <Link
                                            className={cx('item-color-link')}
                                            style={{ backgroundColor: '#222930' }}
                                        ></Link>
                                        <Link
                                            className={cx('item-color-link')}
                                            style={{ backgroundColor: '#faf6f2' }}
                                        ></Link>
                                        <Link
                                            className={cx('item-color-link')}
                                            style={{ backgroundColor: '#fc0324' }}
                                        ></Link>
                                        <Link
                                            className={cx('item-color-link')}
                                            style={{ backgroundColor: '#e6ddeb' }}
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('btn-pays')}>
                                <Link className={cx('cart-pays')}>Mua ngay</Link>
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
                                            <Link>Xem chi tiết</Link>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Giảm giá 35% iPad (Tuỳ model) khi mua kèm iPhone (Không kèm khuyến mãi khác
                                            của iPad)
                                            <Link>Xem chi tiết</Link>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Phụ kiện chính hãng Apple giảm 30% khi mua kèm iPhone{' '}
                                            <Link>Xem chi tiết</Link>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Nhập mã SPPMWG giảm 10% tối đa 100.000đ khi thanh toán qua Ví ShopeePay{' '}
                                            <Link>Xem chi tiết</Link>
                                        </b>
                                    </p>
                                    <p>
                                        <i></i>
                                        <b>
                                            Nhập mã TGDD giảm 4% tối đa 200.000đ cho đơn hàng từ 500.000đ trở lên khi
                                            thanh toán qua Ví Moca trên ứng dụng Grab <Link>Xem chi tiết</Link>
                                        </b>
                                    </p>
                                </div>
                                <p className={cx('text')}>
                                    <em>(*)</em> Giá hoặc khuyến mãi không áp dụng trả góp lãi suất đặc biệt (0%, 0.5%,
                                    1%)
                                </p>
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
            </div>
            <div className={cx('description-box')}>
                <div className={cx('description-product')}>
                    <strong className={cx('description-access')}>Phụ kiện gợi ý cho iPhone</strong>
                    <Slider {...settings}>
                        {list_accessory.map((item) => (
                            <div className={cx('olw-item')} key={item.id}>
                                <Link className={cx('olw-item-link', 'c-3')}>
                                    <div className={cx('olw-newDiscount-head')}>
                                        <label>{item.news}</label>
                                    </div>
                                    <div className={cx('olw-images-box')}>
                                        <img src={item.img} alt={item.title} className={cx('olw-img-slide')} />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <span className={cx('price')}>
                                        {item.price_reducer} <del>{item.price}</del> &nbsp;
                                        {item.discount}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className={cx('Description-of-specifications')}>
                    <Tabs>
                        <TabList>
                            <Tab style={{ fontSize: '2rem', padding: '15px' }}>Mô tả</Tab>
                            <Tab style={{ fontSize: '2rem', padding: '15px' }}>Thông số kỹ thuật</Tab>
                        </TabList>

                        <TabPanel>
                            <div className={cx('specifications-text-detail')}>
                                <p>
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-1.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-2.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-3.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-4.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-5.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-6.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-7.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-1.jpg" />
                                    <img src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iphone-14-l-1.jpg" />
                                </p>
                                <h3>Nội dung tính năng</h3>
                                <div className={cx('text-desrepcription')}>
                                    <a href="#">iPhone 14</a>. Với hệ thống camera kép tiên tiến nhất từng có trên
                                    <a href="#">iPhone </a>. Chụp những bức ảnh tuyệt đẹp trong điều kiện từ thiếu sáng
                                    đến dư sáng. Phát hiện Va Chạm, một tính năng an toàn mới, thay bạn gọi trợ giúp khi
                                    cần kíp.
                                </div>
                                <h3 style={{ textAlign: 'justify' }}>Pháp lý</h3>
                                <p>SOS Khẩn Cấp sử dụng kết nối mạng di động hoặc Cuộc Gọi Wi-Fi.</p>
                            </div>
                            <div className={cx('specifications-comment')}>
                                <h3>Hỏi đáp về iPhone 14</h3>
                                <form>
                                    <textarea
                                        name="txtContent"
                                        placeholder="Mời bạn thảo luận, vui lòng nhập tiếng Việt có dấu"
                                        rows="1"
                                        required="required"
                                        width="100%"
                                    ></textarea>
                                </form>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={cx('specifiti')}>
                                <div className={cx('grouplist')}>Màn hình</div>
                                <ul className={cx('text-specifi')}>
                                    <li>
                                        <span className={cx('text-specifi-head')}>Công nghệ màn hình:</span>
                                        <div>
                                            <span>OLED</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
