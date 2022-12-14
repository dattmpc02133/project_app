import { useEffect, useState } from 'react';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import catePostApi from '~/api/catePostApi';
import brandApi from '~/api/brandApi';
import Modal from '~/components/Modal';
import { useNavigate } from 'react-router-dom';

function CreateSubs() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [dataselect, setDateSelect] = useState('');
    const [dataInput, setDataInput] = useState('');
    const [dataBrand, setDataBrand] = useState('');
    const [allBrand, setAllBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getAllCate = async () => {
            try {
                const cate = await catePostApi.getCatePost();
                setCategories(cate.data);
                console.log(cate);
            } catch (error) {
                console.log('lỗi lấy danh mục', error);
            }
        };

        getAllCate();
    }, []);

    useEffect(() => {
        const getAllBrand = async () => {
            try {
                const brand = await brandApi.getNotPage();
                setAllBrands(brand.data);
            } catch (error) {
                console.log('thương hiệu', error);
            }
        };
        getAllBrand();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { category_id: dataselect, name: dataInput, brand_id: 61, is_post: 1 };

        const createSubs = async () => {
            try {
                const result = await catePostApi.createdSubs(data);
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

        createSubs();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm danh mục subs</h2>
                <p className="content__heading--subtitle">Thêm danh mục subs</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__content" onSubmit={(e) => handleSubmit(e)}>
                        {/* <div className="input__group">
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
                        </div> */}

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Danh mục tin tức</label>
                            </div>
                            <div className="input__text">
                                <select
                                    className="input__text--ctrl"
                                    value={dataselect}
                                    onChange={(e) => setDateSelect(e.target.value)}
                                >
                                    <option selected>Chọn danh mục</option>

                                    {categories.map((item, index) => (
                                        <option key={index} value={item.id} selected>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên danh mục chi tiết</label>
                            </div>
                            <div className="input__text">
                                <input
                                    value={dataInput}
                                    className="input__text--ctrl"
                                    placeholder="Tên danh mục chi tiết"
                                    required
                                    onChange={(e) => setDataInput(e.target.value)}
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

export default CreateSubs;
