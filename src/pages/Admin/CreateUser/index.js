import React, { useEffect, useState } from 'react';
import locationApi from '~/api/locationApi';

import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import loginApi from '~/api/loginApi';
import usersApi from '~/api/usersApi';
import roleApi from '~/api/roleApi';
const CreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [nameUsers, setNameUsers] = useState();
    const [address, setAddress] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceList, setProvinceList] = useState();
    const [wardId, setWardId] = useState();
    const [wardList, setWardList] = useState();
    const [districtId, setDistrictId] = useState();
    const [districtList, setDistrictList] = useState();
    const [newListDistrict, setNewListDistrict] = useState();
    const [newListWarn, setNewListWarn] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [phoneUsers, setPhoneUsers] = useState();
    const [changeRole, setChangeRole] = useState();
    const [otpUser, setOtpUser] = useState();
    const [allRole, setAllRole] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // setShowForm(false);
        const data = {
            name: nameUsers,
            phone: phoneUsers,
            password: otpUser,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
            address: address,
            role_id: changeRole,
        };

        console.log(data);
        const createdUser = async () => {
            setLoading(true);
            try {
                const result = await usersApi.create(data);
                setMessStatus(result.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to createL: ', error);
                const res = error.response.data;
                console.log(res);
                setMessStatus(res.message);
                setModal(true);
                setStatusHandle(false);
                setLoading(false);
            }
        };
        createdUser();
    };

    useEffect(() => {
        const fetchAllLocation = async () => {
            setLoading(true);
            try {
                const resultProvince = await locationApi.getAllProvince();
                setProvinceList(resultProvince.data);

                const resultDistricts = await locationApi.getAllDistricts();
                setDistrictList(resultDistricts.data);

                const resultWard = await locationApi.getAllWard();
                setWardList(resultWard.data);

                setLoading(false);
            } catch (error) {
                console.log('Failed to get province', error);
                setLoading(false);
            }
        };
        fetchAllLocation();
    }, []);

    useEffect(() => {
        setDistrictId('');
        const fillerDis = districtList?.filter((item) => item.province_id == provinceId);
        setNewListDistrict(fillerDis);
    }, [provinceId]);

    useEffect(() => {
        const fillerWard = wardList?.filter((item) => item.district_id == districtId);
        setNewListWarn(fillerWard);
    }, [districtId]);

    const getRoleUser = async () => {
        try {
            const roleUser = await roleApi.getAll();
            setAllRole(roleUser.data);
        } catch (error) {
            console.log('Failed to get role user', error);
        }
    };

    useEffect(() => {
        getRoleUser();
    }, []);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}

            {/* {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />} */}

            <div className="content__heading">
                <h2 className="content__heading--title">Thêm tài khoản</h2>
                {/* <p className="content__heading--subtitle">Cửa hàng, show room</p> */}
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="name">Tên tài khoản</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="name"
                                    required
                                    type="text"
                                    onChange={(e) => setNameUsers(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Nguyễn Văn Linh..."
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="name">Số điện thoại</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="name"
                                    required
                                    type="text"
                                    onChange={(e) => setPhoneUsers(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="0703608891"
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="name">Mật khẩu</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="name"
                                    required
                                    type="text"
                                    onChange={(e) => setOtpUser(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="12345****"
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Vai trò</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    required
                                    onChange={(e) => setChangeRole(e.target.value)}
                                >
                                    <option value="0" selected>
                                        Chọn vai trò
                                    </option>

                                    {allRole?.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Tỉnh thành phố</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    required
                                    onChange={(e) => setProvinceId(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn tỉnh thành phố--</option>
                                    {Array.isArray(provinceList) &&
                                        provinceList.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {statusHandle == false && messStatus.province_id ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.province_id}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Quận, huyện</label>
                            </div>
                            <div className="input__text">
                                <select
                                    required
                                    id="CateProduct"
                                    value={districtId}
                                    onChange={(e) => setDistrictId(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn quận, huyện--</option>
                                    {Array.isArray(newListDistrict) &&
                                        newListDistrict.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {statusHandle == false && messStatus.district_id ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.district_id}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Phường, xã, thị trấn</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    required
                                    onChange={(e) => setWardId(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn phường, xã, thị trấn--</option>
                                    {Array.isArray(newListWarn) &&
                                        newListWarn.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {statusHandle == false && messStatus.ward_id ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.ward_id}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="address">Địa chỉ cụ thể</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={colorCode}
                                    id="address"
                                    type="text"
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="271/Nguyễn Văn Linh"
                                />
                            </div>
                        </div>

                        {statusHandle == false && messStatus.address ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.address}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm Tài khoản</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
