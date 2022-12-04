import React, { useEffect, useState } from 'react';
import locationApi from '~/api/locationApi';
import wareHouseApi from '~/api/wareHouseApi';
import storeApi from '~/api/storeApi';
import productApi from '~/api/productApi';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';

const ProImportSlip = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [listWareHouse, setListWareHouse] = useState();
    const [listProduct, setListProduct] = useState();
    const [listVariant, setListVariant] = useState();
    const [productDetail, setProductDetail] = useState();
    const [titleSlip, setTitleSlip] = useState();
    const [wareHouseId, setWareHouseId] = useState();
    const [noteSlip, setNoteSlip] = useState();
    const [productId, setProductId] = useState();
    const [variantId, setVariantId] = useState();
    const [proVariantId, setProVariantId] = useState();
    const [quantity, setQuantity] = useState();
    const [priceImport, setPriceImport] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};

        const postStore = async () => {
            setLoading(true);
            try {
                const result = await storeApi.create(data);

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
        const fetchWP = async () => {
            setLoading(true);
            try {
                const resultWareHouse = await wareHouseApi.getAll();
                setListWareHouse(resultWareHouse.data);
                const resultProduct = await productApi.getAll();
                setListProduct(resultProduct.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get wareHouse', error);
                setLoading(false);
            }
        };
        fetchWP();
    }, []);

    const changeProductId = (e) => {
        const idProduct = e.target.value;
        setProductId(idProduct);
        const listVariant = listProduct?.filter((item) => item.id == idProduct);
        setListVariant(listVariant[0].variants);
    };

    const changeVariantId = (e) => {
        const idVariant = e.target.value;
        setVariantId(idVariant);
        console.log(listProduct);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Phiếu nhập sản phẩm</h2>
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
                                    // onChange={(e) => changeTitle(e)}
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
                                    // onChange={(e) => changeWareHouseId(e)}
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

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Sản phẩm</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeProductId(e)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn sản phẩm--</option>
                                    {Array.isArray(listProduct) &&
                                        listProduct.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Biến thể</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeVariantId(e)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn biến thể sản phẩm--</option>
                                    {Array.isArray(listVariant) &&
                                        listVariant.map((data, index) => (
                                            <option key={index} value={data.id}>
                                                {data.variant_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm kho cửa hàng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProImportSlip;
