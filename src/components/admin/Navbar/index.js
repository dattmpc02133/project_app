import classNames from 'classnames/bind';
import { BiCast, BiChevronDown, BiCollection, BiCreditCardFront, BiIntersect } from 'react-icons/bi';
import { TiHomeOutline, TiLocationArrowOutline, TiPhoneOutline } from 'react-icons/ti';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import images from '~/assets/images';
import style from '~/assets/scss/admin/Navbar.module.scss';
import Loading from '~/components/Loading';
import './style.css';

const cx = classNames.bind(style);
const Navbar = () => {
    const [openCatePost, setOpenCatePost] = useState(false);
    const [openPost, setOpenPost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openCateProduct, setOpenCateProduct] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('navbar')}>
                <div className={cx('navbar__top')}>
                    <div className={cx('navbar__logo')}>
                        <img className={cx('logo__img')} src={images.logotest} />
                    </div>
                    <div className={cx('navbar__user')}>
                        <img className={cx('img__user')} src={images.user1} />
                        <div className={cx('info__user')}>
                            <span className={cx('info__user--name')}>Trần Hoàng Khôi</span>
                            <span className={cx('info__user--email')}>Khoithpc02042@fpt.edu.vn</span>
                        </div>
                    </div>
                </div>

                <div className={cx('navbar__content')}>
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Giao diện</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Chỉnh sửa cấu trúc giao diện</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <NavLink
                                    // style={(isActive) => ({ color: isActive ? 'green' : 'blue' })}
                                    to="layout"
                                    className={cx('navbar__content--link')}
                                >
                                    <TiHomeOutline className={cx('navbar__content--icon')} />
                                    Trang chủ
                                </NavLink>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <NavLink to="phone" className={cx('navbar__content--link')}>
                                    <TiPhoneOutline className={cx('navbar__content--icon')} />
                                    Số điện thoại
                                </NavLink>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <NavLink to="location" className={cx('navbar__content--link')}>
                                    <TiLocationArrowOutline className={cx('navbar__content--icon')} />
                                    Địa chỉ cửa hàng
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Tin tức</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Chỉnh sửa tin tức</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCatePost(!openCatePost);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh mục tin tức</span>
                                    <BiChevronDown
                                        className={
                                            openCatePost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCatePost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="catepost/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="catepost/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh sách
                                    </NavLink>
                                </div>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenPost(!openPost);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Bảng tin</span>
                                    <BiChevronDown
                                        className={
                                            openPost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openPost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="post/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="post/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh sách
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Sản Phẩm</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Chỉnh sửa thông tin sản phẩm</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCateProduct(!openCateProduct);
                                    }}
                                >
                                    <BiCollection className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh mục sản phẩm</span>
                                    <BiChevronDown
                                        className={
                                            openCateProduct
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCateProduct
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="catepost/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="catepost/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh sách
                                    </NavLink>
                                </div>
                            </li>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenProduct(!openProduct);
                                    }}
                                >
                                    <BiIntersect className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Sản phẩm</span>
                                    <BiChevronDown
                                        className={
                                            openProduct
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openProduct
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="post/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="post/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh sách
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;