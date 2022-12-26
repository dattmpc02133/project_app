import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import catePostApi from '~/api/catePostApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
import loginApi from '~/api/loginApi';

function ListCatePost() {
    const [loading, setLoading] = useState(false);
    const [listCate, setListCate] = useState([]);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [message, setMessage] = useState();
    const [modal, setModal] = useState(false);
    const [pageCatePost, setPageCatePost] = useState([]);
    const deleteCatePosts = useRef();
    const [comfirm, setComfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [searchUser, setSearchUser] = useState('');

    const fetchCatePost = async (params) => {
        // setLoading(true);
        try {
            const result = await loginApi.getAllUser(params);
            setListCate(result.data);
            setPageCatePost(result.paginator);
            // setLoading(false);
        } catch (error) {
            console.log('Failed to fetch user: ', error);
            // setLoading(false);
        }
    };

    useEffect(() => {
        const params = `?name=${searchUser}`;
        if (searchUser.length > 3) {
            fetchCatePost(params);
        } else if (searchUser.length === 0) {
            fetchCatePost();
        }

        // getSearchCate();
    }, [searchUser]);

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchCatePost(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageCatePost?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            fetchCatePost(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchCatePost(`?page=${page}`);
    };

    const handleDelete = (id) => {
        setComfirm(true);
        console.log(id);
        deleteCatePosts.current = id;
    };

    const handleAction = (type, params) => {
        if (type) {
            setComfirm(false);
            const deleteFooter = async () => {
                try {
                    const dltFooter = await loginApi.deleteUser(deleteCatePosts.current);
                    setMessStatus(dltFooter.status);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    fetchCatePost(params);
                } catch (error) {
                    console.log('Failed to delete: ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            deleteFooter();
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
                <h2 className="content__heading--title">Danh sách khách hàng</h2>
                {/* <p className="content__heading--subtitle">Danh mục tin tức</p> */}
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchUser}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setSearchUser(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Số điện thoại </th>
                                    <th>Tỉnh/thành phố</th>
                                    <th>Quận/Huyện</th>
                                    <th>Phưỡng xã</th>
                                    <th>địa chỉ</th>
                                    <th>Trạng thái</th>
                                    {/* <th>Người tạo</th>
                                    <th>Người cập nhật</th> */}
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCate?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{10 * (page - 1) + index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.province}</td>
                                        <td>{item.district}</td>
                                        <td>{item.ward}</td>
                                        <td>{item.address}</td>
                                        <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                            {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>
                                        {/* <td></td>
                                        <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                        <td>{item.updated_by == null ? 'Null' : item.updated_by}</td> */}
                                        <td className="text-center">
                                            <Link to={`/admin/account/edit/${item?.id}/${item?.slug}`}>Sửa</Link>
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
                    <Pagination
                        curentPage={page}
                        totalPages={pageCatePost?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListCatePost;
