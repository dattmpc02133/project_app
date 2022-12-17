import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useEffect, useState } from 'react';
import logoApi from '../../../api/logoApi';
import Modal from '~/components/Modal';
import TableImage from '~/components/TableImage';
import { useParams } from 'react-router-dom';

function EditLogo() {
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [showImgTbl, setShowImgTbl] = useState(false);
    const [statusImg, setStatusImg] = useState();
    const [logo, setLogo] = useState([]);
    const [message, setMessage] = useState('');

    const handleShowFormListImg = () => {
        setShowImgTbl(true);
        setStatusImg(false);
    };

    const handleShowFormImg = () => {
        setShowImgTbl(true);
        setStatusImg(true);
    };

    const handleGetImg = (img) => {
        setLogo(...img);
        setShowImgTbl(false);
    };

    const params = useParams();

    useEffect(() => {
        const getByIdLogo = async () => {
            setLoading(true);
            try {
                const logoId = await logoApi.getById(params.id);
                console.log(logoId.data, 'id');
                setLogo(logoId.data.image);
                setLoading(false);
            } catch (error) {
                console.log('Failed to get logo', error);
            }
        };
        getByIdLogo();
    }, []);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const data = {
            image: logo,
        };

        const editLogo = async () => {
            try {
                const post = await logoApi.editLogo(data, params.id);
                setMessStatus(post.status);
                setMessage(post.message);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('lỗi khi thêm', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };
        editLogo();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            {showImgTbl && <TableImage closeForm={setShowImgTbl} actionOne={handleGetImg} status={statusImg} />}

            <div className="content__heading">
                <h2 className="content__heading--title">Cập nhật Logo </h2>
                {/* <p className="content__heading--subtitle">Danh mục</p> */}
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form onSubmit={(e) => handleSubmit(e)} className="form__content">
                        <div className="btn__form">
                            <div className="input__group">
                                <div className="input__label">
                                    <label htmlFor="imgProduct">Logo </label>
                                </div>
                                <div className="input__text list__img">
                                    {logo ? (
                                        <div className="img__box" onClick={() => handleShowFormImg()}>
                                            <img className="img__box--item" src={logo} />
                                        </div>
                                    ) : (
                                        <div className="img__choose" onClick={() => handleShowFormImg()}>
                                            Chọn ảnh...
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="btn__form--ctrl">Cập nhật Logo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditLogo;
