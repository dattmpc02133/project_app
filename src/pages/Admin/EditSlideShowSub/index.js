import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useEffect, useState } from 'react';
import slideShowApi from '~/api/slideShowApi';
import Modal from '~/components/Modal';
import TableImage from '~/components/TableImage';
import { useLocation, useParams } from 'react-router-dom';

function EditSlideShowSub() {
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [showImgTbl, setShowImgTbl] = useState(false);
    const [statusImg, setStatusImg] = useState();
    const [imageSlide, setImageSlide] = useState([]);
    const [message, setMessage] = useState('');
    const [urlSlideShow, setUrlSlideShow] = useState();
    const [selectActive, setSelectActive] = useState();
    const params = useParams();
    const { state } = useLocation();
    const idShow = state.item.id;
    const idSlideMain = state.item.slideshow_id;
    const handleShowFormListImg = () => {
        setShowImgTbl(true);
        setStatusImg(false);
    };

    const handleShowFormImg = () => {
        setShowImgTbl(true);
        setStatusImg(true);
    };

    const handleGetImg = (img) => {
        setImageSlide(...img);
        setShowImgTbl(false);
    };
    const getSlide = async () => {
        const slide = state.item;
        setUrlSlideShow(slide?.url);
        setImageSlide(slide?.image);
        setSelectActive(slide?.is_active);

        // setLoading(false);
    };
    useEffect(() => {
        getSlide();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            slideshow_id: idSlideMain,
            slide_details_id: idShow,
            image: imageSlide,
            url: urlSlideShow,
            is_active: selectActive,
        };
        const EditSlideShowSub = async () => {
            try {
                const post = await slideShowApi.update(data);
                setMessStatus(post.status);
                setMessage(post.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('l???i khi th??m', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        EditSlideShowSub();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {showImgTbl && <TableImage closeForm={setShowImgTbl} actionOne={handleGetImg} status={statusImg} />}

            <div className="content__heading">
                <h2 className="content__heading--title">C???p nh???t ba??ng hi????u </h2>
                {/* <p className="content__heading--subtitle">Danh m???c</p> */}
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="btn__form">
                            <div className="input__group">
                                <div className="input__label">
                                    <label htmlFor="nameProduct">Url ba??ng hi????u</label>
                                </div>
                                <div className="input__text">
                                    <input
                                        value={urlSlideShow}
                                        id="nameProduct"
                                        type="text"
                                        className="input__text--ctrl"
                                        placeholder="Url ba??ng hi????u..."
                                        onChange={(e) => setUrlSlideShow(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="input__group">
                                <div className="input__label">
                                    <label htmlFor="imgProduct">Hi??nh ba??ng hi????u </label>
                                </div>
                                <div className="input__text list__img">
                                    {imageSlide ? (
                                        <div className="img__box" onClick={() => handleShowFormImg()}>
                                            <img className="img__box--item" src={imageSlide} />
                                        </div>
                                    ) : (
                                        <div className="img__choose" onClick={() => handleShowFormImg()}>
                                            Ch???n ???nh...
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="input__group">
                                <div className="input__label">
                                    <label htmlFor="ip-name">Tr???ng th??i</label>
                                </div>
                                <div className="input__text">
                                    <select
                                        value={selectActive}
                                        onChange={(e) => setSelectActive(e.target.value)}
                                        className="input__text--ctrl"
                                    >
                                        <option value="">Ch???n tr???ng th??i</option>
                                        <option value="0">Ch??a k??ch ho???t</option>
                                        <option value="1">??ang k??ch ho???t</option>
                                    </select>
                                </div>
                            </div>
                            <br></br>
                            <button className="btn__form--ctrl">C???p nh???t ba??ng hi????u</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditSlideShowSub;
