import Slideshow from '../../components/slideshow';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Home.module.scss';
import images from '../../assets/images';
import { Products_list } from '../../services/ApiServices';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Storelocation from '~/components/Storelocation';
const cx = classNames.bind(style);
function Home() {
    const slider = useRef();
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <>
            <Slideshow />
            {Products_list.map((product, index) => (
                <div className={cx('carousel-slide-box')} key={index}>
                    <a href="#" className={cx('logo-slide')}>
                        <span>
                            <img className={cx('personal_auth-logo')} src={images.logo2} />
                            {product.label}
                        </span>
                    </a>
                    <div className={cx('slide-cate-product')}>
                        <div className={cx('slide-owl-stage')}>
                            <Slider ref={slider} {...settings}>
                                {product.children.map((item, index) => (
                                    <div className={cx('olw-item')} key={index}>
                                        <Link to={`/${product.path}/${item.slug}`} className={cx('olw-item-link')}>
                                            <div className={cx('olw-newDiscount-head')}>
                                                <label>{item.news}</label>
                                                <div className={cx('olw-percent')}>{item.discount}</div>
                                            </div>
                                            <div className={cx('olw-images-box')}>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className={cx('olw-img-slide')}
                                                />
                                            </div>
                                            <h3>{item.title}</h3>
                                            <span className={cx('price')}>
                                                {item.priceReducer} <del>{item.price}</del>
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                                <div className={cx('olw-btn_nav')} style={{ display: 'none' }}></div>
                            </Slider>
                        </div>
                    </div>
                </div>
            ))}
            <Storelocation />
        </>
    );
}

export default Home;
