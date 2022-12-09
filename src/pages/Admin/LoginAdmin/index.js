import { useEffect, useState } from 'react';
import { VscDebugContinue } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import loginApi from '~/api/loginApi';
import images from '~/assets/images';
import style from '~/assets/scss/admin/LoginAdmin.module.scss';
import Loading from '~/components/Loading';

const cx = classNames.bind(style);

const LoginAdmin = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [messErr, setMessErr] = useState();
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const objDataAd = JSON.parse(localStorage.getItem('dataAd'));
        if (objDataAd != null && objDataAd.role_id != 2) {
            navigate('/admin');
        }
    }, [loginStatus]);

    console.log(loginStatus);

    const submitLogin = (e) => {
        e.preventDefault();
        const data = { phone, password };
        const ob = { data1: 1, data2: 2, data3: 3 };
        // setLoading(true);
        // const dataAdmin = JSON.parse(localStorage.getItem('token'));
        const login = async () => {
            try {
                const response = await loginApi.login(data);
                const dataAdmin = response.data;
                const token = response.token.Bearer;
                localStorage.setItem('dataAd', JSON.stringify(dataAdmin));
                localStorage.setItem('token', token);
                setLoginStatus(true);
                setLoading(false);
            } catch (error) {
                const res = error.response;
                const msEr = res.data.message;
                setMessErr(msEr);
                setError(true);
                setLoading(false);
            }
        };
        login();
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? <Loading /> : ''}
            <div className={cx('login__wrapper--block')}>
                <div className={cx('login__wrapper--left')}></div>
                <div className={cx('login__wrapper--right')}></div>
            </div>
            <div className={cx('login__wrapper')}>
                {/* <img className={cx('login__wrapper--bg')} src="https://i.imgur.com/81RTZEw.png" /> */}
                <div className={cx('login__block')}>
                    <div className={cx('login__backgourd')}>
                        <div className={cx('login__backgourd--logo')}>
                            <img className={cx('logo__img')} src={images.logotest} />
                        </div>
                    </div>
                    <div className={cx('login__form')}>
                        <form className={cx('login__form--wrapper')} onSubmit={(e) => submitLogin(e)}>
                            <div className={cx('login__form--heading')}>
                                <img className={cx('heading__icon')} src={images.iconCB} />
                                <h2 className={cx('heading__title')}>WellCome Back</h2>
                            </div>
                            <div className={cx('login__form--content')}>
                                <div className={cx('login__form--group')}>
                                    <span className={cx('login__form--line')}></span>
                                    <input
                                        type="text"
                                        className={cx('login__form--ctrl')}
                                        autoComplete="ksadasd"
                                        placeholder="Tài khoản"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                {error && messErr.phone ? (
                                    <div className={cx('login__form--group')}>
                                        <span className={cx('login__form--mess')}>{messErr.phone}</span>
                                    </div>
                                ) : (
                                    false
                                )}

                                <div className={cx('login__form--group')}>
                                    <span className={cx('login__form--line')}></span>
                                    <input
                                        type="password"
                                        className={cx('login__form--ctrl')}
                                        placeholder="Mật khẩu"
                                        autoComplete="13123123"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {error && messErr.password ? (
                                    <div className={cx('login__form--group')}>
                                        <span className={cx('login__form--mess')}>{messErr.password}</span>
                                    </div>
                                ) : (
                                    false
                                )}
                                {error && typeof messErr == 'string' ? (
                                    <div className={cx('login__form--group')}>
                                        <span className={cx('login__form--mess')}>{messErr}</span>
                                    </div>
                                ) : (
                                    false
                                )}

                                <div className={cx('login__form--group', 'btn__form--block')}>
                                    <button className={cx('login__form--btn')}>
                                        <VscDebugContinue className={cx('login__form--btn-icon')} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
