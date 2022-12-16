import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState } from 'react';
import footerApi from '../../../api/footerApi';
import Modal from '~/components/Modal';
function CreateFooter() {
    const [loading, setLoading] = useState(false);
    const [cateFooter, setCateFooter] = useState('');
    const [catePath, setCatePath] = useState('');
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    // console.log('cateFooter', cateFooter);
    // console.log('catePath', catePath);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { name: cateFooter };
        const createFooter = async () => {
            try {
                const result = await footerApi.create(data);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                setCateFooter('');
            } catch (error) {
                console.log('Failed to create: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        createFooter();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới danh mục Footer</h2>
                <p className="content__heading--subtitle">Danh mục Footer</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục Footer</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={cateFooter}
                                    className="input__text--ctrl"
                                    placeholder="Tên danh mục footer..."
                                    onChange={(e) => setCateFooter(e.target.value)}
                                    required
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

export default CreateFooter;
