import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import footerApi from '../../../api/footerApi';
import { Link, useParams } from 'react-router-dom';

function EditFooter() {
    const [loading, setLoading] = useState(false);
    const [editCateFooter, setEditCateFooter] = useState('');
    const [message, setMessage] = useState();
    const [getById, setGetById] = useState();
    const params = useParams();

    useEffect(() => {
        const getByIdFooter = async () => {
            try {
                const byIdFooter = await footerApi.getById(params.id);
                setGetById(byIdFooter.data);
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
        const data = { name: editCateFooter };
        const EditFooter = async () => {
            try {
                const result = await footerApi.update(data, params.id);
                setMessage(result.message);
                setLoading(false);
            } catch (error) {
                console.log('Failed to create: ', error);
                setLoading(false);
            }
        };
        EditFooter();
        console.log('data', data);
    };

    console.log('cập nhật', editCateFooter);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
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
                                    className="input__text--ctrl"
                                    placeholder="xin chào..."
                                    onChange={(e) => setEditCateFooter(e.target.value)}
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
