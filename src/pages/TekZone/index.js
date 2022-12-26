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
    const [firtsNew, setFitsNew] = useState([]);
    const [towPost, setTwoAfter] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        getAllSpost();
        getPostNew();
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

    const getPostNew = async () => {
        setLoading(true);
        try {
            const postNew = await postsApi.getFirts();
            setFitsNew(postNew);
            const twoPostNew = await postsApi.getTwoAfter();
            setTwoAfter(twoPostNew);
            setLoading(false);
        } catch (error) {
            console.log('Failed get postnew', error);
            setLoading(false);
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
                        {firtsNew?.map((item, index) => (
                            <li className={cx('list-slider-one', 'c-8')} key={index}>
                                <Link onClick={handleSroll} to={`/tekzonedetail/${item?.id}/${item?.slug}`}>
                                    <div className={cx('size-img-title')}>
                                        <img src={item.image} alt={item.title} />
                                        <h3>{item.title}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <div className={cx('list-slider-two', 'c-4')}>
                            {towPost?.map((item, index) => (
                                <li key={index}>
                                    <Link onClick={handleSroll} to={`/tekzonedetail/${item?.id}/${item?.slug}`}>
                                        <div className={cx('size-img-title')}>
                                            <img src={item.image} alt={item.title} />
                                            <h3 className={cx('title')}>{item.title}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
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
                                            <p>{listPost.updated_at}</p>
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
