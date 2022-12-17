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

function TekZoneCate() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // const { state } = useLocation();
    // const data = state.data;
    // console.log('data', data);
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [allCatePost, setAllCatePost] = useState([]);
    const [catePostId, setCatePostId] = useState('');

    useEffect(() => {
        const getAllCatePost = async () => {
            setLoading(true);
            try {
                const allCatePost = await catePostApi.getAll();
                setAllCatePost(allCatePost.data.data);
                setLoading(false);
            } catch (error) {
                console.log('lỗi lây danh mục', error);
                setLoading(false);
            }
        };
        getAllCatePost();
    }, []);

    useEffect(() => {
        const getByIdPost = async () => {
            setLoading(true);
            try {
                const byIdCatePost = await catePostApi.getByIdCatePost(params.id);
                setLoading(false);
                setCatePostId(byIdCatePost.data);
            } catch (error) {
                console.log('Lỗi lấy ib cate post', error);
                setLoading(false);
            }
        };
        getByIdPost();
    }, [params.id]);
    const handleSroll = () =>
        window.scroll({
            top: 0,
            left: 100,
            behavior: 'smooth',
        });
    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('tekzone')}>
                <div className={cx('tekzone__list')}>
                    <ul className={cx('list__slider')}>
                        <li className={cx('list-slider-one', 'c-8')}>
                            <a href="">
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
                        {catePostId?.post?.map((item, index) => (
                            <li key={index}>
                                <Link onClick={handleSroll} to={`/tekzonedetail/${item.id}/${item?.slug}`}>
                                    <div className={cx('size-img-title')}>
                                        <img src={item.image} alt={item.title} />
                                        <h3 className={cx('title')}>{item.title}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </Slider>
                </div>

                <ul className={cx('list__cate')}>
                    {allCatePost?.map((item) =>
                        item?.subs.map((items, index) => (
                            <li key={index}>
                                <Link onClick={handleSroll} to={`/tekzonecate/${items.id}/${items.slug}`}>
                                    <h3>{items?.name}</h3>
                                </Link>
                            </li>
                        )),
                    )}
                </ul>

                <div className={cx('newsest__list')}>
                    <div className={cx('title-new')}>
                        <h2>{catePostId.name}</h2>
                    </div>
                    <div className={cx('newsest')}>
                        {catePostId?.post?.map((listPost, index) => (
                            <div className={cx('news-item')} key={index}>
                                <Link onClick={handleSroll} to={`/tekzonedetail/${listPost?.id}/${listPost?.slug}`}>
                                    <div className={cx('img-item', 'c-4')}>
                                        <img className={cx('img-post')} src={listPost.image} alt={listPost.title} />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>{listPost.title}</h3>
                                        <div className={cx('time-post')}>
                                            <p>1 giờ trước</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}

                        {/* {allSpost?.map((listPost) => (
                            <div className={cx('news-item')} key={listPost.id}>
                                <Link to={`/tekzonedetail/${listPost.id}`}>
                                    <div className={cx('img-item', 'c-4')}>
                                        <img className={cx('img-post')} src={listPost.image} alt={listPost.title} />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>{listPost.title}</h3>
                                        <div className={cx('time-post')}>
                                            <p>1 giờ trước</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))} */}

                        <div className={cx('viewmore-news')}>
                            <span>Xem thêm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TekZoneCate;
