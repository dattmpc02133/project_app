import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
import slideShowApi from '../../../api/slideShowApi';
import classNames from 'classnames/bind';
import style from '~/assets/scss/admin/Comment.module.scss';
const cx = classNames.bind(style);
function ListSlideShowDetails() {
    const [listSlideShowMain, setListSlideShowMain] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [deleteBrand, SetDeleteBrand] = useState();
    const [comfirm, setComfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [pageBrand, setPageBrand] = useState([]);
    const deleteSlide = useRef();
    const param = useParams();
    const handleDelete = (id) => {
        setComfirm(true);
        deleteSlide.current = id;
    };
    const fetchSlideShowsDetails = async () => {
        setLoading(true);
        try {
            const resSlide = await slideShowApi.getSlideAdMain();
            const SlideById = resSlide.data.filter((slide) => slide.id == param.id);
            setListSlideShowMain(SlideById[0]?.details);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSlideShowsDetails();
    }, []);

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteSlideMain = async () => {
                setLoading(true);
                try {
                    const deleteBrand = await slideShowApi.deleteDetails(deleteSlide.current);
                    setMessage(deleteBrand.message);
                    fetchSlideShowsDetails();
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                } catch (error) {
                    console.log('l???i khi x??a', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setStatusHandle(false);
                    setModal(true);
                    setLoading(false);
                }
            };
            deleteSlideMain();
        }
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh s??ch danh m???c ba??ng hi????u chi ti????t</h2>
                <p className="content__heading--subtitle">Danh m???c ba??ng hi????u chi??nh</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hi??nh ba??ng hi????u</th>
                                    <th>Url ba??ng hi????u</th>
                                    <th colSpan="2" className="text-center">
                                        Thao t??c
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSlideShowMain?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img style={{ width: '300px' }} src={item?.image} />
                                        </td>
                                        <td>{item?.url}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/slideshow/edit/${item.id}`} state={{ item }}>
                                                S????a
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                X??a
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListSlideShowDetails;
