import classNames from 'classnames/bind';
import style from '~/assets/scss/Modal.module.scss';
import images from '~/assets/images';
import { RiCheckboxMultipleFill, RiErrorWarningLine } from 'react-icons/ri';
const cx = classNames.bind(style);
const Modal = ({ closeModal, message, status }) => {
    return (
        <div className={cx('wrapper')}>
            {status ? (
                <div className={cx('modal__content')}>
                    <div className={cx('modal__content--heading')}>
                        {/* <img src={images.successIcon} className={cx('modal__icon')} /> */}
                        <RiCheckboxMultipleFill className={cx('modal__icon', 'success')} />
                    </div>
                    <div className={cx('modal__content--mess')}>
                        <p className={cx('modal__mess', 'success')}>Thành công!</p>
                        <span className={cx('modal__sub--mess')}>{message}</span>
                    </div>
                    <div className={cx('modal__content--btn')}>
                        <button onClick={() => closeModal(false)} className={cx('modal__btn')}>
                            Ok
                        </button>
                    </div>
                </div>
            ) : (
                <div className={cx('modal__content')}>
                    <div className={cx('modal__content--heading')}>
                        <RiErrorWarningLine className={cx('modal__icon', 'failed')} />
                    </div>
                    <div className={cx('modal__content--mess')}>
                        <p className={cx('modal__mess', 'failed')}>Không thành công!</p>
                        {/* <span className={cx('modal__sub--mess')}>Sản phẩm đã được thêm vào cửa hàng</span> */}
                    </div>
                    <div className={cx('modal__content--btn')}>
                        <button onClick={() => closeModal(false)} className={cx('modal__btn')}>
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
