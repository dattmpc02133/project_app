import classNames from 'classnames/bind';
import style from '~/assets/scss/Dialog.module.scss';
import images from '~/assets/images';
import { RiCloseLine, RiAlertFill } from 'react-icons/ri';
const cx = classNames.bind(style);

const Dialog = ({ closeDialog, action }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content__wrapper')}>
                <div className={cx('content__heading')}>
                    <div className={cx('close__btn')}>
                        <RiCloseLine onClick={() => closeDialog(false)} className={cx('closeIcon')} />
                    </div>
                </div>
                <div className={cx('content__main')}>
                    <div className={cx('content__bottom')}>
                        <div className={cx('content__notify')}>
                            <div className={cx('content__notify--icon')}>
                                <RiAlertFill className={cx('warningIcon')} />
                            </div>
                            <div className={cx('content__notify--mess')}>
                                <p>Bạn có chắc muốn xóa ?</p>
                                <p>Khi xóa thành công sẽ không thể khôi phục dữ liệu.</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content__control')}>
                        <div className={cx('content__btn')}>
                            <button className={cx('btn__ctrl')} onClick={() => closeDialog(false)}>
                                CANCEL
                            </button>
                        </div>
                        <div className={cx('content__btn')}>
                            <button className={cx('btn__ctrl', 'active')} onClick={() => action(true)}>
                                CONTINUE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
