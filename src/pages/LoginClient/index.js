import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiUserPin } from 'react-icons/bi';
import loginApi from '~/api/loginApi';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import styles from '../../assets/scss/LoginClient.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function LoginClient() {
    const [phone, setPhone] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [otp, setOtp] = useState();
    const [loading, setLoading] = useState('');
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [loginStatus, setLoginStatus] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const objDataAd = localStorage.getItem('token');
        if (objDataAd != null) {
            navigate('/uplogin');
        }
    }, [loginStatus]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //   const data = { phone };
        const getSMS = async () => {
            setLoading(true);
            try {
                const result = await loginApi.callsms(phone);
                console.log(result);
                setShowForm(true);
                setMessStatus(result.status);
                setStatusHandle(true);
                // setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Login failed: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        getSMS();
    };

    console.log('loginStatus', loginStatus);

    const handleLogin = (e) => {
        e.preventDefault();
        const data = { phone, password: otp };
        const login = async () => {
            try {
                const result = await loginApi.login(data);
                const dataUser = result.data;
                const token = result.token.Bearer;
                localStorage.setItem('dataAd', JSON.stringify(dataUser));
                localStorage.setItem('token', token);
                setLoginStatus(true);

                console.log(result);
                setShowForm(false);
                setMessStatus(result.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(true);
            } catch (error) {
                console.log('Login failed: ', error);
                const res = error.response.data;
                setMessStatus(res.message.password);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
                setLoginStatus(false);
            }
        };
        login();
    };

    const changePhone = (e) => {
        setPhone(e.target.value);
    };

    return (
        <div className={cx('wapper')}>
            {loading && <Loading />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {showForm && (
                <div className={cx('modal__container')}>
                    <form className={cx('modal__form')} onSubmit={(e) => handleLogin(e)}>
                        <div className={cx('modal__heading')}>
                            <h2>Nhập mã OTP</h2>
                            <p>Mã OTP đã được gửi vào số điện thoại {phone}</p>
                        </div>
                        <div className={cx('modal__main')}>
                            <div className={cx('modal__content')}>
                                <input type="text" onChange={(e) => setOtp(e.target.value)} placeholder="Mã OTP" />
                            </div>
                            <div className={cx('modal__btn--block')}>
                                <div className={cx('modal__btn--close')} onClick={(e) => setShowForm(false)}>
                                    Hủy
                                </div>
                                <button className={cx('modal__btn')}>Đăng nhập</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

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
                                            autoComplete="username"
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
                                            Tiếp tục
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
