import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from '~/assets/scss/iPhone.module.scss';
const cx = classNames.bind(style);
function Iphone() {
    return (
        <div className={cx('wrapper')}>
            <Outlet />
        </div>
    );
}

export default Iphone;
