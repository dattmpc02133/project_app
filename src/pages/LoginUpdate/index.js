import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart, AiTwotoneTool } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';

import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import styles from '../../assets/scss/LoginUpdate.module.scss';

import locationApi from '~/api/locationApi';
import loginApi from '~/api/loginApi';
import { Link, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function LoginUpdate() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [provinceList, setProvinceList] = useState();
    const [provinceId, setProvinceId] = useState();
    const [districtList, setDistrictList] = useState();
    const [districtId, setDistrictId] = useState();
    const [newListDistrict, setNewListDistrict] = useState();
    const [wardList, setWardList] = useState();
    const [newListWarn, setNewListWarn] = useState();
    const [wardId, setWardId] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    // const [user, setUser] = useState();
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const objDataAd = localStorage.getItem('token');
        if (objDataAd == null) {
            navigate('/login');
        } else {
            const getUser = async () => {
                setLoading(true);
                try {
                    const resultUser = await loginApi.getUser();
                    setUser(resultUser.data);
                    setName(resultUser.data.name);
                    setPhone(resultUser.data.phone);
                    const resultProvince = await locationApi.getAllProvince();
                    setProvinceList(resultProvince.data);
                    //
                    const resultDistricts = await locationApi.getAllDistricts();
                    setDistrictList(resultDistricts.data);

                    setProvinceId(resultUser.data.province_id);
                    const fillerDis = resultDistricts.data?.filter((item) => item.province_id == provinceId);
                    setNewListDistrict(fillerDis);

                    //
                    const resultWard = await locationApi.getAllWard();
                    setWardList(resultWard.data);

                    setDistrictId(resultUser.data.district_id);
                    const fillerWard = wardList?.filter((item) => item.district_id == resultUser.data.district_id);
                    setNewListWarn(fillerWard);
                    setWardId(resultUser.data.ward_id);
                    setAddress(resultUser.data.address);
                    setEmail(resultUser.data.email);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to get user: ', error);
                    setLoading(false);
                }
            };

            getUser();
        }
    }, []);

    useEffect(() => {
        provinceId != user?.province_id && setDistrictId('');
        const fillerDis = districtList?.filter((item) => item.province_id == provinceId);
        setNewListDistrict(fillerDis);
    }, [provinceId]);

    useEffect(() => {
        const fillerWard = wardList?.filter((item) => item.district_id == districtId);
        setNewListWarn(fillerWard);
    }, [districtId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            address,
            province_id: provinceId,
            ward_id: wardId,
            district_id: districtId,
        };
        const updateData = async () => {
            setLoading(true);
            try {
                const result = await loginApi.updateUser(data);
                console.log(result);
                setMessStatus(result.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to update user: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };

        updateData();
        console.log(data);
    };

    const logout = () => {
        const logout = async () => {
            setLoading(true);
            try {
                const result = await loginApi.logout();
                console.log(result);
                setLoading(false);
            } catch (error) {
                console.log('Failed to log out', error);
                setLoading(false);
            }
        };
        logout();
    };

    return (
        <div className={cx('wapper')}>
            {loading && <Loading />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <section>
                <div className={cx('grid')}>
                    <h1 className="title-big">Tài khoản khách hàng</h1>
                    <div className={cx('grid wide')}>
                        <div className={cx('row')}>
                            <div className={cx('l-3 m-6 c-12')}>
                                <div className={cx('layout')}>
                                    <div className={cx('caterogy')}>
                                        <div className={cx('caterogy-name__item')}>
                                            <Link to="/uplogin" className={cx('caterogy-name')}>
                                                <AiTwotoneTool className={cx('icon_setting', 'icon__cate')} />
                                                <h3>Cập nhật tài khoản</h3>
                                            </Link>
                                        </div>
                                        <div className={cx('caterogy-name__item')}>
                                            <Link to="/hislogin" className={cx('caterogy-name')}>
                                                <AiOutlineShoppingCart className={cx('icon_shopping', 'icon__cate')} />
                                                <h3>Các đơn đã đặt </h3>
                                            </Link>
                                        </div>
                                        <div className={cx('caterogy-name__item')}>
                                            <div onClick={() => logout()} className={cx('caterogy-name')}>
                                                <RiLogoutBoxLine className={cx('icon_shopping', 'icon__cate')} />
                                                <h3>Đăng xuất</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('l-9 m-6  c-12')}>
                                <div className={cx('info')}>
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <div className={cx('info-group')}>
                                            <h4 className={cx('type-name')}>Họ và tên</h4>
                                            <input
                                                autocomplete="username"
                                                id="login__username"
                                                type="text"
                                                name="username"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={cx('form__input')}
                                                placeholder="VD: Nguyễn Văn A"
                                                required
                                            ></input>
                                        </div>

                                        <div className={cx('info-group')}>
                                            <h4 className={cx('type-name')}>Email</h4>
                                            <input
                                                autocomplete="username"
                                                id="login__username"
                                                type="text"
                                                name="username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={cx('form__input')}
                                                placeholder="VD: Nguyễn Văn A"
                                                required
                                            ></input>
                                        </div>

                                        <div className={cx('info-group')}>
                                            <h4 className={cx('type-name')}>Số điện thoại</h4>
                                            <input
                                                autoComplete="username"
                                                id="login__username"
                                                type="text"
                                                name="username"
                                                value={phone}
                                                // onChange={(e) => setPhone(e.target.value)}
                                                disabled
                                                className={cx('form__input')}
                                                placeholder="VD: 123456789"
                                                required
                                            ></input>
                                        </div>

                                        <div className={cx('info-group')}>
                                            <div className={cx('location__block')}>
                                                <div className={cx('location__item')}>
                                                    <label className={cx('location__title')}>Tỉnh / TP</label>
                                                    <select
                                                        className={cx('location__ctrl')}
                                                        onChange={(e) => setProvinceId(e.target.value)}
                                                        value={provinceId}
                                                    >
                                                        <option>--Chọn thành phố--</option>
                                                        {Array.isArray(provinceList) &&
                                                            provinceList.map((item, index) => (
                                                                <option key={index} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className={cx('location__item')}>
                                                    <label className={cx('location__title')}>Quận / Huyện</label>
                                                    <select
                                                        className={cx('location__ctrl')}
                                                        value={districtId}
                                                        onChange={(e) => setDistrictId(e.target.value)}
                                                    >
                                                        <option>--Chọn quận huyện--</option>
                                                        {Array.isArray(newListDistrict) &&
                                                            newListDistrict.map((item, index) => (
                                                                <option key={index} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className={cx('location__item')}>
                                                    <label className={cx('location__title')}>Phường xã</label>
                                                    <select
                                                        className={cx('location__ctrl')}
                                                        onChange={(e) => setWardId(e.target.value)}
                                                        value={wardId}
                                                    >
                                                        <option>--Chọn phường xã--</option>
                                                        {Array.isArray(newListWarn) &&
                                                            newListWarn.map((item, index) => (
                                                                <option key={index} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className={cx('location__item', 'flex-1')}>
                                                    <label className={cx('location__title')}>Địa chỉ</label>
                                                    <input
                                                        className={cx('location__ctrl--text')}
                                                        placeholder="271/Nguyễn Văn Linh"
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        value={address}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('info-group')}>
                                            <div className={cx('info-group__btn')}>
                                                <button className={cx('btn__update')}>
                                                    Cập nhật thông tin tài khoản
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default LoginUpdate;
