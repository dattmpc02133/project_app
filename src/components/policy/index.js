import { BsCheck2Circle, BsShield } from 'react-icons/bs';
import { MdOutlineLocalShipping, MdOutlineRefresh } from 'react-icons/md';
import classNames from 'classnames/bind';
import style from '~/assets/scss/Policy.module.scss';
const cx = classNames.bind(style);
const Policy = () => {
    return (
        <div className={cx('Policy')}>
            <ul className={cx('pr_Policy')}>
                <li>
                    <BsCheck2Circle className={cx('icon-policy')} />
                    <span>Mẫu mã đa dạng, chính hãng</span>
                </li>
                <li>
                    <MdOutlineLocalShipping className={cx('icon-policy')} />
                    <span>Giao hàng toàn quốc</span>
                </li>
                <li>
                    <BsShield className={cx('icon-policy')} />
                    <span>Bảo hành tới 12 tháng</span>
                </li>
                <li>
                    <MdOutlineRefresh className={cx('icon-policy')} />
                    <span>Có thể đổi trả sau 7 ngày</span>
                </li>
            </ul>
        </div>
    );
};

export default Policy;
