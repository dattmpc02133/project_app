import React, { useEffect, useState } from 'react';
import locationApi from '~/api/locationApi';
import wareHouseApi from '~/api/wareHouseApi';
import storeApi from '~/api/storeApi';
import proImportSlip from '~/api/proImportSlip';
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
    const [quantity, setQuantity] = useState();
    const [priceImport, setPriceImport] = useState();
    const [colorId, setColorId] = useState();
    const [listColor, setListColor] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: [titleSlip],
            warehouse_id: [wareHouseId],

            note: [noteSlip],
            details: [
                {
                    product_id: productId,
                    variant_id: variantId,
                    color_id: colorId,
                    pro_variant_id: variantId,
                    quantity_import: quantity,
                    price_import: priceImport,
                },
            ],
        };

        const postImportProduct = async () => {
            setLoading(true);
            try {
                const result = await proImportSlip.create(data);
                console.log(result);
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
        postImportProduct();
        console.log(data);
    };

    useEffect(() => {
        const fetchWP = async () => {
            setLoading(true);
            try {
                const resultWareHouse = await wareHouseApi.getAll();
                setListWareHouse(resultWareHouse.data);
                const resultProduct = await proImportSlip.getProductSlip();
                setListProduct(resultProduct.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get wareHouse', error);
                setLoading(false);
            }
        };
        fetchWP();
    }, []);

    // console.log(listPro);

    const changeProductId = (e) => {
        const idProduct = e.target.value;
        setProductId(idProduct);
        const listVariant = listProduct?.filter((item) => item.id == idProduct);
        setListVariant(listVariant[0]?.proVariant);
    };

    const changeVariantId = (e, idProduct) => {
        const idVariant = e.target.value;
        setVariantId(idVariant);
        const listVariant = listProduct?.filter((item) => item.id == idProduct);
        const listColor = listVariant[0]?.proVariant.filter((item) => item.id == idVariant);
        // console.log(listColor[0]?.productVariantDetails);
        setListColor(listColor[0]?.productVariantDetails);
        // setListVariant(listVariant[0]?.proVariant);
    };

    const changeColorId = (e) => {
        const idColor = e.target.value;
        setColorId(idColor);
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
                                <label htmlFor="name">Tiêu đề phiếu nhập</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="name"
                                    type="text"
                                    onChange={(e) => setTitleSlip(e.target.value)}
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
                                <label htmlFor="note">Ghi chú</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="note"
                                    type="text"
                                    onChange={(e) => setNoteSlip(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Ghi chú..."
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
                                    onChange={(e) => setWareHouseId(e.target.value)}
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
                                    onChange={(e) => changeVariantId(e, productId)}
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

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="CateProduct">Màu sắc</label>
                            </div>
                            <div className="input__text">
                                <select
                                    id="CateProduct"
                                    onChange={(e) => changeColorId(e)}
                                    className="input__text--ctrl"
                                >
                                    <option>--Chọn màu sắc--</option>
                                    {Array.isArray(listColor) &&
                                        listColor.map((data, index) => (
                                            <option key={index} value={data.color.id}>
                                                {data.color.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="quantity">Số lượng</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="quantity"
                                    type="text"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Ghi chú..."
                                />
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="note">Giá nhập vào</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="note"
                                    type="text"
                                    onChange={(e) => setPriceImport(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Ghi chú..."
                                />
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
