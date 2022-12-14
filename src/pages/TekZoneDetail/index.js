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

const cx = classNames.bind(styles);
function TekZoneDetail() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const params = useParams();
    const [title, setTitle] = useState([]);
    const [content, setcontent] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getById = async () => {
            try {
                const byId = await postsApi.getByClient(params.id);
                setTitle(byId.data.title);
                setcontent(byId.data.content_post);
                setUser(byId.data.author);
            } catch (error) {
                console.log('lỗi lấy id bài viết', error);
            }
        };
        getById();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tekZoneDetail')}>
                <div className={cx('tekzone-link')}>
                    <span className={cx('link')}>
                        <a href="#">TekZone</a>
                    </span>
                    <span className={cx('link')}>
                        <a href="#">iPhone</a>
                    </span>
                    <span>
                        <a href="#">Guides</a>
                    </span>
                </div>

                <div className={cx('detail-contents')}>
                    <div className={cx('detail-title-user')}>
                        <div className={cx('detail-title')}>
                            <h1>{title}</h1>
                        </div>

                        <div className={cx('detail-user')}>
                            <span>{user}</span>
                            <span className={cx('time')}>9 giờ trước</span>
                        </div>
                    </div>

                    <div className={cx('detail-content')}>
                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                        <div className={cx('detail-info')}>
                            <span className={cx('info-editor')}>Xét duyệt bởi: {user}</span>
                            <div className={cx('share-viewtek')}>
                                <span className={cx('info-share')}>
                                    Chia sẻ:
                                    <Link To="">
                                        <FiFacebook className={cx('icon-info')} />
                                    </Link>
                                    <Link to="">
                                        <BsLink45Deg className={cx('icon-info')} />
                                    </Link>
                                </span>
                                <span className={cx('info-view')}>
                                    <BsEye className={cx('icon-info')} />4 Lượt xem
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('related-posts')}>
                    <div className={cx('posts-title')}>
                        <h3>bài viết liên quan</h3>
                    </div>
                    <div className={cx('slider')}>
                        <Slider {...settings}>
                            {/* <div className={cx('posts-row')}> */}
                            <div className={cx('item-posts')}>
                                <div className={cx('img-slider')}>
                                    <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                </div>
                                <div className={cx('title-posts')}>
                                    <h3>
                                        Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo hành
                                        chính xác nhất cho iPhone của mình
                                    </h3>
                                </div>

                                <span>10/11</span>
                            </div>

                            <div className={cx('item-posts')}>
                                <div className={cx('img-slider')}>
                                    <img src="" alt="Ảnh lổi slider" />
                                </div>
                                <div className={cx('title-posts')}>
                                    <h3>
                                        Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo hành
                                        chính xác nhất cho iPhone của mình
                                    </h3>
                                </div>

                                <span>10/11</span>
                            </div>

                            <div className={cx('item-posts')}>
                                <div className={cx('img-slider')}>
                                    <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                </div>
                                <div className={cx('title-posts')}>
                                    <h3>
                                        Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo hành
                                        chính xác nhất cho iPhone của mình
                                    </h3>
                                </div>

                                <span>10/11</span>
                            </div>

                            <div className={cx('item-posts')}>
                                <div className={cx('img-slider')}>
                                    <img src={images.tekzone__1} alt="Ảnh lổi slider" />
                                </div>
                                <div className={cx('title-posts')}>
                                    <h3>
                                        Chỉ với vài bước cơ bản sau đây bạn đã có thể kiểm tra được thời hạn bảo hành
                                        chính xác nhất cho iPhone của mình
                                    </h3>
                                </div>

                                <span>10/11</span>
                            </div>
                            {/* </div> */}
                        </Slider>
                    </div>
                </div>

                <div className={cx('posts-mobile')}>
                    <div className={cx('newsest__list')}>
                        <div className={cx('title-new')}>
                            <h1>Bài viết liên quan</h1>
                        </div>
                        <div className={cx('newsest')}>
                            <div className={cx('news-item')}>
                                <Link to={'tekzonedetail'}>
                                    <div className={cx('img-item')}>
                                        <img src={images.tekitem} alt="Anh post" />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>

                                        <div className={cx('time-post')}>
                                            <p>11/11</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className={cx('news-item')}>
                                <a href="#">
                                    <div className={cx('img-item')}>
                                        <img src={images.tekitem} alt="Anh post" />
                                    </div>
                                    <div className={cx('title-item')}>
                                        <h3>
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>
                                    </div>
                                    <div className={cx('time-post')}>
                                        <p>11/11</p>
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
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>

                                        <div className={cx('time-post')}>
                                            <p>11/11</p>
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
                                            Săn sale cuối tuần: TopZone giảm mạnh tay với AirPods đến tận 30%, hàng xịn
                                            giá hời, rinh ngay về nhà thôi kẻo lỡ
                                        </h3>

                                        <div className={cx('time-post')}>
                                            <p>11/11</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TekZoneDetail;
