import classNames from 'classnames/bind';
import { BiCast, BiChevronDown, BiCollection, BiCreditCardFront, BiIntersect } from 'react-icons/bi';
import { TiSocialInstagram, TiHomeOutline, TiLocationArrowOutline, TiPhoneOutline } from 'react-icons/ti';
import { RiAncientGateLine, RiBankLine, RiCalendarEventLine } from 'react-icons/ri';
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
    const [openColor, setOpenColor] = useState(false);
    const [openWareHouse, setOpenWareHouse] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [openBrand, setOpenBrand] = useState(false);
    const [openStore, setOpenStore] = useState(false);
    const [openImportSlip, setOpenImportSlip] = useState(false);
    const [openSubsPost, setOpenSubsPost] = useState(false);

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
                    {/* brand */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>THƯƠNG HIỆU</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Chỉnh sửa thương hiệu</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenBrand(!openBrand);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Thương hiệu </span>
                                    <BiChevronDown
                                        className={
                                            openBrand
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openBrand
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="brand/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="brand/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh sách
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* end */}
                    {/* Category */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>DANH MỤC</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Chỉnh sửa danh mục</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenCategories(!openCategories);
                                    }}
                                >
                                    <BiCast className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh mục </span>
                                    <BiChevronDown
                                        className={
                                            openCategories
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openCategories
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="categories/add"
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
                        </ul>
                    </div>
                    {/* end */}
                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Tin tức</span>
                            <p className={cx('navbar__content--heading-subtitle')}> tin tức</p>
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
                                        to="categories/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="categories/list"
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
                                        setOpenSubsPost(!openSubsPost);
                                    }}
                                >
                                    <BiCreditCardFront className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Danh mục chi tiết</span>
                                    <BiChevronDown
                                        className={
                                            openSubsPost
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openSubsPost
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="subs/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>

                                    <NavLink
                                        to="subs/list"
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
                                    <span className={cx('navbar__content--text')}>Bài Viết</span>
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
                                        to="product/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="product/list"
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
                                        setOpenColor(!openColor);
                                    }}
                                >
                                    <TiSocialInstagram className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Màu sắc sản phẩm</span>
                                    <BiChevronDown
                                        className={
                                            openColor
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openColor
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="color/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="color/list"
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
                            <span className={cx('navbar__content--heading-title')}>Cửa hàng</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Danh sách toàn bộ cửa hàng</p>
                        </div>
                        <ul className={cx('navbar__content--list')}>
                            <li className={cx('navbar__content--item')}>
                                <p
                                    className={cx('navbar__content--link')}
                                    onClick={() => {
                                        setOpenWareHouse(!openWareHouse);
                                    }}
                                >
                                    <RiBankLine className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Kho sản phẩm</span>
                                    <BiChevronDown
                                        className={
                                            openWareHouse
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openWareHouse
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="warehouse/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="warehouse/list"
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
                                        setOpenStore(!openStore);
                                    }}
                                >
                                    <RiAncientGateLine className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Cửa hàng</span>
                                    <BiChevronDown
                                        className={
                                            openStore
                                                ? cx('navbar__content--icon--arrow', 'open')
                                                : cx('navbar__content--icon--arrow')
                                        }
                                    />
                                </p>
                                <div
                                    className={
                                        openStore
                                            ? cx('navbar__content--dropdown', 'open')
                                            : cx('navbar__content--dropdown')
                                    }
                                >
                                    <NavLink
                                        to="store/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="store/list"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Danh sách
                                    </NavLink>
                                </div>
                            </li>

                            <li className={cx('navbar__content--item')}>
                                <NavLink to="importslip/add" className={cx('navbar__content--link')}>
                                    <RiCalendarEventLine className={cx('navbar__content--icon')} />
                                    <span className={cx('navbar__content--text')}>Phiếu nhập hàng</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('navbar__content--block')}>
                        <div className={cx('navbar__content--heading')}>
                            <span className={cx('navbar__content--heading-title')}>Footer</span>
                            <p className={cx('navbar__content--heading-subtitle')}>Chỉnh sửa footer</p>
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
                                    <span className={cx('navbar__content--text')}>Danh mục footer</span>
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
                                        to="footer/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="footer/list"
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
                                    <span className={cx('navbar__content--text')}>Nội quy và chính sách</span>
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
                                        to="footer/content/add"
                                        className={cx('navbar__content--link', 'navbar__content--link-dd')}
                                    >
                                        Thêm mới
                                    </NavLink>
                                    <NavLink
                                        to="footer/content/list"
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
