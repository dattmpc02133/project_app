import React, { useEffect, useState } from 'react';
import Loading from '~/components/Loading';

import locationApi from '~/api/locationApi';
import wareHouseApi from '~/api/wareHouseApi';
import '~/assets/scss/admin/Content.scss';

const CreateWareHouse = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [nameWareHouse, setNameWareHouse] = useState();
    const [address, setAddress] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceList, setProvinceList] = useState();
    const [wardId, setWardId] = useState();
    const [wardList, setWardList] = useState();
    const [districtId, setDistrictId] = useState();
    const [districtList, setDistrictList] = useState();
    const [newListDistrict, setNewListDistrict] = useState();
    const [newListWarn, setNewListWarn] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameWareHouse,
            address: address,
            province_id: provinceId,
            district_id: districtId,
            ward_id: wardId,
        };

        const postWareHouse = async () => {
            setLoading(true);
            try {
                const result = await wareHouseApi.create(data);
                console.log(result);
                setLoading(false);
            } catch (error) {
                console.log('Failed to createL: ', error);
                setLoading(false);
            }
        };
        postWareHouse();
    };

    useEffect(() => {
        const fetchAllProvince = async () => {
            setLoading(true);
            try {
                const result = await locationApi.getAllProvince();
                setProvinceList(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get province', error);
                setLoading(false);
            }
        };
        const fetchAllDistricts = async () => {
            setLoading(true);
            try {
                const result = await locationApi.getAllDistricts();
                setDistrictList(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get province', error);
                setLoading(false);
            }
        };
        const fetchAllWard = async () => {
            setLoading(true);
            try {
                const result = await locationApi.getAllWard();
                setWardList(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get province', error);
                setLoading(false);
            }
        };
        fetchAllProvince();
        fetchAllDistricts();
        fetchAllWard();
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

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
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
                                    required
                                    onChange={(e) => setNameWareHouse(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Nguyễn Văn Linh"
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Tỉnh thành phố</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => setProvinceId(e.target.value)}
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

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Phường, xã, thị trấn</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => setWardId(e.target.value)}
                                    className="input__text--ctrl"
                                    required
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
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="271/Nguyễn Văn Linh"
                                />
                            </div>
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm kho sản phẩm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateWareHouse;
