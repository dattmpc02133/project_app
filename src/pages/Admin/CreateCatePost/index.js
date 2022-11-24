import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState } from 'react';
import catePostApi from '~/api/catePostApi';

const CreateCatePost = () => {
    const [loading, setLoading] = useState(false);
    const [nameCate, setNameCate] = useState('');
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { name: nameCate };
        const createCatePost = async () => {
            try {
                const result = await catePostApi.create(data);
                setMessage(result.message);
                setLoading(false);
            } catch (error) {
                console.log('Failed to create: ', error);
                setLoading(false);
            }
        };
        createCatePost();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới danh mục tin tức</h2>
                <p className="content__heading--subtitle">Danh mục tin tức</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục tin tức</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={nameCate}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tên danh mục..."
                                    onChange={(e) => setNameCate(e.target.value)}
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
                            <button className="btn__form--ctrl">Thêm danh mục</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCatePost;
