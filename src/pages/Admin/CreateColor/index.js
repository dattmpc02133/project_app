import colorApi from '~/api/colorApi';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import { useState } from 'react';

import '~/assets/scss/admin/Content.scss';

const CreateCatePost = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [colorCode, setColorCode] = useState();
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            color_code: colorCode,
        };
        const createColor = async () => {
            setLoading(true);
            try {
                const result = await colorApi.create(data);
                setLoading(false);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
            } catch (error) {
                console.log('Failed to create color: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        createColor();
    };
    const changeName = (e) => {
        setName(e.target.value);
        messStatus.name = '';
    };
    const changeColorCode = (e) => {
        setColorCode(e.target.value);
        messStatus.color_code = '';
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới màu sắc</h2>
                <p className="content__heading--subtitle">Sản phẩm</p>
            </div>
            {/* {modal && <Modal closeModal={setModal} message={messStatus} />} */}

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="colorCode">Tên màu sắc</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={name}
                                    id="colorCode"
                                    type="text"
                                    onChange={(e) => changeName(e)}
                                    className="input__text--ctrl"
                                    placeholder="Tên màu sắc...VD:Đỏ"
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
                                <label htmlFor="codeColor">Mã màu sắc</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={colorCode}
                                    id="codeColor"
                                    type="text"
                                    onChange={(e) => changeColorCode(e)}
                                    className="input__text--ctrl"
                                    placeholder="Mã màu... Vd:#FFF"
                                />
                            </div>
                        </div>
                        {statusHandle == false && messStatus.color_code ? (
                            <div className="mess__block">
                                <span className="messErrr">{messStatus.color_code}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm tin màu sắc</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCatePost;
