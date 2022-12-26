import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useEffect, useMemo, useState } from 'react';
import brandApi from '~/api/brandApi';
import Modal from '~/components/Modal';
import ImageUpload from '../../../components/ImageUpload';
import TableImage from '~/components/TableImage';
import slideShowApi from '~/api/slideShowApi';
import categoriesApi from '~/api/categoriesApi';

const CreateSlideShow = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [nameSlideUrl, setNameSlideUrl] = useState();
    const [image, setImage] = useState();
    const [modal, setModal] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);

    const [showImgTbl, setShowImgTbl] = useState(false);
    const [urlImage, setUrlImage] = useState();
    const [statusImg, setStatusImg] = useState();
    const [nameSlideTitle, setNameSlideTitle] = useState();
    const [dataNews, setDataNews] = useState();

    const [selectActive, setSelectActive] = useState();
    const [detailSub, setDetailSub] = useState();
    const [active, setActive] = useState();
    const handleShowFormListImg = () => {
        setShowImgTbl(true);
        setStatusImg(false);
    };

    const handleSelectActive = (e) => {
        setDetailSub(e.target.value);
    };
    const ChangeDistrictPostById = (item) => {
        console.log('item');
        console.log('item', item);
    };
    useEffect(() => {
        const fetchCate = async () => {
            try {
                const ResCate = await categoriesApi.getAll();
                setSelectActive(ResCate.data);
                setLoading(false);
            } catch (error) {}
        };
        fetchCate();
    }, []);
    const handleGetListImg = (img) => {
        const dataNews = img?.map((data) => {
            const object = {};
            object.url = data;
            object.name = '';
            return object;
        });
        setImage(dataNews);
        setShowImgTbl(false);
    };
    const handleGetImg = (img) => {
        setUrlImage(...img);
        setShowImgTbl(false);
    };

    const OnchangeText = (value, index) => {
        if (image) {
            image[index].name = value;
            setDataNews([...image]);
        }
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const urlImage = [];
        const UrlLinks = [];
        dataNews?.map((item) => {
            urlImage.push(item.url);
            UrlLinks.push(item.name);
        });
        const data = {
            title: nameSlideTitle,
            images: urlImage,
            links: UrlLinks,
            category_id: detailSub,
        };
        console.log('dâta', data);
        const CreateSlideShow = async () => {
            try {
                const result = await slideShowApi.create(data);
                setMessStatus(result.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {}
        };
        CreateSlideShow();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {showImgTbl && (
                <TableImage
                    closeForm={setShowImgTbl}
                    action={handleGetListImg}
                    actionOne={handleGetImg}
                    status={statusImg}
                />
            )}
            <div className="content__heading">
                <h2 className="content__heading--title">Thêm mới bảng hiệu</h2>
                <div className="content__heading--subtitle">Bảng hiệu</div>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="input__group">
                            <div className="input__label">
                                <label htmlFor="ip-name">Tên bảng hiệu chính</label>
                                <div className="input__text">
                                    <input
                                        value={nameSlideTitle}
                                        id="ip-name"
                                        type="text"
                                        className="input__text--ctrl"
                                        placeholder="Tên bảng hiệu..."
                                        required
                                        onChange={(e) => setNameSlideTitle(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="input__label">
                                <label htmlFor="ip-name">Tên bảng hiệu phụ</label>
                                <div className="input__text">
                                    <select
                                        value={selectActive}
                                        onChange={(e) => handleSelectActive(e)}
                                        className="input__text--ctrl"
                                    >
                                        <option>{selectActive ? selectActive.name : 'Chọn bảng hiệu phụ'}</option>
                                        {selectActive?.map((item, i) => (
                                            <option
                                                key={i}
                                                value={item.id}
                                                onClick={() => ChangeDistrictPostById({ item: item?.name })}
                                            >
                                                {item?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="input__group">
                                <div className="input__group">
                                    <div className="input__label">
                                        <label htmlFor="imgProduct">Hình ảnh bảng hiệu (danh sách)</label>
                                    </div>

                                    <div className="list__images">
                                        {image ? (
                                            image?.map((data, index) => (
                                                <div className="img__box-wrap" key={index}>
                                                    <img
                                                        className="img__box--item"
                                                        src={data?.url}
                                                        onClick={() => handleShowFormListImg()}
                                                    />
                                                    <div className="input__label">
                                                        <label htmlFor="ip-name">Url bảng hiệu</label>
                                                        <div className="input__text">
                                                            <input
                                                                value={data?.name}
                                                                id="ip-name"
                                                                type="text"
                                                                className="input__text--ctrl"
                                                                placeholder="Url bảng hiệu..."
                                                                required
                                                                onChange={(e) => OnchangeText(e.target.value, index)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="img__choose" onClick={() => handleShowFormListImg()}>
                                                Chọn ảnh...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="btn__form">
                            <button className="btn__form--ctrl">Thêm bảng hiệu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateSlideShow;
