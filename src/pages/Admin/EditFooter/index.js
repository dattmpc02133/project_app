import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import footerApi from '../../../api/footerApi';
import { useParams } from 'react-router-dom';
import Modal from '~/components/Modal';

function EditFooter() {
    const [loading, setLoading] = useState(false);
    const [editCateFooter, setEditCateFooter] = useState('');
    const [message, setMessage] = useState();
    const [getById, setGetById] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [nameFooter, setNameFooter] = useState('');

    const params = useParams();

    useEffect(() => {
        const getByIdFooter = async () => {
            try {
                const byIdFooter = await footerApi.getById(params.id);
                setGetById(byIdFooter.data);
                setNameFooter(byIdFooter.data.name);
                console.log('danhmcu', byIdFooter.data);
            } catch (error) {
                console.log('lỗi lấy id', error);
            }
        };
        getByIdFooter();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { name: nameFooter };
        const EditFooter = async () => {
            try {
                const result = await footerApi.update(data, params.id);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                setNameFooter('');
            } catch (error) {
                console.log('Failed to Edit: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditFooter();
        console.log('data', data);
    };

    console.log('cập nhật', editCateFooter);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật danh mục Footer</h2>
                <p className="content__heading--subtitle">Cập nhật Danh mục Footer</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Cập nhật Tên danh mục Footer</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameFooter}
                                    className="input__text--ctrl"
                                    placeholder="xin chào..."
                                    onChange={(e) => setNameFooter(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )} */}

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Cập nhật danh mục</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditFooter;
