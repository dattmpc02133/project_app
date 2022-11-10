import Header from '~/components/header';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/LayoutHome.module.scss';
import Footer from '~/components/Footer';

const cx = classNames.bind(style);
function LayoutView() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default LayoutView;
