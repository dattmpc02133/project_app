import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState } from 'react';
import brandApi from '~/api/brandApi';

const CreateBrand = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [nameCate, setNameCate] = useState('');
    const [selection, setSelection] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = {
        //     brand_name:brand_name,
        //     slug:slug
        // };

        const createBrand = async () => {
            setLoading(true);
            try {
                const result = await brandApi.create();
                console.log(result);
                setLoading(false);
            } catch (error) {
                console.log('Fail to create product', error);
                setLoading(false);
            }
        };
        createBrand();

        // setColorByVariant([]);
    };
    const handleChangeSelections = (id) => {
        console.log('id', id);
        setSelection(id);
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới thương hiệu</h2>
                <p className="content__heading--subtitle">Thương hiệu</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên thương hiệu</label>
                            </div>
                            <select onChange={(e) => handleChangeSelections(e.target.value)}>
                                <option selected>Chọn</option>
                                <option value="0">Thêm thương hiệu sản phẩm</option>
                                <option value="1">Thêm thương hiệu tin tức</option>
                            </select>
                            {selection != null && (
                                <div className="input__text">
                                    <input
                                        // value={}
                                        id="ip-name"
                                        type="text"
                                        className="input__text--ctrl"
                                        placeholder="Tên danh mục..."
                                        onChange={(e) => setNameCate(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        {/* <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên thương hiệu</label>
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
                        </div> */}
                        {/* {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )} */}
                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm thương hiệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBrand;
