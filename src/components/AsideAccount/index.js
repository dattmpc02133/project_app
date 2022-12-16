import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assets/scss/LoginUpdate.module.scss';
import { AiOutlineShoppingCart, AiTwotoneTool } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { UserContext } from '~/Context/UserContext';
import { CartContext } from '~/Context/CartContext';
const cx = classNames.bind(styles);

const AsideAccount = () => {
    const { logout } = useContext(UserContext);
    const { getCart } = useContext(CartContext);

    const navigate = useNavigate();
    const objDataAd = localStorage.getItem('token');
    if (objDataAd == null) {
        navigate('/login');
    }

    const handleLogout = () => {
        logout();
        getCart();
    };
    return (
        <div className={cx('l-3 m-6 c-12')}>
            <div className={cx('layout')}>
                <div className={cx('caterogy')}>
                    <div className={cx('caterogy-name__item')}>
                        <Link to="/uplogin" className={cx('caterogy-name')}>
                            <AiTwotoneTool className={cx('icon_setting', 'icon__cate')} />
                            <h3>Cập nhật tài khoản</h3>
                        </Link>
                    </div>
                    <div className={cx('caterogy-name__item')}>
                        <Link to="/hislogin" className={cx('caterogy-name')}>
                            <AiOutlineShoppingCart className={cx('icon_shopping', 'icon__cate')} />
                            <h3>Các đơn đã đặt </h3>
                        </Link>
                    </div>
                    <div className={cx('caterogy-name__item')}>
                        <div onClick={() => handleLogout()} className={cx('caterogy-name')}>
                            <RiLogoutBoxLine className={cx('icon_shopping', 'icon__cate')} />
                            <h3>Đăng xuất</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsideAccount;
