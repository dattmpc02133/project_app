import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useLocation, Link, useParams } from 'react-router-dom';
import styles from '~/assets/scss/TekZone.module.scss';
import '~/assets/scss/Grid.scss';
import images from '~/assets/images';
import Slider from 'react-slick';
import Loading from '~/components/Loading';
import catePostApi from '~/api/catePostApi';
import postsApi from '../../api/postApi';

const cx = classNames.bind(styles);

function TekZone() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const { state } = useLocation();
    const data = state.data;
    console.log('data', data);
    const [dataCategory, setDataCategory] = useState();
    const [loading, setLoading] = useState(false);
    const [allSpost, setAllpost] = useState('');

    useEffect(() => {
        const getAllSpost = async () => {
            const allSposts = await postsApi.getAllClient();
            setAllpost(allSposts.data);
            console.log('tin tức', allSposts.data.title);
        };
        getAllSpost();
    }, []);

    const handleCateId = (list) => {
        console.log('danh mục', list);
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
                    {data.subs.map((list, index) => (
                        <li key={index}>
                            <Link to={`/tekzonecate/${list.id}/${list.slug}`}>
                                <h3>{list?.name}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={cx('newsest__list')}>
                    <div className={cx('title-new')}>
                        <h2>Mới nhất</h2>
                    </div>
                    <div className={cx('newsest')}>
                        {Array.isArray(allSpost)
                            ? allSpost.map((listPost) => (
                                  <div className={cx('news-item')} key={listPost.id}>
                                      <Link to={`/tekzonedetail/${listPost?.id}`}>
                                          <div className={cx('img-item', 'c-4')}>
                                              <img
                                                  className={cx('img-post')}
                                                  src={listPost.image}
                                                  alt={listPost.title}
                                              />
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
                            : false}

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
