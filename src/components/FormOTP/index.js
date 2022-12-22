import classNames from 'classnames/bind';
import style from '~/assets/scss/FormOTP.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

const FormOTP = ({ action, phone, setOtp, setShowForm, showform, time, setTime }) => {
    if (time < 0) {
        setTime(60);
    }
    if (showform) {
        setTimeout(() => {
            setTime(time - 1);
        }, 1000);
        if (time == 0) {
            setShowForm(false);
        }
    }
    return (
        <div className={cx('modal__container')}>
            <form className={cx('modal__form')} onSubmit={(e) => action(e)}>
                <div className={cx('modal__heading')}>
                    <h2>Nhập mã OTP</h2>
                    <p>Mã OTP đã được gửi vào số điện thoại {phone}</p>
                </div>
                <div className={cx('modal__timing')}>
                    <div className={cx('modal__timing--block')}>
                        <span className={cx('modal__timing--time')}>{time}</span>
                    </div>
                </div>
                <div className={cx('modal__main')}>
                    <div className={cx('modal__content')}>
                        <input type="text" onChange={(e) => setOtp(e.target.value)} placeholder="Mã OTP" />
                    </div>
                    <div className={cx('modal__btn--block')}>
                        <div className={cx('modal__btn--close')} onClick={(e) => setShowForm(false)}>
                            Hủy
                        </div>
                        <button className={cx('modal__btn')}>Xác nhận</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormOTP;
