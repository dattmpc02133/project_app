import { VscDebugLineByLine, VscSettingsGear } from 'react-icons/vsc';
import { GrLogout } from 'react-icons/gr';
import style from '~/assets/scss/admin/Header.module.scss';
import classNames from 'classnames/bind';
import loginApi from '~/api/loginApi';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/Context/UserContext';
import { useContext, useEffect, useState } from 'react';
import Loading from '~/components/Loading';

const cx = classNames.bind(style);
const Header = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        const logout = async () => {
            try {
                const result = await loginApi.logout();
                localStorage.removeItem('token');
                localStorage.removeItem('dataAd');
                navigate('/login-admin');
            } catch (error) {
                // console.log('Failed to log out', error);
            }
        };

        logout();
    };

    const getUser = async () => {
        setLoading(true);
        try {
            const resultUser = await loginApi.getUser();
            console.log(resultUser);
            setLoading(false);
        } catch (error) {
            // navigate('/login-admin');
            console.log('Fail to login', error);
            setLoading(false);
        }
    };

    // getUser();
    return (
        <div className={cx('wrapper')}>
            {loading && <Loading />}
            <div className={cx('header')}>
                <div className={cx('header__icon--show')}>
                    <VscDebugLineByLine className={cx('icon__header')} />
                </div>
                <div className={cx('header__list--icon')}>
                    <div className={cx('header__icon--item')} onClick={(e) => handleLogout(e)}>
                        <GrLogout className={cx('icon__header')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
