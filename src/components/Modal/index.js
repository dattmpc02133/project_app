import classNames from 'classnames/bind';
import style from '~/assets/scss/Modal.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(style);
const Modal = (closeModal) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('modal__content')}>
                <div className={cx('modal__content--heading')}>
                    <img src={images.successIcon} className={cx('modal__icon')} />
                </div>
                <div className={cx('modal__content--mess')}>
                    <p className={cx('modal__mess')}>Thành công !</p>
                    <span className={cx('modal__sub--mess')}>Sản phẩm đã được thêm vào cửa hàng</span>
                </div>
                <div className={cx('modal__content--btn')}>
                    <button onClick={() => closeModal(false)} className={cx('modal__btn')}>
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
