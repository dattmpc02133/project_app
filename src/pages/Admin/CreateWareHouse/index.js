import React, { useEffect, useState } from 'react';
import Loading from '~/components/Loading';

import locationApi from '~/api/locationApi';
import '~/assets/scss/admin/Content.scss';

const CreateWareHouse = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [nameWareHouse, setNameWareHouse] = useState();
    const [addresses, setAddresses] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceList, setProvinceList] = useState();
    const [wardId, setWardId] = useState();
    const [wardList, setWardList] = useState();
    const [districtId, setDistrictId] = useState();
    const [districtList, setDistrictList] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};
        // setModal(true);
        // createColor();
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

    useEffect(() => {}, [provinceId]);

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
                                    onChange={(e) => setProvinceId(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn quận, huyện--</option>
                                    {Array.isArray(districtList) &&
                                        districtList.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Phường xã</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => setProvinceId(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn quận, huyện--</option>
                                    {Array.isArray(districtList) &&
                                        districtList.map((data, index) => (
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
                                    type="text"
                                    onChange={(e) => setAddresses(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="271/Nguyễn Văn Linh"
                                />
                            </div>
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm tin màu sắc</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateWareHouse;
