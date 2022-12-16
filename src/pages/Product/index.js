import classNames from 'classnames/bind';
import style from '~/assets/scss/iPhone.module.scss';
import Slideshow from '../../components/slideshow';
import images from '../../assets/images';
import Category from '../../components/Category';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(style);
function Product() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-slide-box')}>
                <a href="#" className={cx('content-slide-label')}>
                    {/* <span>
                        <img src={images.logo2} className={cx('personal_auth-logo')} />
                        iPhone
                    </span> */}
                </a>
                {/* <Slideshow style={{ borderRadius: '20px' }} /> */}
                <>
                    <Category />
                </>
            </div>
        </div>
    );
}

export default Product;
