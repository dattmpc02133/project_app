import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { VscChromeClose, VscListSelection } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import cateProductApi from '~/api/cateProductApi';
import styles from '~/assets/scss/header.module.scss';
import images from '../../assets/images';

import { CartContext } from '~/Context/CartContext';
import { UserContext } from '~/Context/UserContext';
import searchApi from '../../api/searchApi';

const cx = classNames.bind(styles);
function Header() {
    const [search, setSearch] = useState();
    const [categories, setCategories] = useState();
    const [open, setOpen] = useState();
    const [cartNum, setCartNum] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [findProduct, setFindProduct] = useState();

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    //
    const handleSearch = () => {
        setSearch(!search);
    };
    const handleNavBarClick = () => {
        setOpen(!open);
    };

    // Global State
    const { listCart, getCart, listCartLocal } = useContext(CartContext);
    const { user, name } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            // getCart();
            setCartNum(listCart?.details?.length);
        } else {
            setCartNum(listCartLocal?.length);
        }
    }, [listCart, listCartLocal, user]);

    useEffect(() => {
        getCart();
    }, [user]);

    useEffect(() => {
        const fetchHeaderCategory = async (id) => {
            try {
                const headerCategory = await cateProductApi.getAll();
                const ListCategoryData = headerCategory?.data;
                // console.log('cateOnle', headerCategory.data);
                setCategories(ListCategoryData);
            } catch (error) {
                console.log('Failed to fetch Categories: ', error);
            }
        };
        const fetchSearchResults = async () => {
            const ResultListSearch = await searchApi.searchItem(searchTerm);
            if (searchTerm.length > 3) {
                setFindProduct(ResultListSearch.data);
            } else if (searchTerm.length === 0) {
                setFindProduct([]);
            }
        };
        fetchHeaderCategory();
        fetchSearchResults();
    }, [searchTerm]);
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

                <form className={cx('search-header')}>
                    <div className={cx('search-input')}>
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            type="text"
                            placeholder="Nhập Tên sản phẩm muốn tìm kiếm ..."
                            spellCheck="false"
                        />
                        <div onClick={(e) => setSearchTerm('')}>&times;</div>
                    </div>
                    <div className={cx('search-btn')}>
                        <button type="submit">
                            <CiSearch className={cx('search-icon')} />
                        </button>
                    </div>
                    {/* {Array.isArray(findProduct != null ? findProduct )} */}
                    <div className={searchTerm.length ? cx('filter_product-list') : cx('filter_product-list-search')}>
                        {findProduct?.map((findPrd, index) => (
                            <div className={cx('product_suggest')} index={index}>
                                <Link
                                    onClick={(e) => setSearchTerm('')}
                                    to={`/productdetail?id=${findPrd.id}&slug=${findPrd.slug}`}
                                >
                                    <img src={findPrd.url_image} className={cx('product_item-img')} />
                                    <div className={cx('product_item-info')}>
                                        <h3>
                                            {findPrd.product_name} {findPrd.variant_name}GB
                                        </h3>
                                        <p>Màu: {findPrd.color_name}</p>
                                        <strong>{findPrd.price}₫</strong>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </form>
                {/* search + cart */}
                <div className={cx('search-cart')}>
                    <div className={user != undefined ? cx('search-product', 'name-user') : cx('search-product')}>
                        <Link to="login" className={user != undefined ? cx('name-block') : ''}>
                            {user != undefined && <p>{user.name}</p>}
                            <BiUserCircle className={cx('icon-search')} />
                        </Link>
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
                        <Link
                            to={`${data.slug}?id=${data.id}`}
                            state={{ id: data.id, data }}
                            className={cx('menu-link')}
                            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        >
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
