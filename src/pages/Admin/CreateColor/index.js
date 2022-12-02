import colorApi from '~/api/colorApi';
import Loading from '~/components/Loading';
import Modal from '~/components/Modal';
import { useState } from 'react';

import '~/assets/scss/admin/Content.scss';

const CreateCatePost = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState();
    const [colorCode, setColorCode] = useState();
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
                console.log(result);
                setLoading(false);
            } catch (error) {
                console.log('Failed to create color: ', error);
                setLoading(false);
            }
        };
        setModal(true);
        // createColor();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới màu sắc</h2>
                <p className="content__heading--subtitle">Sản phẩm</p>
            </div>
            {modal && <Modal closeModal={setModal} />}

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
                                    onChange={(e) => setName(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Tên màu sắc...VD:Đỏ"
                                />
                            </div>
                        </div>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="codeColor">Mã màu sắc</label>
                            </div>
                            <div className="input__text">
                                <input
                                    // value={colorCode}
                                    id="codeColor"
                                    type="text"
                                    onChange={(e) => setColorCode(e.target.value)}
                                    className="input__text--ctrl"
                                    placeholder="Mã màu... Vd:#FFF"
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

export default CreateCatePost;
