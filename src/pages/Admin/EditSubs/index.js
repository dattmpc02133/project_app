import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import catePostApi from '~/api/catePostApi';
import brandApi from '~/api/brandApi';
import Modal from '~/components/Modal';
import { useParams } from 'react-router-dom';
function EditSubs() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [dataCate, setDataCate] = useState('');
    const [dataBrand, setDataBrand] = useState('');
    const [dataName, setDataName] = useState('');
    const [allBrand, setAllBrand] = useState([]);
    const [subsId, setSubsId] = useState([]);
    const params = useParams();

    useEffect(() => {
        const getAllCate = async () => {
            try {
                const cate = await catePostApi.getCatePost();

                setCategories(cate.data);

                const brand = await brandApi.getAll();
                setAllBrand(brand.data);
                console.log(cate.data);
                console.log(brand.data.data);
            } catch (error) {
                console.log('lỗi lấy danh mục', error);
            }
        };

        getAllCate();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { category_id: dataCate, name: dataName, brand_id: dataBrand };
        console.log('data', data);
        const EditSubs = async () => {
            try {
                const result = await catePostApi.editSubs(data, params.id);
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                setDataBrand('');
                setDataCate('');
                setDataName('');
            } catch (error) {
                console.log('Failed to Update: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditSubs();
    };

    useEffect(() => {
        const getByIdSub = async () => {
            try {
                const byIdSub = await catePostApi.getByIdSubs(params.id);
                setDataBrand(byIdSub.data.brand_id);
                setDataCate(byIdSub.data.category_id);
                setDataName(byIdSub.data.name);
                console.log(byIdSub.data);
            } catch (error) {
                console.log('lỗi cập nhật', error);
            }
        };
        getByIdSub();
    }, []);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật danh mục subs</h2>
                <p className="content__heading--subtitle">Cập nhật danh mục subs</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục Thương Hiệu</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={dataBrand}
                                    onChange={(e) => setDataBrand(e.target.value)}
                                >
                                    <option value="0" selected>
                                        Chọn Thương Hiệu
                                    </option>

                                    {allBrand.map((item, index) => (
                                        <option key={index} value={item.id} selected>
                                            {item.brand_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục tin tức</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={dataCate}
                                    onChange={(e) => setDataCate(e.target.value)}
                                >
                                    <option value="0" selected>
                                        Chọn danh mục
                                    </option>

                                    {categories.map((item, index) => (
                                        <option key={index} value={item.id} selected>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* {message && typeof message == 'string' ? (
                            <div className="input__group">
                                <span className={('input__group--mess', 'suscess')}>{message}</span>
                            </div>
                        ) : (
                            false
                        )} */}
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục chi tiết</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={dataName}
                                    className="input__text--ctrl"
                                    placeholder="Mẹo vật"
                                    onChange={(e) => setDataName(e.target.value)}
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

export default EditSubs;
