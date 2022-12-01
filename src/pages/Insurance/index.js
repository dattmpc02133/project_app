import classNames from 'classnames/bind';
import styles from '../../assets/scss/Insurance.module.scss';
const cx = classNames.bind(styles);

function Insurance() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-container')}>
                <div className={cx('wrapper-title')}>
                    <h1>Ronaldo lập kỷ lục World Cup, khóc khi hát quốc ca và tức vì sao Ghana</h1>
                </div>
                <div className={cx('wrapper-content')}>
                    <p>
                        Siêu sao Cristiano Ronaldo chính là tâm điểm của trận đấu Bồ Đào Nha vs Ghana tại lượt trận đầu
                        tiên bảng H World Cup 2022.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Insurance;
