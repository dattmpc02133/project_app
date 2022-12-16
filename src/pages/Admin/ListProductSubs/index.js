import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import catePostApi from '~/api/catePostApi';
import categoriesApi from '../../../api/categoriesApi';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';

function ListProductSubs() {
    const [comfirm, setComfirm] = useState(false);
    const [subsAll, setSubsAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [pageSubsProduct, setPageSubsProduct] = useState([]);
    const [page, setPage] = useState(1);
    const deletcSubs = useRef();

    useEffect(() => {
        getAllSubsProduct();
    }, []);

    const getAllSubsProduct = async (params) => {
        try {
            const allSubs = await categoriesApi.getAllSubsProduct(params);
            setSubsAll(allSubs.data.data);
            setPageSubsProduct(allSubs.data);
            console.log(allSubs.data);
        } catch (error) {
            console.log('lỗi lấy danh sách', error);
        }
    };

    const handleDelete = (id) => {
        setComfirm(true);
        deletcSubs.current = id;
    };

    const handleAction = (type, params) => {
        if (type) {
            setComfirm(false);
            const getDeletSubs = async () => {
                try {
                    const deletesSubs = await catePostApi.deleteSubs(deletcSubs.current);
                    setMessage(deletesSubs.status);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    const allSubs = await categoriesApi.getAllSubsProduct(params);
                    setSubsAll(allSubs.data.data);
                } catch (error) {
                    console.log('lỗi khi xóa', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setStatusHandle(false);
                    setModal(true);
                    setLoading(false);
                }
            };
            getDeletSubs();
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getAllSubsProduct(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageSubsProduct?.last_page) {
            const pageId = page + 1;
            setPage(pageId);
            getAllSubsProduct(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getAllSubsProduct(`?page=${page}`);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục Subs</h2>
                <p className="content__heading--subtitle">Danh mục Subs</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Subs</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subsAll?.map((items, index) => (
                                    <tr key={index}>
                                        <td>{9 * (page - 1) + index + 1}</td>
                                        <td>{items.name}</td>

                                        <td className={items.is_active == 1 ? 'active' : 'an__active'}>
                                            {items.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>
                                        <td>{items.updated_by == null ? 'Null' : items.updated_by}</td>
                                        <td>{items.updated_by == null ? 'Null' : items.updated_by}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/productsub/edit/${items.id}`} state={{ items }}>
                                                Sửa
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                onClick={() => {
                                                    handleDelete(items.id);
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
                    <Pagination
                        curentPage={page}
                        totalPages={pageSubsProduct?.last_page}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListProductSubs;
