import { Outlet } from 'react-router-dom';

import style from '~/assets/scss/admin/LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import Header from '~/components/admin/Header';
import Navbar from '~/components/admin/Navbar';

const cx = classNames.bind(style);
const LayoutAdmin = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content__wrapper')}>
                <Header />
                <main className={cx('content')}>
                    <Outlet />
                    {/* <h1>Main</h1> */}
                </main>
            </div>
            <Navbar />
        </div>
    );
};

export default LayoutAdmin;
