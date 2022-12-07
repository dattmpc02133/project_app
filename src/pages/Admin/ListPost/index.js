import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import postApi from '../../../api/postApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';

const ListPost = () => {
    const [loading, setLoading] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
    const deletePost = useRef();
    const [postDelete, setPostDelete] = useState(false);

    const handleDelete = (id) => {
        setPostDelete(true);
        deletePost.current = id;
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
    };

    const [allPost, setAllPost] = useState([]);

    useEffect(() => {
        const getAllPost = async () => {
            try {
                const allPosts = await postApi.getAll();
                setAllPost(allPosts.data);
                console.log('data', allPosts.data);
            } catch (error) {
                console.log('Lỗi lất tin tức', error);
            }
        };
        getAllPost();
    }, []);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
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
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPost?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        {/* <td>{item.}</td> */}
                                        <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                            {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>
                                        <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                        <td>{item.created_by == null ? '' : item.created_by}</td>
                                        <td className="text-center">
                                            <Link to={`/admin/post/edit/${item.id}`} state={{ item }}>
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
                </div>
            </div>
        </div>
    );
};

export default ListPost;
