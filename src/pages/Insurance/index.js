import classNames from 'classnames/bind';
import styles from '../../assets/scss/Insurance.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Insurance() {
    const { state } = useLocation();
    console.log(state);
    const contentId = state.content;
    console.log(contentId);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <div className={cx('wrapper-title')}>
                    <h1>{contentId.title}</h1>
                </div>
                <div className={cx('wrapper-content')}>
                    <p>{contentId.content}</p>
                </div>
            </div>
        </div>
    );
}

export default Insurance;
