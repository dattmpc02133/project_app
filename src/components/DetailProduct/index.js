import { Carousel } from 'react-carousel-minimal';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import '~/assets/scss/admin/style.css';

import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useContext } from 'react';
import { FcApproval } from 'react-icons/fc';
import { GoChevronUp, GoPackage } from 'react-icons/go';
import 'react-image-gallery/styles/css/image-gallery.css';
import style from '~/assets/scss/ProductDetail.module.scss';

import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// api
import location from '../../api/locationApi.js';
import productApi from '../../api/productApi';
import productsBySubCateApi from '../../api/ProductsBySubCateApi';
import cartApi from '~/api/cartApi';

// GLobal State
import { CartContext } from '~/Context/CartContext';
import { UserContext } from '~/Context/UserContext';

// GLobal State
import { CommentContext } from '~/Context/CommentContext';

// tab descriptions
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import commentsApi from '../../api/commentsAPi.js';

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
    const token = localStorage.getItem('token');
    const { state, search } = useLocation();
    const Search = useMemo(() => {
        return new URLSearchParams(search);
    }, [search]);
    const productID = Search.get('id');
    const IDSubCategory = state?.subcategory_id;
    const [seeliststore, setSeeListStore] = useState();
    const [cityprovince, setCityProvince] = useState();
    const [city, setCity] = useState();

    const [productDetail, setProductDetail] = useState();
    const [listTypeGB, setListTypeGB] = useState();
    const [dataVariants, setDataVariants] = useState();
    const [variantID, setVariantID] = useState();
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

    //comments
    const [comments, setComments] = useState();
    const [listComments, setListComments] = useState();
    const [repPlayComent, setRepPlayComent] = useState();
    const [idRep, setIdRep] = useState();
    const [render, setRender] = useState();

    //images slide detail
    const [imageSliderThumb, setImageSliderThumb] = useState();
    // scroll
    useEffect(() => {
        // ??????? scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    //Import GobalState
    const {
        addToCart,
        loading,
        getCart,
        modal,
        messStatus,
        statusHandle,
        setLoading,
        setMessStatus,
        setStatusHandle,
        setModal,
    } = useContext(CartContext);
    const { fetchComments } = useContext(CommentContext);
    const { user } = useContext(UserContext);
    //
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
        setCityProvince(!cityprovince);
    };
    const ChangeDistrictPostById = ({ dataDistrictItem }) => {
        setDistrictID(dataDistrictItem?.id);
        setDistrictNameActive(dataDistrictItem?.name);
        setCity(!city);
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
                setImageSliderThumb(ProductDetailItem);
                setProductDetail(ProductDetailItem);
                setListTypeGB(ProductDetailItem?.variants);
                if (ProductDetailItem?.variants) {
                    setVariantID(String(ProductDetailItem?.variants[0].id));
                }
                setDataVariants(ProductDetailItem?.dataVariants);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductDetails();
    }, [productID]);
    const handleChangeTypeGB = ({ itemTypeGB }) => {
        setVariantID(itemTypeGB?.id);
        console.log(itemTypeGB?.id);
        // Id
    };
    let PriceDisCount = itemColorActive?.price * ((100 - itemColorActive?.discount) / 100);

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const resProvide = await location.getAllProvince();
                const resProvideNew = await location.getProvinceStore();
                const dataProvide = resProvide?.data;
                const dataProvideNew = resProvideNew.data.map((province) => Number(province));

                const dataPrView = dataProvide?.filter((item) => {
                    if (dataProvideNew.includes(item.id)) {
                        return item;
                    }
                });
                setDataAllProVince(dataPrView);
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

    const handleAddToCart = (e) => {
        const data = {
            product_id: itemColorActive.product_id,
            variant_id: itemColorActive.variant_id,
            color_id: itemColorActive.color_id,
            quantity: 1,
        };

        if (user != undefined) {
            console.log('user', user);
            addToCart(data);
        } else {
            // const data = {
            //     coupon_code: null,
            //     coupon_id: null,
            //     // details: [{???}],
            //     discount: '',
            //     discount_formatted: '',
            //     email: '',
            //     fee_ship: '18000',
            //     fee_ship_formatted: '18,000??',
            //     payment_method: null,
            //     payment_method_id: 2,
            //     phone: '',
            //     province_id: '',
            //     district_id: '',
            //     ward_id: '',
            //     shipping_method: null,
            //     shipping_method_id: 5,
            //     total: '',
            //     total_formatted: '',
            // };

            const data = {
                product_id: itemColorActive.product_id,
                variant_id: itemColorActive.variant_id,
                color_id: itemColorActive.color_id,
                name: productDetail.name,
                price: Number(PriceDisCount).toFixed(0),
                originalPrice: Number(itemColorActive?.price).toFixed(0),
                image: imageSliderThumb.url_image,
                quantity: 1,
            };
            const listProductLocal = localStorage.getItem('listCart');

            if (listProductLocal != undefined) {
                const listCartLocal = JSON.parse(listProductLocal);
                const result = listCartLocal.filter(
                    (item) =>
                        item.product_id == data.product_id &&
                        item.color_id == data.color_id &&
                        item.variant_id == data.variant_id,
                );
                listCartLocal?.map((item, index) => {
                    if (
                        item.product_id == data.product_id &&
                        item.color_id == data.color_id &&
                        item.variant_id == data.variant_id
                    ) {
                        localStorage.removeItem('listCart');
                        listCartLocal[index].quantity++;
                        localStorage.setItem('listCart', JSON.stringify([...listCartLocal]));
                        setMessStatus('Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng');
                        setStatusHandle(true);
                        getCart();
                        setModal(true);
                    }
                });
                if (result.length === 0) {
                    localStorage.removeItem('listCart');
                    listCartLocal.push(data);
                    localStorage.setItem('listCart', JSON.stringify([...listCartLocal]));
                    setMessStatus('Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng');
                    setStatusHandle(true);
                    setModal(true);
                    getCart();
                }
            } else {
                localStorage.setItem('listCart', JSON.stringify([data]));
                setMessStatus('Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng');
                getCart();
                setStatusHandle(true);
                setModal(true);
            }
        }
    };
    // comments
    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const responseListComment = await commentsApi.getAllComments();
                const dataNewListComment = responseListComment.data
                    .filter((itemComment) => itemComment?.product_id == itemColorActive?.product_id)
                    .map((comment) => {
                        comment.showReply = false;
                        return comment;
                    });
                setListComments(dataNewListComment);
                setLoading(false);
            } catch (error) {
                console.log('Fail to create product', error);
                setLoading(false);
            }
        };
        fetchComments();
    }, [itemColorActive]);

    const handleSubmitComments = (e) => {
        e.preventDefault();
        const data = {
            product_id: itemColorActive.product_id,
            content: comments,
        };
        setComments('');
        const createComment = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.create(data);
                setLoading(false);
                setMessStatus(result.message);
                setStatusHandle(true);
                setModal(true);
                const responseListComment = await commentsApi.getAllComments();
                const dataNewListComment = responseListComment.data
                    .filter((itemComment) => itemComment?.product_id == itemColorActive?.product_id)
                    .map((comment) => {
                        comment.showReply = false;
                        return comment;
                    });
                setListComments(dataNewListComment);
            } catch (error) {
                console.log('Failed to add to cart: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        createComment();
    };

    const itemreplay = ({ id }) => {
        setIdRep(id);
    };
    const handleSubmitReplay = (e) => {
        e.preventDefault();

        const dataRepComment = {
            id_comment: idRep,
            rep_comment: repPlayComent,
        };
        setRepPlayComent('');
        const createRepComment = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.create(dataRepComment);
                setLoading(false);
                setMessStatus(result.message);
                setStatusHandle(true);
                setModal(true);
            } catch (error) {
                console.log('Failed to add to cart: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        createRepComment();
    };

    const handleActive = (index) => {
        if (render === index) {
            setRender('');
        } else {
            setRender(index);
        }
    };

    const imgUrl = imageSliderThumb?.url_image;
    const urlhinh = imageSliderThumb?.collection_images.concat(imgUrl).map((img) => {
        return { image: img };
    });
    const handleScrollToTop = () =>
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    return (
        <>
            <div className={cx('detail-box')}>
                {loading ? <Loading /> : ''}
                {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
                {productDetail ? (
                    <div className={cx('content')}>
                        <div className={cx('article', 'c-6')}>
                            <Carousel
                                data={urlhinh.reverse()}
                                time={2000}
                                width="850px"
                                height="550px"
                                radius="10px"
                                captionPosition="bottom"
                                pauseIconSize="40px"
                                slideImageFit="cover"
                                thumbnails={true}
                                thumbnailWidth="120px"
                            />
                        </div>
                        <div className={cx('aside', 'c-6')}>
                            <div style={{ width: '100%' }}>
                                <h1>
                                    {productDetail.name} <div className={cx('aside-new')}>M????i</div>
                                </h1>
                                <div className={cx('price-product-detail')}>
                                    {Number(PriceDisCount).toLocaleString()}?? &nbsp;
                                    <del>{Number(itemColorActive?.price).toLocaleString()}??</del>&nbsp;
                                    <small>-{itemColorActive?.discount}</small>%
                                </div>
                                <div className={cx('capacity')}>
                                    <span>Dung l??????ng</span>
                                    <div className={cx('capacity-gb')}>
                                        {listTypeGB?.map((itemTypeGB, index) => (
                                            <div
                                                className={
                                                    itemColorActive?.variant_id == itemTypeGB.id
                                                        ? cx('capacity-gb_link', 'active')
                                                        : cx('capacity-gb_link')
                                                }
                                                key={index}
                                                onClick={() => handleChangeTypeGB({ itemTypeGB })}
                                            >
                                                {itemTypeGB?.variant_name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('detail-color')}>
                                    <span>M??u: {itemColorActive?.color_name}</span>
                                    <div className={cx('item-color')}>
                                        <div className={cx('item-color-li')}>
                                            {listColors?.map((itemColor, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            itemColorActive?.color_id == itemColor?.color_id
                                                                ? cx('item-color-link', 'active')
                                                                : cx('item-color-link')
                                                        }
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
                                    <div className={cx('cart-pays')} onClick={(e) => handleAddToCart(e)}>
                                        Mua ngay
                                    </div>
                                </div>
                                <div className={cx('box-promotion')}>
                                    <span>Khuy????n ma??i</span>
                                    <small>Gi?? v?? khuy???n m??i d??? ki???n ??p d???ng ?????n 23:00 | 31/10</small>
                                    <div className={cx('content-promotion')}>
                                        {/* <p>
                                            <i></i>
                                            <b>T???ng G??i b???o hi???m r??i v??? 12 th??ng</b>
                                        </p>
                                        <p>
                                            <i></i>
                                            <b>T???ng g??i b???o h??nh 24 th??ng ch??nh h??ng</b>
                                        </p>
                                        <p>
                                            <i></i>
                                            <b>
                                                Thu c?? ?????i m???i: Gi???m ?????n 2 tri???u (Tu??? model m??y c??, kh??ng ??p d???ng k??m gi???m
                                                gi?? qua c???ng thanh to??n)
                                                <div>Xem chi ti????t</div>
                                            </b>
                                        </p>
                                        <p>
                                            <i></i>
                                            <b>
                                                Gi???m gi?? 35% iPad (Tu??? model) khi mua k??m iPhone (Kh??ng k??m khuy???n m??i kh??c
                                                c???a iPad)
                                                <div>Xem chi ti????t</div>
                                            </b>
                                        </p>
                                        <p>
                                            <i></i>
                                            <b>
                                                Ph??? ki???n ch??nh h??ng Apple gi???m 30% khi mua k??m iPhone{' '}
                                                <div>Xem chi ti????t</div>
                                            </b>
                                        </p>
                                        <p>
                                            <i></i>
                                            <b>
                                                Nh???p m?? SPPMWG gi???m 10% t???i ??a 100.000?? khi thanh to??n qua V?? ShopeePay{' '}
                                                <div>Xem chi ti????t</div>
                                            </b>
                                        </p>
                                        <p>
                                            <i></i>
                                            <b>
                                                Nh???p m?? TGDD gi???m 4% t???i ??a 200.000?? cho ????n h??ng t??? 500.000?? tr??? l??n khi
                                                thanh to??n qua V?? Moca tr??n ???ng d???ng Grab <div>Xem chi ti????t</div>
                                            </b>
                                        </p> */}
                                    </div>
                                    <p className={cx('text')}>
                                        <em>(*)</em> Gi?? ho???c khuy???n m??i kh??ng ??p d???ng tr??? g??p l??i su???t ?????c bi???t (0%,
                                        0.5%, 1%)
                                    </p>
                                </div>
                                <div className={cx('check-goods')} onClick={handleSeenList}>
                                    <GoPackage />
                                    Xem TopZone c?? h??ng
                                </div>
                                <div
                                    className={cx('popup-list-store')}
                                    style={{ display: seeliststore ? 'block' : 'none' }}
                                >
                                    <div className={cx('bg-popup')} onClick={handleSeenList}></div>
                                    <div className={cx('list-store')}>
                                        <b>Danh s??ch c???a h??ng TopZone</b>
                                        <div className={cx('close-list-store')} onClick={handleSeenList}>
                                            &times;
                                        </div>
                                        <div className={cx('tab-store')}>
                                            <div className={cx('ts-province')}>
                                                <span onClick={HandleCityProvince}>
                                                    {provinceNameActive ? provinceNameActive : ' Cho??n Ti??nh tha??nh'}
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
                                                    {districtNameActive ? districtNameActive : 'Cho??n qu????n huy????n'}
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
                                                                <FcApproval /> C?? h??ng
                                                            </small>
                                                        </div>
                                                        {/* <a className={cx('oder-store')}>??????t gi???? ha??ng</a>d */}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className={cx('policy')}>
                                    <span>
                                        <i></i>
                                        B??? s???n ph???m g???m: H???p, S??ch h?????ng d???n, C??y l???y sim, C??p Lightning - Type C
                                    </span>
                                    <span>
                                        H?? g?? ?????i n???y 12 th??ng t???i 3452 si??u th??? tr??n to??n qu???c
                                        <a style={{ color: '#0071e3' }}> Xem chi ti???t ch??nh s??ch b???o h??nh, ?????i tr??? </a>
                                    </span>
                                    <span>
                                        <i></i>
                                        Ba??o ha??nh ch??nh h??ng 1 n??m{' '}
                                    </span>
                                    <span>
                                        Giao h??ng nhanh to??n qu???c
                                        <a style={{ color: '#0071e3' }}> Xem chi ti???t </a>
                                    </span>
                                    <span>
                                        T???ng ????i:&nbsp;
                                        <a href="tel:1900.9696.42" style={{ color: '#0071e3' }}>
                                            1900.9696.42
                                        </a>
                                        &nbsp;(9h00 - 21h00 m???i ng??y)
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
                    <strong className={cx('description-access')}>Ph??? ki???n g???i y??</strong>
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
                                        onClick={handleScrollToTop}
                                    >
                                        <div className={cx('olw-newDiscount-head')}>
                                            {/* <label>{item.news}</label> */}
                                        </div>
                                        <div className={cx('olw-images-box')}>
                                            <img src={item.url_image} className={cx('olw-img-slide')} />
                                        </div>
                                        <h3>{item.product_name}</h3>
                                        <span className={cx('price')}>
                                            {Number(item?.variantsDetailsByProduct[0]?.price).toLocaleString()}?? &nbsp;
                                            {item?.variantsDetailsByProduct[0]?.discount}%
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
                            <Tab style={{ fontSize: '2rem', padding: '15px' }}>M?? ta??</Tab>
                            <Tab style={{ fontSize: '2rem', padding: '15px' }}>Th??ng s???? ky?? thu????t</Tab>
                        </TabList>

                        <TabPanel>
                            <div
                                className={cx('specifications-text-detail')}
                                dangerouslySetInnerHTML={{ __html: productDetail?.description }}
                            ></div>
                            <div className={cx('specifications-comment')}>
                                {/* <h3>H???i ????p v??? {productDetail.name}</h3> */}

                                {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
                                {token ? (
                                    <form onSubmit={(e) => handleSubmitComments(e)}>
                                        <textarea
                                            value={comments}
                                            name="txtContent"
                                            placeholder="M???i b???n th???o lu???n, vui l??ng nh???p ti???ng Vi???t c?? d???u"
                                            width="100%"
                                            onChange={(e) => setComments(e.target.value)}
                                            className={cx('form-addComment')}
                                        ></textarea>
                                        <button type="submit" className={cx('btn-seend_comment')}>
                                            G????i
                                        </button>
                                    </form>
                                ) : (
                                    '????ng nh??p ?????? bi??nh lu????n sa??n ph????m.....!!!'
                                )}
                                <div className={cx('comment-list')}>
                                    {listComments?.map((cnnd, index) => (
                                        <div className={cx('cmnd-name')} key={index}>
                                            <div className={cx('cmnd_box')}>
                                                <p className={cx('cmt-top-name')}>
                                                    <strong>{cnnd.user_name}</strong>
                                                </p>
                                                <div className={cx('cmt-content')}>{cnnd.content}</div>
                                                <div
                                                    className={cx('cmt-command')}
                                                    onClick={(e) => {
                                                        itemreplay({ id: cnnd.id });
                                                        handleActive(index);
                                                    }}
                                                >
                                                    Tra?? l????i
                                                </div>
                                            </div>

                                            <div className={cx('wrapper-answer-reply')}>
                                                {cnnd?.rep_coment?.map((item, indexReply) => {
                                                    if (item.is_active == 1) {
                                                        return (
                                                            <div className={cx('view-content_answer')} key={indexReply}>
                                                                <>
                                                                    <strong>{item.rep_user_name}</strong>
                                                                    <div>{item.rep_comment}</div>
                                                                    <div
                                                                        className={cx('cmt-command')}
                                                                        onClick={(e) => {
                                                                            itemreplay({ id: cnnd.id });
                                                                            handleActive(index);
                                                                        }}
                                                                    >
                                                                        Tra?? l????i
                                                                    </div>
                                                                </>
                                                            </div>
                                                        );
                                                    } else {
                                                        return false;
                                                    }
                                                })}
                                            </div>
                                            <form
                                                className={render === index ? cx('cmt-', 'active') : cx('cmt-')}
                                                onSubmit={(e) => handleSubmitReplay(e)}
                                            >
                                                <textarea
                                                    value={repPlayComent}
                                                    name="txtContent"
                                                    width="100%"
                                                    onChange={(e) => setRepPlayComent(e.target.value)}
                                                ></textarea>
                                                <button type="submit" className={cx('btn-seend_comment')}>
                                                    G????i
                                                </button>
                                            </form>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div
                                className={cx('specifiti')}
                                dangerouslySetInnerHTML={{ __html: productDetail?.specification_infomation }}
                            ></div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default DetailProduct;
