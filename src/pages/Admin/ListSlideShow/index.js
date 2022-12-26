import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import brandApi from '~/api/brandApi';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
import slideShowApi from '../../../api/slideShowApi';
import classNames from 'classnames/bind';
import style from '~/assets/scss/admin/Comment.module.scss';
const cx = classNames.bind(style);
function ListSlideShow() {
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

    const handleDelete = (id) => {
        setComfirm(true);
        deleteSlide.current = id;
    };
    const handleSelectActive = (e, id) => {
        e.preventDefault();
        const data = { slide_id_active: id, is_active: e.target.value };
        const EditStatusSlideMain = async () => {
            setLoading(true);
            try {
                const result = await slideShowApi.update(data);
                fetchSlideShows();
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

        EditStatusSlideMain();
    };
    const fetchSlideShows = async () => {
        setLoading(true);
        try {
            const resSlide = await slideShowApi.getSlideAdMain();
            setListSlideShowMain(resSlide.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSlideShows();
    }, []);

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteSlideMain = async () => {
                setLoading(true);
                try {
                    const deleteBrand = await slideShowApi.delete(deleteSlide.current);
                    setMessage(deleteBrand.message);
                    fetchSlideShows();
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
            deleteSlideMain();
        }
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục bảng hiệu chính</h2>
                <p className="content__heading--subtitle">Danh mục bảng hiệu chính</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên bảng hiệu chính</th>
                                    <th>Trạng thái</th>
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
                                                <option value="1">Đã kích hoạt</option>
                                                <option value="0">Chờ kích hoạt</option>
                                            </select>
                                        </td>
                                        <td className="text-center">
                                            <Link to={`/admin/slideshow/listdetails/${item.id}`}>Chi tiết</Link>
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

export default ListSlideShow;
