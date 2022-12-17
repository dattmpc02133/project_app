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
import Pagination from '~/components/Pagination';
const cx = classNames.bind(styles);

function TekZone() {
    const { state } = useLocation();
    const data = state.data;
    const [dataCategory, setDataCategory] = useState();
    const [loading, setLoading] = useState(false);
    const [allSpost, setAllpost] = useState([]);
    const [pageSpost, setPageSpost] = useState([]);
    const [page, setPage] = useState(1);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        getAllSpost();
    }, []);

    const getAllSpost = async (params) => {
        try {
            const allSposts = await postsApi.getAllClient(params);
            setAllpost(allSposts.data);
            setPageSpost(allSposts.paginator);
        } catch (error) {
            console.log('Failed all POst', error);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getAllSpost(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageSpost?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getAllSpost(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getAllSpost(`?page=${page}`);
    };

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
                            <a href="#">
                                <div className={cx('size-img-title')}>
                                    <img src={images.tekzone__1} alt="Slider1" />
                                    <h3>
                                        Cách tải Zing Play trên iOS đơn giản nhất, cho bạn thỏa sức giải trí với cổng
                                        game hàng đầu Việt Namz
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
                        {allSpost.map((post, index) => (
                            <li key={index}>
                                <Link onClick={handleSroll} to={`/tekzonedetail/${post?.id}/${post?.slug}`}>
                                    <div className={cx('size-img-title')}>
                                        <img src={post.image} alt={post.title} />
                                        <h3 className={cx('title')}>{post.title}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        {/* 
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
                        </li> */}
                    </Slider>
                </div>

                <ul className={cx('list__cate')}>
                    {data.subs.map((list, index) => (
                        <li key={index}>
                            <Link onClick={handleSroll} to={`/tekzonecate/${list?.id}/${list?.slug}`}>
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
                        {allSpost.map((listPost, index) => (
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
                        <div className={cx('viewmore-news')}>
                            <Pagination
                                curentPage={page}
                                totalPages={pageSpost?.totalPages}
                                handlePrevPage={handlePrevPage}
                                handleChangePage={handleChangePage}
                                handleNextPage={handleNextPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TekZone;
