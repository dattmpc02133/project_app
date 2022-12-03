import { useEffect, useRef, useState } from 'react';
import Slideshow from '../../components/slideshow';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Home.module.scss';
// import images from '../../assets/images';
// import { Products_list } from '../../services/ApiServices';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
const cx = classNames.bind(style);
function Home() {
    const [listProducts, setListProducts] = useState();
    // const svgRef = useRef(null);
    // const [height, setHeight] = useState();
    // const [heightProducts, setHeightProducts] = useState();
    useEffect(() => {
        const fetchHome = async () => {
            const dataHome = await productApi.getHomeAll();
            setListProducts(dataHome.data);
        };
        const HomeList = () => {};
        fetchHome();
    }, []);
    // listProducts.map((item, index) => {
    //     item.products.map((product=>{
    //         console.log("product",);
    //     }))
    // });
    // const handleSeeMore = () => {
    //     const clientHeight = svgRef.current;
    //     console.log('clientHeight', clientHeight);
    // };
    // console.log('listProducts', listProducts[0].products);
    return (
        <>
            <Slideshow />
            {listProducts?.map((ListPrd) => {
                return (
                    <div className={cx('carousel-slide-box')}>
                        <a href="#" className={cx('logo-slide')}>
                            <span>
                                {/* <img className={cx('personal_auth-logo')} src={images.logo2} /> */}
                                {ListPrd.name}
                            </span>
                        </a>
                        <div className={cx('slide-cate-product')}>
                            <div className={cx('slide-owl-stage')}>
                                {ListPrd.products.map((item) => {
                                    return (
                                        <>
                                            <div className={cx('olw-item')}>
                                                <Link
                                                    // to={`/${product.path}/${item.slug}`}
                                                    // key={index}
                                                    className={cx('olw-item-link')}
                                                >
                                                    <div className={cx('olw-newDiscount-head')}>
                                                        {/* <label>{item.news}</label> */}
                                                        {/* <div className={cx('olw-percent')}>{item.discount}</div> */}
                                                    </div>
                                                    <div className={cx('olw-images-box')}>
                                                        <img
                                                            src={item.url_image}
                                                            // alt={item.title}
                                                            className={cx('olw-img-slide')}
                                                        />
                                                    </div>
                                                    <h3>{item.name}</h3>
                                                    <span className={cx('price')}>
                                                        {/* {item.priceReducer} <del>{item.price}</del> */}
                                                    </span>
                                                </Link>
                                            </div>
                                        </>
                                    );
                                })}
                                <div>Xem thêm</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Home;
