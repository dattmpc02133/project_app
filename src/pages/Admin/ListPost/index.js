import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import postApi from '../../../api/postApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
function ListPost() {
    const [comfirm, setComfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
    const deletePost = useRef();
    const [postDelete, setPostDelete] = useState(false);
    const [pagePost, setPagePost] = useState([]);
    const [page, setPage] = useState(1);
    const [allPost, setAllPost] = useState([]);
    const handleDelete = (id) => {
        setComfirm(true);
        deletePost.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteFooter = async () => {
                try {
                    const dltFooter = await postApi.deletePost(deletePost.current);
                    setMessage(dltFooter.message);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    const allPosts = await postApi.getAll();
                    setAllPost(allPosts.data);
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

    useEffect(() => {
        getAllPost();
    }, []);

    const getAllPost = async (params) => {
        try {
            const allPosts = await postApi.getAll(params);
            setAllPost(allPosts.data);
            setPagePost(allPosts.paginator);
        } catch (error) {
            console.log('Lỗi lất tin tức', error);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getAllPost(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pagePost?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getAllPost(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getAllPost(`?page=${page}`);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách bài viết</h2>
                <p className="content__heading--subtitle">bài viết</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title bài viết</th>
                                    <th>Tên danh mục</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    {/* <th>Người cập nhật</th> */}
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPost?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{10 * (page - 1) + index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.category_name}</td>
                                        <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                            {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>
                                        <td>{item.author == null ? 'Null' : item.author}</td>
                                        {/* <td>{item.updated_by == null ? 'Null' : item.updated_by}</td> */}
                                        <td className="text-center">
                                            <Link to={`/admin/post/edit/${item.id}/${item.slug}`} state={{ item }}>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {allPost?.length != 0 && (
                        <Pagination
                            curentPage={page}
                            totalPages={pagePost?.totalPages}
                            handlePrevPage={handlePrevPage}
                            handleChangePage={handleChangePage}
                            handleNextPage={handleNextPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListPost;
