import { VscDebugLineByLine, VscSettingsGear } from 'react-icons/vsc';

import style from '~/assets/scss/admin/Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
const Header = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header__icon--show')}>
                    <VscDebugLineByLine className={cx('icon__header')} />
                </div>
                <div className={cx('header__list--icon')}>
                    <div className={cx('header__icon--item')}>
                        <VscSettingsGear className={cx('icon__header')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
