import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useLocation, Link } from 'react-router-dom';
import styles from '~/assets/scss/TekZone.module.scss';
import '~/assets/scss/Grid.scss';
import images from '~/assets/images';
import Slider from 'react-slick';

import Loading from '~/components/Loading';
import axios from 'axios';
import catePostApi from '~/api/catePostApi';

const cx = classNames.bind(styles);

function TekZone() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const [subCategory, setSubCategory] = useState();
    const [loading, setLoading] = useState(false);
    const { state } = useLocation();
    const CateID = state.CateID;
    const subCategoryId = useMemo(() => {
        const result = subCategory?.filter((item, i) => item?.id === CateID);
        console.log('danh mục số', CateID);
        if (result) {
            return result[0]?.subs;
        }
    }, [CateID, subCategory]);

    useEffect(() => {
        const getCateId = async () => {
            try {
                const subCateId = await catePostApi.getAll();
                setSubCategory(subCateId.data);
            } catch (error) {
                console.log('lỗi danh mục ', error);
            }
        };
        getCateId();
    });

    const handleCateId = ({ id, e }) => {
        console.log('id là', id);
        setLoading(true);
        e.preventDefault();
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('tekzone')}>
                <div className={cx('tekzone__list')}>
                    <ul className={cx('list__slider')}>
                        <li className={cx('list-slider-one', 'c-8')}>
                            <a href="#">
                                <div className={cx('size-img-title')}>
                                    <img src={images.tekzone__1} alt="Slider1" />
                                    <h3>
                                        Cách tải Zing Play trên iOS đơn giản nhất, cho bạn thỏa sức giải trí với cổng
                                        game hàng đầu Việt Nam
                                    </h3>
                                </div>
                            </a>
                        </li>
                        <div className={cx('list-slider-two', 'c-4')}>
                            <li>
                                <a href="#">
                                    <div className={cx('size-img-title')}>
                                        <img src={images.tekzone__2} alt="Slider2" />
                                        <h3 className={cx('title')}>
                                            Cách cài nhạc chuông iPhone remix hay nhất, giúp người dùng cảm thấy thú vị
                                            hơn khi có cuộc gọi đến
                                        </h3>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className={cx('size-img-title')}>
                                        <img src={images.tekzone__3} alt="Slider3" />
                                        <h3 className={cx('title')}>
                                            Tháng 11 deal ngon hết ý cùng MacBook Air, giá cực tốt chỉ từ 22.69 triệu
                                            đồng tại TopZone, nhanh tay tậu ngay
                                        </h3>
                                    </div>
                                </a>
                            </li>
                        </div>
                    </ul>
                </div>

                <div className={cx('list__slider-mb')}>
                    <Slider {...settings}>
                        <li>
                            <a href="">
                                <div className={cx('size-img-title')}>
                                    <img src={images.tekzone__1} alt="Slider2" />
                                    <h3 className={cx('title')}>
                                        Cách tải Zing Play trên iOS đơn giản nhất, cho bạn thỏa sức giải trí với cổng
                                        game hàng đầu Việt Nam
                                    </h3>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <div className={cx('size-img-title')}>
                                    <img src={images.tekzone__2} alt="Slider2" />
                                    <h3 className={cx('title')}>
                                        Cách cài nhạc chuông iPhone remix hay nhất, giúp người dùng cảm thấy thú vị hơn
                                        khi có cuộc gọi đến
                                    </h3>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <div className={cx('size-img-title')}>
                                    <img src={images.tekzone__3} alt="Slider2" />
                                    <h3 className={cx('title')}>
                                        Tháng 11 deal ngon hết ý cùng MacBook Air, giá cực tốt chỉ từ 22.69 triệu đồng
                                        tại TopZone, nhanh tay tậu ngay
                                    </h3>
                                </div>
                            </a>
                        </li>
                    </Slider>
                </div>

                <ul className={cx('list__cate')}>
                    {Array.isArray(subCategoryId)
                        ? subCategoryId.map((list) => (
                              <li key={list.id}>
                                  <Link to="" onClick={() => handleCateId(list.id, list.e)}>
                                      <img src={images.cate_iphone} alt={list.name} />
                                      <h3>{list.name}</h3>
                                  </Link>
                              </li>
                          ))
                        : false}

                    {/* <li>
                        <a href="#">
                            <img src={images.cate_mac} alt="Mac" />
                            <h3>Mac</h3>
                        </a>
                    </li> */}
                </ul>

                <div className={cx('newsest__list')}>
                    <div className={cx('title-new')}>
                        <h1>Mới nhất</h1>
                    </div>
                    <div className={cx('newsest')}>
                        {/* {Array.isArray(posts)
                            ? posts.map((listPost) => (
                                  <div className={cx('news-item')} key={listPost.id}>
                                      <Link to={'tekzonedetail'}>
                                          <div className={cx('img-item')}>
                                              <img src={images.tekitem} alt={listPost.title} />
                                          </div>
                                          <div className={cx('title-item')}>
                                              <h3>{listPost.title}</h3>
                                              <div className={cx('time-post')}>
                                                  <p>1 giờ trước</p>
                                              </div>
                                          </div>
                                      </Link>
                                  </div>
                              ))
                            : false} */}

                        {/* <div className={cx('news-item')}>
                            <a href="#">
                                <div className={cx('img-item')}>
                                    <img src={images.tekitem} alt="Anh post" />
                                </div>
                                <div className={cx('title-item')}>
                                    <h3>
                                        Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn giá
                                        hời, rinh ngay về nhà thôi kẻo lỡ
                                    </h3>
                                </div>
                                <div className={cx('time-post')}>
                                    <p>1 giờ trước</p>
                                </div>
                            </a>
                        </div>

                        <div className={cx('news-item')}>
                            <a href="#">
                                <div className={cx('img-item')}>
                                    <img src={images.tekitem} alt="Anh post" />
                                </div>
                                <div className={cx('title-item')}>
                                    <h3>
                                        Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn giá
                                        hời, rinh ngay về nhà thôi kẻo lỡ
                                    </h3>

                                    <div className={cx('time-post')}>
                                        <p>1 giờ trước</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className={cx('news-item')}>
                            <a href="#">
                                <div className={cx('img-item')}>
                                    <img src={images.tekitem} alt="Anh post" />
                                </div>
                                <div className={cx('title-item')}>
                                    <h3>
                                        Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn giá
                                        hời, rinh ngay về nhà thôi kẻo lỡ
                                    </h3>

                                    <div className={cx('time-post')}>
                                        <p>1 giờ trước</p>
                                    </div>
                                </div>
                            </a>
                        </div> */}

                        <div className={cx('viewmore-news')}>
                            <a href="#">Xem thêm</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TekZone;
