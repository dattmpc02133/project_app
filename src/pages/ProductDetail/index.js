import DetailProduct from '../../components/DetailProduct';

import style from '~/assets/scss/ProductDetail.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
// end tab descriptions

const ProductDetail = () => {
    return (
        <div className={cx('wrapper')}>
            <DetailProduct />
        </div>
    );
};

export default ProductDetail;
