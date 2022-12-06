import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import footerApi from '~/api/footerApi';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Modal from '~/components/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useParams } from 'react-router-dom';

function EditFooRules() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [getById, setGetById] = useState();
    const [allCateFooter, setAllCateFooter] = useState([]);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [idSelect, setIdSelect] = useState();
    const [cateFooter, setCateFooter] = useState();
    const [contents, setContent] = useState('');
    const params = useParams();

    useEffect(() => {
        const getByIdFooter = async () => {
            try {
                const byIdFooter = await footerApi.getIdContent(params.id);
                console.log('content', byIdFooter.data);
                setContent(byIdFooter.data.content);
                setNameInput(byIdFooter.data.title);
                setIdSelect(byIdFooter.data.footer_category_id);
                console.log('lấy đc nè', byIdFooter.data);
            } catch (error) {
                console.log('lỗi lấy id', error);
            }
        };
        const getAllCate = async () => {
            try {
                const allCate = await footerApi.getAll();
                // const filterFooter = allCate.data.filter((item) => item.id == idSelect);
                // setIdSelect(filterFooter.data);
                setAllCateFooter(allCate.data);
                console.log(allCate.data);
            } catch (error) {
                console.log('lỗi lấy danh mục', error);
            }
        };
        getAllCate();
        getByIdFooter();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            category_id: idSelect,
            title: nameInput,
            content: contents,
        };
        console.log('data', data);
        const updateContents = async () => {
            try {
                const result = await footerApi.updateContent(data, params.id);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to update: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setModal(true);
                setStatusHandle(false);
                setLoading(false);
            }
        };
        updateContents();
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
                                <label htmlFor="ip-name">Danh mục Footer content</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={idSelect}
                                    onChange={(e) => setIdSelect(e.target.value)}
                                >
                                    <option value="">Chọn danh mục</option>
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
                                    value={nameInput}
                                    className="input__text--ctrl"
                                    placeholder="Nội quy của hàng"
                                    onChange={(e) => setNameInput(e.target.value)}
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
                                <label htmlFor="ip-name">Nội dung Contents</label>
                            </div>
                            <CKEditor
                                editor={Editor}
                                data={contents}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                    setContent(data);
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

export default EditFooRules;
