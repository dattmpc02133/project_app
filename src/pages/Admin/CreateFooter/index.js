import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState } from 'react';
import footerApi from '../../../api/footerApi';
function CreateFooter() {
    const [loading, setLoading] = useState(false);
    const [cateFooter, setCateFooter] = useState('');
    const [catePath, setCatePath] = useState('');
    const [message, setMessage] = useState();
    console.log('cateFooter', cateFooter);
    console.log('catePath', catePath);

    const handleSubmit = (e) => {
        setLoading(true);
        // e.preventDefault();
        const data = { name: cateFooter, slug: catePath };
        const createFooter = async () => {
            try {
                const result = await footerApi.create(data);
                setMessage(result.message);
                setLoading(false);
            } catch (error) {
                console.log('Failed to create: ', error);
                setLoading(false);
            }
        };
        createFooter();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới danh mục Footer</h2>
                <p className="content__heading--subtitle">Danh mục Footer</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content">
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
                                <label htmlFor="ip-name">Đường dẫn</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={catePath}
                                    className="input__text--ctrl"
                                    placeholder="Đường dẫn..."
                                    onChange={(e) => setCatePath(e.target.value)}
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
                            <button className="btn__form--ctrl" onSubmit={(e) => handleSubmit(e)}>
                                Thêm danh mục
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateFooter;
