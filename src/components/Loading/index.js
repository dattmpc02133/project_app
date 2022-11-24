import images from '~/assets/images';
import classNames from 'classnames/bind';
import style from '~/assets/scss/admin/Loading.module.scss';

const cx = classNames.bind(style);
const Loading = () => {
    return (
        <div className={cx('loading__block')}>
            <div className={cx('loading__content')}>
                <img src={images.loading} alt="Loading..." />
            </div>
        </div>
    );
};

export default Loading;
