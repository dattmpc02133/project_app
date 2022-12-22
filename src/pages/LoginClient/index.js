import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BiUserPin } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import locationApi from '~/api/locationApi';
import loginApi from '~/api/loginApi';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import FormOTP from '~/components/FormOTP';
import styles from '../../assets/scss/LoginClient.module.scss';

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
    const [showFormRT, setShowFormRT] = useState(false);
    const [listProvince, setListProvince] = useState();
    const [listDistrict, setListDistrict] = useState();
    const [newListDistrict, setNewListDistrict] = useState();
    const [newListWard, setNewListWard] = useState();
    const [listWard, setListWard] = useState();
    const [provinceId, setProvinceId] = useState();
    const [districtId, setDistrictId] = useState();
    const [wardId, setWardId] = useState();
    const [address, setAddress] = useState();
    const [name, setName] = useState();
    const [title, setTiltle] = useState({
        titleForm: 'Đăng nhập',
        titleBtn: 'Chưa có tài khoản',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const objDataAd = localStorage.getItem('token');
        if (objDataAd != null) {
            navigate('/uplogin');
        }
    }, [loginStatus]);

    useEffect(() => {
        const listLocation = async () => {
            setLoading(true);
            try {
                const resultProvince = await locationApi.getAllProvince();
                setListProvince(resultProvince.data);
                const resultDistricts = await locationApi.getAllDistricts();
                setListDistrict(resultDistricts.data);
                const resultWard = await locationApi.getAllWard();
                setListWard(resultWard.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get local: ', error);
                setLoading(false);
            }
        };
        listLocation();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (showFormRT) {
            const data = {
                name,
                address,
                ward_id: wardId,
                district_id: districtId,
                province_id: provinceId,
                phone,
                password: otp,
            };

            const register = async () => {
                try {
                    const result = await loginApi.register(data);
                    console.log(result);
                    setLoading(false);
                    setShowForm(false);
                    login(data);
                } catch (error) {
                    console.log('Login failed: ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                    setLoginStatus(false);
                }
            };
            register();
        } else {
            const data = { phone, password: otp };

            login(data);
        }
    };

    const login = async (data) => {
        try {
            const result = await loginApi.login(data);
            const dataUser = result.data;
            const token = result.token.Bearer;
            localStorage.setItem('dataAd', JSON.stringify(dataUser));
            localStorage.setItem('token', token);
            setLoginStatus(true);
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

    const [time, setTime] = useState(60);
    if (time == 0) {
        setMessStatus('Mã OTP hết hiệu lực');
        setStatusHandle(false);
        setModal(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!showFormRT) {
            if (phone.length == 10) {
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
                        if (error.response.status == 400) {
                            const res = error.response.data;
                            setMessStatus(res.message);
                            setModal(true);
                            setStatusHandle(false);
                        } else {
                            setShowFormRT(true);
                            // setTiltle({ ...title, titleForm: 'Đăng nhập' });
                            setTiltle({ titleForm: 'Đăng ký', titleBtn: 'Đã có tài khoản' });
                        }
                        setLoading(false);
                    }
                };
                getSMS();
            }
        } else {
            if (phone.length == 10) {
                const getSMS = async () => {
                    setLoading(true);
                    try {
                        const result = await loginApi.callsmsRT(phone);
                        console.log(result);
                        setShowForm(true);
                        // setMessStatus(result.status);
                        // setStatusHandle(true);
                        // setModal(true);
                        setLoading(false);
                    } catch (error) {
                        console.log('Login failed: ', error);
                        const res = error.response.data;
                        if (error.response.status == 400) {
                            setMessStatus(res.message);
                            setModal(true);
                            setStatusHandle(false);
                        } else {
                            setMessStatus(res.message);
                            setModal(true);
                            setStatusHandle(false);
                        }
                        setLoading(false);
                    }
                };
                getSMS();
            }
        }
        //   const data = { phone };
    };

    const handleChangeForm = () => {
        if (showFormRT) {
            setTiltle({ titleForm: 'Đăng nhập', titleBtn: 'Chưa có tài khoản' });
            setPhone('');
            setShowFormRT(false);
        } else {
            setTiltle({ titleForm: 'Đăng ký', titleBtn: 'Đã có tài khoản' });
            setShowFormRT(true);
        }
    };

    const changePhone = (e) => {
        setPhone(e.target.value);
    };

    useEffect(() => {
        setDistrictId('');
        const fillerDis = listDistrict?.filter((item) => item.province_id == provinceId);
        setNewListDistrict(fillerDis);
    }, [provinceId]);

    useEffect(() => {
        const fillerWard = listWard?.filter((item) => item.district_id == districtId);
        setNewListWard(fillerWard);
    }, [districtId]);

    return (
        <div className={cx('wapper')}>
            {loading && <Loading />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {/* {showForm && (
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
            )} */}

            {showForm && (
                <FormOTP
                    action={handleLogin}
                    phone={phone}
                    setOtp={setOtp}
                    setShowForm={setShowForm}
                    showform={showForm}
                    time={time}
                    setTime={setTime}
                />
            )}

            <section>
                <div className={cx('grid')}>
                    <div className={cx('grid wide')}>
                        <div className={cx(' header col l-12 m-12 c-12')}>
                            <div className={cx('from')}>
                                <div className={cx('from__title')}>
                                    <h2>{title.titleForm}</h2>
                                </div>

                                <form onSubmit={(e) => handleSubmit(e)} className={cx('form__block')}>
                                    <div className={cx('form__wrapper')}>
                                        <div className={cx('form__login')}>
                                            <label htmlFor="login__username" className={cx('form__login--icon')}>
                                                <BiUserPin className={cx('icons')} />
                                            </label>
                                            <input
                                                autoComplete="username"
                                                id="login__username"
                                                type="number"
                                                name="username"
                                                value={phone}
                                                onChange={(e) => changePhone(e)}
                                                className={cx('form__login--input')}
                                                placeholder="Vui lòng nhập số điện thoại"
                                                required
                                            ></input>
                                        </div>
                                        {showFormRT && (
                                            <div className={cx('form__group--wrapper')}>
                                                <div className={cx('form__group')}>
                                                    <label className={cx('form__login--label')}>Họ và tên</label>
                                                    <input
                                                        className={cx('form__login--ctrl')}
                                                        required
                                                        placeholder="Trần Hoàng Khôi..."
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className={cx('form__group')}>
                                                    <label className={cx('form__login--label')}>Tỉnh / Thành phố</label>
                                                    <select
                                                        className={cx('form__login--ctrl')}
                                                        required
                                                        onChange={(e) => setProvinceId(e.target.value)}
                                                    >
                                                        <option value="">--Chọn tỉnh thành phố--</option>
                                                        {Array.isArray(listProvince) &&
                                                            listProvince.map((item, index) => (
                                                                <option key={index} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className={cx('form__group')}>
                                                    <label className={cx('form__login--label')}>Quận/ Huyện</label>
                                                    <select
                                                        className={cx('form__login--ctrl')}
                                                        required
                                                        onChange={(e) => setDistrictId(e.target.value)}
                                                    >
                                                        <option value="">--Chọn quận huyện--</option>
                                                        {Array.isArray(newListDistrict) &&
                                                            newListDistrict.map((item, index) => (
                                                                <option key={index} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className={cx('form__group')}>
                                                    <label className={cx('form__login--label')}>Phường / Xã</label>
                                                    <select
                                                        className={cx('form__login--ctrl')}
                                                        required
                                                        onChange={(e) => setWardId(e.target.value)}
                                                    >
                                                        <option value="">--Chọn phường xã--</option>
                                                        {Array.isArray(newListWard) &&
                                                            newListWard.map((item, index) => (
                                                                <option key={index} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className={cx('form__group')}>
                                                    <label className={cx('form__login--label')}>Địa chỉ cụ thể</label>
                                                    <input
                                                        required
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        className={cx('form__login--ctrl')}
                                                        placeholder="271/Nguyễn Văn Linh"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className={cx('form__btn')}>
                                            <div className={cx('btn__item--toggle')} onClick={() => handleChangeForm()}>
                                                {title.titleBtn}
                                            </div>
                                            <button className={cx('btn__item')}>Tiếp tục</button>
                                        </div>
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
