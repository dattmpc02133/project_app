import classNames from 'classnames/bind';
import styles from '../../assets/scss/Insurance.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import footerApi from '../../api/footerApi';
const cx = classNames.bind(styles);

function Insurance() {
    const { state } = useLocation();
    const contentId = state.items;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <div className={cx('wrapper-title')}>
                    <h1>{contentId.title}</h1>
                </div>
                <div className={cx('wrapper-content')}>
                    <p dangerouslySetInnerHTML={{ __html: contentId.content }}></p>
                </div>
            </div>
        </div>
    );
}
export default Insurance;
