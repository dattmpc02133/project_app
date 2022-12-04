import classNames from 'classnames/bind';
import images from '../../assets/images';
import styles from '~/assets/scss/header.module.scss';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { VscChromeClose, VscListSelection } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cateProductApi from '~/api/cateProductApi';

import cartApi from '~/api/cartApi';

const cx = classNames.bind(styles);
function Header() {
    const [search, setSearch] = useState();
    const [categories, setCategories] = useState();
    const [open, setOpen] = useState();
    const [cartNum, setCartNum] = useState();
    const navigate = useNavigate();
    const handleSearch = () => {
        setSearch(!search);
    };
    const handleNavBarClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        const fetchHeaderCategory = async (id) => {
            try {
                const headerCategory = await cateProductApi.getAll();
                const ListCategoryData = headerCategory?.data;
                setCategories(ListCategoryData);

                const resultListCart = await cartApi.getAll();
                setCartNum(resultListCart?.data?.details?.length);
            } catch (error) {
                console.log('Failed to fetch Categories: ', error);
            }
        };
        fetchHeaderCategory();
    }, []);

    return (
        <div className={cx('header')}>
            <div className={!search ? cx('head') : cx('head', 'active-search')}>
                <div className={cx('MenuBarIcon')} onClick={handleNavBarClick}>
                    {!open ? (
                        <VscListSelection className={cx('icon-btnBar')} />
                    ) : (
                        <VscChromeClose className={cx('icon-btnBar')} />
                    )}
                </div>
                {/* Logo */}
                <div className={cx('logo-personal')}>
                    <a href="/">
                        <img className={cx('personal-logo')} src={images.logotest} alt="Logo" />
                    </a>
                </div>

                <div className={cx('search-header')}>
                    <div className={cx('search-input')}>
                        <input type="text" placeholder="Nhập Tên sản phẩm muốn tìm kiếm ..." spellCheck="false" />
                        <div>&times;</div>
                    </div>
                    <div className={cx('search-btn')}>
                        <button type="submit">
                            <CiSearch className={cx('search-icon')} />
                        </button>
                    </div>
                </div>

                {/* search + cart */}
                <div className={cx('search-cart')}>
                    <div className={cx('search-product')} onClick={handleSearch}>
                        <CiSearch className={cx('icon-search')} />
                    </div>
                    <div className={cx('cart-product')}>
                        {cartNum > 0 && cartNum != undefined && <span className={cx('num-cart')}>{cartNum}</span>}

                        <Link to="cart">
                            <AiOutlineShoppingCart className={cx('icon-cart')} />
                        </Link>
                    </div>
                </div>
                <form className={!search ? cx('form-search') : cx('form-search', 'active')}>
                    <div className={cx('click-search')}>
                        <CiSearch className={cx('icon-search')} />
                        <input type="text" placeholder="Tìm kiếm sản phẩm" />
                        <div className={cx('icon-search')} onClick={handleSearch}>
                            &times;
                        </div>
                    </div>
                </form>
            </div>
            <div onClick={handleSearch} className={!search ? cx('bg-bg') : cx('bg-bg', 'active')}></div>

            <ul className={!open ? cx('menu', 'menu-new') : cx('SubMenu-Item')}>
                {categories?.map((data, index) => (
                    <li className={cx('menu-item')} key={index}>
                        <Link to={`${data.slug}?id=${data.id}`} state={{ id: data.id }} className={cx('menu-link')}>
                            <span>{data.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Menu */}

            {/* navbar mobile */}
        </div>
    );
}

export default Header;
