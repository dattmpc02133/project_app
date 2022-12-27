import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { FiFacebook } from 'react-icons/fi';
import { BsLink45Deg, BsEye } from 'react-icons/bs';
import styles from '../../assets/scss/TekZoneDetail.module.scss';
import images from '../../assets/images';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import postsApi from '../../api/postApi';
import catePostApi from '../../api/catePostApi';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);
function TekZoneDetail() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [title, setTitle] = useState([]);
    const [content, setcontent] = useState([]);
    const [user, setUser] = useState([]);
    const [views, setViews] = useState([]);
    const [idCatePost, setIdCatePost] = useState([]);
    const [allCatePost, setAllCatePost] = useState([]);
    const [catePostAll, setCatePostAll] = useState([]);
    const [relateTo, setRelateTo] = useState([]);
    const [time, setTime] = useState([]);
    useEffect(() => {
        const getById = async () => {
            setLoading(true);
            try {
                const byId = await postsApi.getByClient(params.id);
                setTitle(byId.data.title);
                setcontent(byId.data.content_post);
                setUser(byId.data.author);
                setViews(byId.data.views);
                setIdCatePost(byId.data.subcategory_id);
                setTime(byId.data.created_at);
                setLoading(false);
            } catch (error) {
                console.log('lỗi lấy id bài viết', error);
                setLoading(false);
            }
        };
        getById();
    }, [params.id]);

    useEffect(() => {
        const getByIdPost = async () => {
            setLoading(true);
            try {
                const byIdCatePost = await catePostApi.getByIdCatePost(idCatePost);
                setRelateTo(byIdCatePost.data);
                setLoading(false);
            } catch (error) {
                console.log('Lỗi lấy ib cate post', error);
                setLoading(false);
            }
        };
        getByIdPost();
    }, [idCatePost]);

    const handleSroll = () =>
        window.scroll({
            top: 0,
            left: 100,
            behavior: 'smooth',
        });

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('tekZoneDetail')}>
                <div className={cx('tekzone-link')}>
                    {/* <span className={cx('link')}>
                        <a href="#">TekZone</a>
                    </span>
                    <span className={cx('link')}>
                        <a href="#">iPhone</a>
                    </span>
                    <span>
                        <a href="#">Guides</a>
                    </span> */}
                </div>

                <div className={cx('detail-contents')}>
                    <div className={cx('detail-title-user')}>
                        <div className={cx('detail-title')}>
                            <h2 className={cx('title')}>{title}</h2>
                        </div>

                        <div className={cx('detail-user')}>
                            <span>{user}</span>
                            <span className={cx('time')}>{time}</span>
                        </div>
                    </div>

                    <div className={cx('detail-content')}>
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                        <div className={cx('detail-info')}>
                            <span className={cx('info-editor')}>Xét duyệt bởi: {user}</span>
                            <div className={cx('share-viewtek')}>
                                <span className={cx('info-share')}>
                                    Chia sẻ:
                                    <Link to="">
                                        <FiFacebook className={cx('icon-info')} />
                                    </Link>
                                    <Link to="">
                                        <BsLink45Deg className={cx('icon-info')} />
                                    </Link>
                                </span>
                                <span className={cx('info-view')}>
                                    <BsEye className={cx('icon-info')} />
                                    Lượt xem: {views}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('related-posts')}>
                    <div className={cx('posts-title')}>
                        <h3> Bài viết liên quan</h3>
                    </div>
                    <div className={cx('slider')}>
                        <Slider {...settings}>
                            {relateTo?.post?.map((item, index) => (
                                <div className={cx('item-posts')} key={index}>
                                    <Link onClick={handleSroll} to={`/tekzonedetail/${item.id}/${item.slug}`}>
                                        <div className={cx('img-slider')}>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className={cx('title-posts')}>
                                            <h3>{item.title}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className={cx('posts-mobile')}>
                    <div className={cx('newsest__list')}>
                        <div className={cx('title-new')}>
                            <h2> Bài viết liên quan</h2>
                        </div>
                        <div className={cx('newsest')}>
                            {relateTo?.post?.map((items, index) => (
                                <div className={cx('news-item')} key={index}>
                                    <Link onClick={handleSroll} to={`/tekzonedetail/${items.id}/${items?.slug}`}>
                                        <div className={cx('img-item')}>
                                            <img src={items.image} alt={items.title} />
                                        </div>
                                        <div className={cx('title-item')}>
                                            <h3>{items.title}</h3>

                                            <div className={cx('time-post')}>
                                                <p>11/11</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TekZoneDetail;
