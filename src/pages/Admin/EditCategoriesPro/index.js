import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useEffect, useState } from 'react';
import categoriesApi from '../../../api/categoriesApi';
import Modal from '~/components/Modal';
import { useParams } from 'react-router-dom';
import catePostApi from '../../../api/catePostApi';

const EditCategoriesPro = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [nameCatePost, setNameCatePost] = useState('');
    const [selection, setSelection] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [resultKq, setResultKq] = useState([]);

    const params = useParams();
    console.log('input', nameCatePost);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameCatePost,
            is_post: resultKq,
        };
        console.log('data', data);
        const EditCategories = async () => {
            setLoading(true);
            try {
                const result = await catePostApi.updateCatePost(data, params.id);
                setResultKq(result.data);
                setMessStatus(result.message);

                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to update: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditCategories();
    };

    useEffect(() => {
        const getByIdCate = async () => {
            try {
                const result = await categoriesApi.getByIdCategories(params.id);
                setResultKq(result.data.id_post);
                setNameCatePost(result.data.name);
                console.log('lỗi ', result.data.id);
            } catch (error) {
                console.log('không lấy được đi danh mục', error);
            }
        };
        getByIdCate();
    }, []);

    console.log('id là', selection);
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật mới danh mục</h2>
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
                                    value={nameCatePost}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên danh mục"
                                    required
                                    onChange={(e) => setNameCatePost(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Cập nhật danh mục</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategoriesPro;
