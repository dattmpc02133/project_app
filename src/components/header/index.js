import classNames from 'classnames/bind';
import images from '../../assets/images';
import styles from '~/assets/scss/header.module.scss';
import { CiSearch } from 'react-icons/ci';
import { VscChromeClose, VscListSelection } from 'react-icons/vsc';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Header(props) {
    const { ItemMenu } = props;
    const [search, setSearch] = useState();
    const [open, setOpen] = useState();
    const handleSearch = () => {
        setSearch(!search);
    };
    const handleNavBarClick = () => {
        setOpen(!open);
    };
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
                    <a href="#">
                        <img className={cx('personal-logo')} src={images.logo} alt="Logo" />
                    </a>
                    <a href="#">
                        <img className={cx('personal_auth-logo')} src={images.logo2} alt="Logo" />
                    </a>
                </div>
                {/* Menu */}
                <ul className={!open ? cx('menu') : cx('SubMenu-Item')}>
                    {ItemMenu.map((data, index) => (
                        <li className={cx('menu-item')} key={index}>
                            <Link to={data.to} className={cx('menu-link')}>
                                <span>{data.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* navbar mobile */}

                {/* search + cart */}
                <div className={cx('search-cart')}>
                    <div className={cx('search-product')} onClick={handleSearch}>
                        <CiSearch className={cx('icon-search')} />
                    </div>
                    <div className={cx('cart-product')}>{/* <CiShoppingBasket className={cx('icon-cart')} /> */}</div>
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
        </div>
    );
}

export default Header;
