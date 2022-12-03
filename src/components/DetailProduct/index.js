import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
import location from '../../api/locationApi.js';
import productsBySubCateApi from '../../api/ProductsBySubCateApi';

// tab descriptions
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const cx = classNames.bind(style);
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
const DetailProduct = () => {
    const { state, search } = useLocation();
    const Search = useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);
    const productID = Search.get('id');
    const IDSubCategory = state?.subcategory_id;
    // console.log("IDSubCategory",IDSubCategory);
    const [seeliststore, setSeeListStore] = useState();
    const [cityprovince, setCityProvince] = useState();
    const [city, setCity] = useState();

    const [productDetail, setProductDetail] = useState();
    const [listTypeGB, setListTypeGB] = useState();
    const [dataVariants, setDataVariants] = useState();
    const [variantID, setVariantID] = useState('1');
    const [itemColorActive, setItemColorActive] = useState();

    const [dataAllProVince, setDataAllProVince] = useState();
    const [provinceID, setProvinceID] = useState();
    const [districtID, setDistrictID] = useState();
    const [provinceNameActive, setProvinceNameActive] = useState();
    const [districtNameActive, setDistrictNameActive] = useState();
    const [findDataIdDistrict, setFindDataIdDistrict] = useState();
    const [shopProductById, setShopProductById] = useState();
    const [provinceDistrictWardActive, setProvinceDistrictWardActive] = useState();

    const [listProductsBySubCate, setListProductsBySubCate] = useState();
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
    const ProvinceDistrictWard = useMemo(() => {
        if (districtID) {
            const result = shopProductById?.filter((address) => address?.district_id == districtID);
            setProvinceDistrictWardActive(result);
            return result;
        }
        return provinceDistrictWardActive;
    }, [districtID, shopProductById]);
    const handleChangeByIdProvinces = ({ dataProVince }) => {
        setProvinceID(dataProVince?.id);
        setProvinceNameActive(dataProVince?.name);
    };
    const ChangeDistrictPostById = ({ dataDistrictItem }) => {
        setDistrictID(dataDistrictItem?.id);
        setDistrictNameActive(dataDistrictItem?.name);
    };
    const handleSeenList = () => {
        setSeeListStore(!seeliststore);
    };

    const HandleCityProvince = () => {
        setCityProvince(!cityprovince);
    };
    const HandleCityDist = () => {
        setCity(!city);
    };
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
    const handleChangeTypeGB = ({ itemTypeGB }) => {
        setVariantID(itemTypeGB?.id);
    };
    let PriceDisCount = itemColorActive?.price * ((100 - itemColorActive?.discount) / 100);

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const resProvide = await location.getAllProvince();
                const dataProvide = resProvide?.data;
                setDataAllProVince(dataProvide);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchDistrict = async () => {
            try {
                const resDistrict = await location.getAllDistricts();
                const dataDistrict = resDistrict?.data;
                const FinDataIdDistrict = dataDistrict.filter((district) => {
                    return district?.province_id == provinceID;
                });
                setFindDataIdDistrict(FinDataIdDistrict);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchStockings = async () => {
            try {
                const ListStocking = await location.getByIdVariant(productID, itemColorActive?.variant_id);
                setShopProductById(ListStocking.data);
                setProvinceDistrictWardActive(ListStocking.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProvince();
        fetchDistrict();
        fetchStockings();
    }, [provinceID, productID, itemColorActive]);
    useEffect(() => {
        const fetchProductsBySubCateApi = async () => {
            const result = await productsBySubCateApi.getBySubCate(IDSubCategory);
            setListProductsBySubCate(result.data);
        };
        fetchProductsBySubCateApi();
    }, [IDSubCategory]);

    return (
        <>
            <div className={cx('detail-box')}>
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
                                                onClick={() => handleChangeTypeGB({ itemTypeGB })}
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
                                                        key={index}
                                                        className={cx('item-color-link')}
                                                        style={{ backgroundColor: itemColor?.color_code }}
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
                                        {/* <p>
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
                                        </p> */}
                                    </div>
                                    <p className={cx('text')}>
                                        <em>(*)</em> Giá hoặc khuyến mãi không áp dụng trả góp lãi suất đặc biệt (0%,
                                        0.5%, 1%)
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
                                                    {provinceNameActive ? provinceNameActive : ' Chọn Tỉnh thành'}
                                                    <GoChevronUp className={cityprovince ? cx('icon') : ''} />
                                                </span>
                                                <ul style={{ display: cityprovince ? 'block' : 'none' }}>
                                                    {dataAllProVince?.map((dataProVince, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                onClick={() =>
                                                                    handleChangeByIdProvinces({ dataProVince })
                                                                }
                                                            >
                                                                {dataProVince.name}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                            <div className={cx('ts-district')}>
                                                <span onClick={HandleCityDist}>
                                                    {districtNameActive ? districtNameActive : 'Chọn quận huyện'}
                                                    <GoChevronUp className={city ? cx('icon') : ''} />
                                                </span>
                                                <ul style={{ display: city ? 'block' : 'none' }}>
                                                    {findDataIdDistrict?.map((dataDistrictItem, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                onClick={() =>
                                                                    ChangeDistrictPostById({ dataDistrictItem })
                                                                }
                                                            >
                                                                {dataDistrictItem?.name}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <ul className={cx('tab-list-store', 'tab-box')}>
                                            {ProvinceDistrictWard?.map((addRessShop, index) => {
                                                return (
                                                    <li key={index} className={cx('tab-item-wrap')}>
                                                        <div className={cx('info-store')}>
                                                            <strong>{addRessShop?.store_name}</strong>
                                                            <span>
                                                                {addRessShop?.store_name},{addRessShop?.ward_name}
                                                                {addRessShop?.district_name}, TP.
                                                                {addRessShop?.province_name}
                                                            </span>
                                                            <small>
                                                                <FcApproval /> Có hàng
                                                            </small>
                                                        </div>
                                                        <a className={cx('oder-store')}>Đặt giữ hàng</a>
                                                    </li>
                                                );
                                            })}
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
            <div className={cx('description-box')}>
                <div className={cx('description-product')}>
                    <strong className={cx('description-access')}>Phụ kiện gợi ý cho iPhone</strong>
                    <Slider {...settings}>
                        {listProductsBySubCate?.map((item, index) => {
                            return (
                                <div className={cx('olw-item')} key={index}>
                                    <Link
                                        to={`/productdetail?id=${item.product_id}&slug=${item.slug}`}
                                        state={{
                                            id: item?.product_id,
                                            subcategory_id: item?.subcategory_id,
                                        }}
                                        className={cx('olw-item-link', 'c-3')}
                                        key={index}
                                        sta
                                    >
                                        <div className={cx('olw-newDiscount-head')}>
                                            {/* <label>{item.news}</label> */}
                                        </div>
                                        <div className={cx('olw-images-box')}>
                                            <img src={item.url_image} className={cx('olw-img-slide')} />
                                        </div>
                                        <h3>{item.product_name}</h3>
                                        <span className={cx('price')}>
                                            {item?.variantsDetailsByProduct[0].price}đ &nbsp;
                                            {item?.variantsDetailsByProduct[0].discount}%
                                        </span>
                                    </Link>
                                </div>
                            );
                        })}
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
        </>
    );
};

export default DetailProduct;
