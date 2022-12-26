import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import brandApi from '~/api/brandApi';
import { useParams } from 'react-router-dom';
import Modal from '~/components/Modal';

function EditBrand() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [nameBrand, setNameBrand] = useState([]);
    const [brandsId, setBrandsId] = useState([]);
    const [selectActive, setSelectActive] = useState();

    const params = useParams();
    useEffect(() => {
        const getById = async () => {
            try {
                const byIdBrand = await brandApi.getById(params.id);
                // setBrandsId(byIdBrand.data.is_post);
                console.log(byIdBrand);
                setNameBrand(byIdBrand.data.brand_name);
                setSelectActive(byIdBrand.data.is_active);
            } catch (error) {
                console.log('Lỗi thương hiệu theo id', error);
            }
        };
        getById();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { brand_name: nameBrand, is_active: selectActive }; // , is_post: brandsId
        // console.log('data', data);
        const EditBrand = async () => {
            try {
                const result = await brandApi.update(data, params.id);
                setMessStatus(result.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to Edit: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditBrand();
    };
    // const handleChangeSelections = (id) => {
    //     setBrandsId(id);
    // };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật thương hiệu</h2>
                <p className="content__heading--subtitle">Cập nhật thương hiệu</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        {/* <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục sản phẩm</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={brandsId}
                                    onChange={(e) => handleChangeSelections(e.target.value)}
                                >
                                    <option selected>Chọn</option>
                                    <option value="0">Cập nhật danh mục sản phẩm</option>
                                    <option value="1">Cập nhật danh mục tin tức</option>
                                </select>
                            </div>
                        </div> */}

                        {/* {brandsId != null && ( */}
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục thương hiệu </label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameBrand}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên danh muc"
                                    required
                                    onChange={(e) => setNameBrand(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* )} */}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Trạng thái</label>
                            </div>
                            <div className="input__text">
                                <select
                                    value={selectActive}
                                    onChange={(e) => setSelectActive(e.target.value)}
                                    className="input__text--ctrl"
                                >
                                    <option value="">Chọn trạng thái</option>
                                    <option value="0">Chưa kích hoạt</option>
                                    <option value="1">Đang kích hoạt</option>
                                </select>
                            </div>
                        </div>

                        {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Cập nhật thương hiệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditBrand;
