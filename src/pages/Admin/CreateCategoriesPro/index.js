import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState } from 'react';
import categoriesApi from '../../../api/categoriesApi';
import Modal from '~/components/Modal';
function CreateCategoriesPro() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [nameCateProduct, setnameCateProduct] = useState('');
    const [selection, setSelection] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [resultKq, setResultKq] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameCateProduct,
        };
        // console.log('data', data);
        const createCategories = async () => {
            setLoading(true);
            try {
                const result = await categoriesApi.create(data);
                setResultKq(result.data);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to create: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        createCategories();
    };
    const handleChangeSelections = (id) => {
        setSelection(id);
    };
    // console.log('id là', selection);
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới danh mục</h2>
                <p className="content__heading--subtitle">Danh mục</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục sẩn phẩm</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameCateProduct}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên danh mục"
                                    onChange={(e) => setnameCateProduct(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm danh mục</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateCategoriesPro;
