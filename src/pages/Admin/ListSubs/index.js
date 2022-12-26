import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import catePostApi from '~/api/catePostApi';
import Pagination from '~/components/Pagination';
import Dialog from '~/components/Dialog';

function ListSubs() {
    const [subsAll, setSubsAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [deleteSubs, SetDeleteSubs] = useState();
    const [page, setPage] = useState(1);
    const [pageSubsPost, setPageSubsPost] = useState([]);
    const deletcSubs = useRef();
    const [comfirm, setComfirm] = useState(false);
    const [cateSubs, setCateSubs] = useState('');

    useEffect(() => {
        const params = `?name=${cateSubs}`;
        if (cateSubs.length > 3) {
            getAllSubs(params);
        } else if (cateSubs.length === 0) {
            getAllSubs();
        }
    }, [cateSubs]);

    const getAllSubs = async (params) => {
        try {
            const allSubs = await catePostApi.getAllSubsPost(params);
            setSubsAll(allSubs.data);
            setPageSubsPost(allSubs.paginator);
            console.log(allSubs);
        } catch (error) {
            console.log('lỗi lấy danh sách', error);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getAllSubs(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageSubsPost?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getAllSubs(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getAllSubs(`?page=${page}`);
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
                    setMessStatus(deletesSubs.status);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    getAllSubs(params);
                } catch (error) {
                    console.log('lỗi khi xóa', error);
                    const res = error.response.data;
                    console.log(res);
                    setMessStatus(res.message);
                    setStatusHandle(false);
                    setModal(true);
                    setLoading(false);
                }
            };
            getDeletSubs();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
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
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={cateSubs}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setCateSubs(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
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
                                {/* {subsAll?.map((item) => */}
                                {subsAll.map((items, index) => (
                                    <tr key={index}>
                                        <td>{9 * (page - 1) + index + 1}</td>
                                        <td>{items.name}</td>

                                        <td className={items.is_active == 1 ? 'active' : 'an__active'}>
                                            {items.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>
                                        <td>{items.updated_by == null ? 'Null' : items.updated_by}</td>
                                        <td>{items.updated_by == null ? 'Null' : items.updated_by}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/Subs/edit/${items.id}/${items.slug}`} state={{ items }}>
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
                                {/* {subsAll?.subs?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category_id}</td>

                                        <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                            {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>
                                        <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                        <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/Subs/edit/${item.id}`} state={{ item }}>
                                                Sửa
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
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        curentPage={page}
                        totalPages={pageSubsPost?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListSubs;
