import React, { useEffect, useState } from 'react';
import locationApi from '~/api/locationApi';
import wareHouseApi from '~/api/wareHouseApi';
import storeApi from '~/api/storeApi';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';

const CreateStore = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
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
    const [listWareHouse, setListWareHouse] = useState();
    const [wareHouseId, setWareHouseId] = useState();

    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameStore,
            address: address,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
            warehouse_id: wareHouseId,
        };

        const postStore = async () => {
            setLoading(true);
            try {
                const result = await storeApi.create(data);
                setMessStatus(result.status);
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
        postStore();
    };

    useEffect(() => {
        const fetchAllLocation = async () => {
            setLoading(true);
            try {
                const resultWareHouse = await wareHouseApi.getAll();
                setListWareHouse(resultWareHouse.data);

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
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới cửa hàng</h2>
                <p className="content__heading--subtitle">Cửa hàng, show room</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="name">Tên cửa hàng</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="name"
                                    type="text"
                                    onChange={(e) => changeNameStore(e)}
                                    className="input__text--ctrl"
                                    placeholder="Nguyễn Văn Linh"
                                />
                            </div>
                        </div>

                        {statusHandle == false && messStatus.name ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.name}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Kho hàng</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeWareHouseId(e)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn kho hàng--</option>
                                    {Array.isArray(listWareHouse) &&
                                        listWareHouse.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {statusHandle == false && messStatus.warehouse_id ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.warehouse_id}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Tỉnh thành phố</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeProvinceId(e)}
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
                                    id="CateProduct"
                                    value={districtId}
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
                                    onChange={(e) => changeWardId(e)}
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
                                    onChange={(e) => changeAddress(e)}
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
                            <button className="btn__form--ctrl">Thêm kho cửa hàng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStore;
