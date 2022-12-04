import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/LayoutDetailFooter.module.scss';
import Aside from '../../components/AsideFooter';
const cx = classNames.bind(style);
function LayoutDetailFooter() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-content', 'row')}>
                <div className={cx('wrapper-tabs', 'c-3')}>
                    <Aside />
                </div>
                <main className={cx('c-9')}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default LayoutDetailFooter;
