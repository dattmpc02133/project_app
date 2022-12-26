import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
import slideShowApi from '~/api/slideShowApi';
function ListSlideShowSub() {
    const [listSlideShow, setListSlideShow] = useState();
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
    const fetchSlideShows = async () => {
        setLoading(true);
        try {
            const resSlide = await slideShowApi.getSlideAd();
            setListSlideShow(resSlide.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchSlideShows();
    }, []);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {/* {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />} */}
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
                                    <th>Tên bảng hiệu</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSlideShow?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/slideshow/listdetailsubs/${item.id}`}>Chi tiết</Link>
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

export default ListSlideShowSub;
