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
function ListSlideShowDetailSubs() {
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
    console.log(' param.id', param.id);
    const fetchSlideShowsDetailSubs = async () => {
        setLoading(true);
        try {
            const resSlide = await slideShowApi.getSlideAd();
            const SlideById = resSlide.data.filter((slide) => slide.id == param.id);
            setListSlideShowMain(SlideById[0].slideshow);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSlideShowsDetailSubs();
    }, []);

    const handleSelectActive = (e, id) => {
        e.preventDefault();
        const data = { category_id: param.id, slide_id: id, is_active: e.target.value };
        const EditStatusSlideSub = async () => {
            setLoading(true);
            try {
                const result = await slideShowApi.updateSub(data);
                fetchSlideShowsDetailSubs();
                setMessStatus(result.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
            } catch (error) {
                console.log('Failed to Edit: ', error);
                const res = error.response.data;
                setMessStatus(res.message);
                setLoading(false);
                setModal(true);
                setStatusHandle(false);
            }
        };

        EditStatusSlideSub();
    };
    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteSlides = async () => {
                setLoading(true);
                try {
                    const deleteBrand = await slideShowApi.delete(deleteSlide.current);
                    setMessage(deleteBrand.message);
                    fetchSlideShowsDetailSubs();
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                } catch (error) {
                    console.log('lỗi khi xóa', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setStatusHandle(false);
                    setModal(true);
                    setLoading(false);
                }
            };
            deleteSlides();
        }
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục bảng hiệu phụ</h2>
                <p className="content__heading--subtitle">Danh mục bảng hiệu phụ</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên bảng hiệu phụ</th>
                                    <th>Trạng thái</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSlideShowMain?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.title}</td>
                                        <td>
                                            <select
                                                onChange={(e) => handleSelectActive(e, item.id, item.content)}
                                                value={item?.is_active}
                                                className={item.is_active == 1 ? cx('input__ACTIVE') : cx('input__')}
                                            >
                                                <option value="1">Đã duyệt</option>
                                                <option value="0">Chờ duyệt</option>
                                            </select>
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                to={`/admin/slideshow/listdetailsubslide/${item.id}`}
                                                state={{ item }}
                                            >
                                                Xem
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                Xóa
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

export default ListSlideShowDetailSubs;
