import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState } from 'react';
import productApi from '~/api/productApi';
import Modal from '~/components/Modal';
const CreateVariant = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [nameVariant, setNameVariant] = useState('');
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            variant_name: nameVariant,
            // is_post: selection,
        };
        const CreateVariant = async () => {
            setLoading(true);
            try {
                const result = await productApi.createVariant(data);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                console.log(result);
            } catch (error) {
                console.log('Fail to create product', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
                setLoading(false);
            }
        };
        CreateVariant();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới thương hiệu</h2>
                <p className="content__heading--subtitle">Thương hiệu</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên biến thể</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameVariant}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên biến thể..."
                                    required
                                    onChange={(e) => setNameVariant(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm biến thể</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateVariant;
