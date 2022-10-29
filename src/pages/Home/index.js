import CategoryContent from '../../components/CategoryContent';
import Slideshow from '../../components/slideshow';
import classNames from 'classnames/bind';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';
import style from '~/assets/scss/Home.module.scss';
import images from '../../assets/images';
import { Products_list } from '../../services/ApiServices';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
const cx = classNames.bind(style);
function Home() {
    const slider = useRef();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        slickPrev: true,
        slickNext: true,
    };
    return (
        <>
            <Slideshow />
            <CategoryContent />
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
                                <div className={cx('slide-olw-box')}>
                                    {product.children.map((item, index) => (
                                        <div className={cx('olw-item')} key={index}>
                                            <a href="#" className={cx('olw-item-link')}>
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
                                            </a>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('olw-btn_nav')} style={{ display: 'none' }}></div>
                            </Slider>
                            {/* <div className={cx('button-slide')}>
                                <div className={cx('olw-btn-prev')} onClick={() => slider?.current?.slickPrev()}>
                                    <VscArrowLeft className={cx('icon-slide')} />
                                </div>
                                <div className={cx('olw-btn-next')}>
                                    <VscArrowRight className={cx('icon-slide')} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Home;
