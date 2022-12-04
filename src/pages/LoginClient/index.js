import classNames from 'classnames/bind';
import styles from '../../assets/scss/LoginClient.module.scss';
import { BiUserPin } from 'react-icons/bi';
import { useState } from 'react';
import loginApi from '~/api/loginApi';
const cx = classNames.bind(styles);

function LoginClient() {
    const [phone, setPhone] = useState('');
    const [showForm, setShowForm] = useState('');
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //   const data = { phone };
        const getSMS = async () => {
            try {
                const result = await loginApi.callsms(phone);
                console.log(result);
            } catch (error) {
                console.log('Login failed: ', error);
            }
        };
        getSMS();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const data = { phone, password: otp };
        const login = async () => {
            try {
                const result = await loginApi.login(data);
                console.log(result);
            } catch (error) {
                console.log('Login failed: ', error);
            }
        };
        login();
    };

    const changePhone = (e) => {
        setPhone(e.target.value);
    };
    return (
        <div className={cx('wapper')}>
            <div className={cx('modal__container')}>
                <form onSubmit={(e) => handleLogin(e)}>
                    <div className={cx('modal__heading')}>
                        <h2>Nhập mã OTP</h2>
                    </div>
                    <div className={cx('modal__content')}>
                        <input type="text" onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <button>Đăng nhập</button>
                </form>
            </div>

            <section>
                <div className={cx('grid')}>
                    <div className={cx('grid wide')}>
                        <div className={cx(' header col l-12 m-12 c-12')}>
                            <div className={cx('from')}>
                                <h1 className={cx('big-title')}>Đăng kí tài khoản</h1>

                                <form onSubmit={(e) => handleSubmit(e)} className={cx('form_login')}>
                                    <div className={cx('form_login')}>
                                        <label htmlFor="login__username" className={cx('icon')}>
                                            <BiUserPin className={cx('icons')} />
                                        </label>
                                        <input
                                            autocomplete="username"
                                            id="login__username"
                                            type="number"
                                            name="username"
                                            onChange={(e) => changePhone(e)}
                                            className={cx('form__input')}
                                            placeholder="Vui lòng nhập số điện thoại"
                                            required
                                        ></input>
                                    </div>
                                    <div className={cx('form_login')}>
                                        <button type="submit" className={cx('submit')}>
                                            Đăng kí
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginClient;
