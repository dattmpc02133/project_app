import React, { useEffect, useState } from 'react';
import Loading from '~/components/Loading';

import { useParams } from 'react-router-dom';
import locationApi from '~/api/locationApi';
import wareHouseApi from '~/api/wareHouseApi';
import storeApi from '~/api/storeApi';
import '~/assets/scss/admin/Content.scss';
import Modal from '~/components/Modal';

const EditUsers = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [messStatus, setMessStatus] = useState('');
    const [nameStore, setNameStore] = useState();
    const [address, setAddress] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceList, setProvinceList] = useState();
    const [wardId, setWardId] = useState();
    const [wardList, setWardList] = useState();
    const [districtId, setDistrictId] = useState();
    const [districtList, setDistrictList] = useState();
    const [newListDistrict, setNewListDistrict] = useState();
    const [newListWarn, setNewListWarn] = useState();
    const [storeDetails, setStoreDetails] = useState();
    const [wareHouseId, setWareHouseId] = useState();
    const [wareHouseList, setWareHouseList] = useState();

    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameStore,
            address: address,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
        };

        const updateWareHouse = async () => {
            setLoading(true);
            try {
                const result = await wareHouseApi.update(data, params.id);
                console.log(result);
                setMessStatus(result.message);
                setModal(true);
                setStatusHandle(true);
                setLoading(false);
                document.reload();
            } catch (error) {
                console.log('Failed to update: ', error);
                setModal(true);
                setLoading(false);
            }
        };
        updateWareHouse();
    };

    useEffect(() => {
        const fetchAllLocation = async () => {
            setLoading(true);
            try {
                const resultStore = await storeApi.getById(params.id);
                console.log(resultStore.data);
                setStoreDetails(resultStore.data);
                setNameStore(resultStore.data.name);
                setAddress(resultStore.data.address);
                //
                const resultWareHouse = await wareHouseApi.getAll();
                setWareHouseList(resultWareHouse.data);
                setWareHouseId();
                //
                const resultProvince = await locationApi.getAllProvince();
                setProvinceList(resultProvince.data);
                //
                const resultDistricts = await locationApi.getAllDistricts();
                setDistrictList(resultDistricts.data);

                setProvinceId(resultStore.data.province_id);
                const fillerDis = resultDistricts.data?.filter((item) => item.province_id == provinceId);
                setNewListDistrict(fillerDis);

                //
                const resultWard = await locationApi.getAllWard();
                setWardList(resultWard.data);

                setDistrictId(resultStore.data.district_id);
                const fillerWard = wardList?.filter((item) => item.district_id == resultStore.data.district_id);
                setNewListWarn(fillerWard);
                setWardId(resultStore.data.ward_id);

                setLoading(false);
            } catch (error) {
                console.log('Failed to get data: ', error);
                setLoading(false);
            }
        };
        fetchAllLocation();
    }, []);

    useEffect(() => {
        provinceId != storeDetails?.province_id && setDistrictId('');
        const fillerDis = districtList?.filter((item) => item.province_id == provinceId);
        setNewListDistrict(fillerDis);
    }, [provinceId]);

    useEffect(() => {
        const fillerWard = wardList?.filter((item) => item.district_id == districtId);
        setNewListWarn(fillerWard);
    }, [districtId]);

    const changeNameStore = (e) => {
        setNameStore(e.target.value);
        messStatus.name = '';
    };
    const changeWareHouseId = (e) => {
        setWareHouseId(e.target.value);
        messStatus.wareHouseId = '';
    };
    const changeProvinceId = (e) => {
        setProvinceId(e.target.value);
        messStatus.province_id = '';
    };
    const changeDistrictId = (e) => {
        setDistrictId(e.target.value);
        messStatus.district_id = '';
    };
    const changeWardId = (e) => {
        setWardId(e.target.value);
        messStatus.ward_id = '';
    };
    const changeAddress = (e) => {
        setAddress(e.target.value);
        messStatus.address = '';
    };

    return (
        <div className="wrapper">
            {loading && <Loading />}
            {/* {modal && <Modal closeModal={setModal} message={messageStatus} status={statusHandle} />} */}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới kho</h2>
                <p className="content__heading--subtitle">Kho sản phẩm</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="name">Tên kho</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="name"
                                    type="text"
                                    value={nameStore}
                                    required
                                    onChange={(e) => changeNameStore(e)}
                                    className="input__text--ctrl"
                                    placeholder="Nguyễn Văn Linh"
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Kho hàng</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    value={wareHouseId}
                                    onChange={(e) => changeWareHouseId(e)}
                                    className="input__text--ctrl"
                                    required
                                >
                                    <option>--Chọn kho hàng--</option>
                                    {Array.isArray(wareHouseList) &&
                                        wareHouseList.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
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
                                    value={provinceId}
                                    onChange={(e) => changeProvinceId(e)}
                                    className="input__text--ctrl"
                                    required
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

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Quận, huyện</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    value={districtId}
                                    required
                                    onChange={(e) => changeDistrictId(e)}
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

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Phường, xã, thị trấn</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeWardId}
                                    className="input__text--ctrl"
                                    required
                                    value={wardId}
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

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="address">Địa chỉ cụ thể</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={colorCode}
                                    id="address"
                                    required
                                    type="text"
                                    value={address}
                                    onChange={(e) => changeAddress(e)}
                                    className="input__text--ctrl"
                                    placeholder="271/Nguyễn Văn Linh"
                                />
                            </div>
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Cập nhật kho sản phẩm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUsers;
