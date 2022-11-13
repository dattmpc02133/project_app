import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import style from '~/assets/scss/Login.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);
function Login() {
    const history = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const SubmitFormLogin = (e) => {
        e.preventDefault();
        console.log('phone', phone);
        console.log('password', password);
    };
    const handleLoginAuth = () => {
        console.log({ phone, password });
        axios
            .post('https://duynh404.cf/api/auth/login', {
                phone: phone,
                password: password,
            })
            .then((result) => {
                console.log(result.data.data.role);
                let provider = result.data.data;
                console.log(provider);
                if (provider.role) {
                    localStorage.setItem('Bearer', result.data.token);
                    alert('Đăng nhập thành công: xin chào,' + provider.name);
                    history('/admin');
                } else {
                    localStorage.setItem('Bearer', result.data.token);
                    alert('Đăng nhập thành công: xin chào,' + provider.name);
                    history('/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('login-page')}>
            <div className={cx('form')}>
                <div className={cx('login')}>
                    <div className={cx('login-header')}>
                        <h3>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <form className={cx('login-form')} onSubmit={SubmitFormLogin}>
                    <input type="text" value={phone} placeholder="phone" onChange={(e) => setPhone(e.target.value)} />
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLoginAuth}>login</button>
                    <p className={cx('message')}>
                        Not registered? <a href="#">Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
