import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import footerApi from '~/api/footerApi';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Modal from '~/components/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function CreateFooRules() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [dataselect, setDateSelect] = useState('');
    const [dataInput, setDataInput] = useState('');
    const [allCateFooter, setAllCateFooter] = useState([]);
    const [editContent, setEditContent] = useState('');
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const getAllCate = async () => {
            try {
                const allCate = await footerApi.getAll();
                setAllCateFooter(allCate.data);
            } catch (error) {
                console.log('lỗi lấy danh mục', error);
            }
        };
        getAllCate();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            category_id: dataselect,
            title: dataInput,
            content: editContent,
        };
        // console.log('data', data);
        const createFooter = async () => {
            try {
                const result = await footerApi.createContent(data);
                setMessStatus(result.message);
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
        createFooter();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm nội duy và chính sách</h2>
                <p className="content__heading--subtitle">Thêm nội duy và chính sách</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục nội quy chính sách</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={dataselect}
                                    onChange={(e) => setDateSelect(e.target.value)}
                                >
                                    <option value="0" selected>
                                        Chọn danh mục
                                    </option>

                                    {allCateFooter.map((item, index) => (
                                        <option key={index} value={item.id} selected>
                                            {item.name}
                                        </option>
                                    ))}
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
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên nội duy và chính sách</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={dataInput}
                                    className="input__text--ctrl"
                                    placeholder="Nội quy của hàng"
                                    required
                                    onChange={(e) => setDataInput(e.target.value)}
                                />
                            </div>
                        </div>

                        {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Nội dung danh mục chính sách</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data="Nội dung chính sách"
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setEditContent(data);
                                }}
                            />
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

export default CreateFooRules;
