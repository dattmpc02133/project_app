import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import commentsApi from '../../../api/commentsAPi';

import classNames from 'classnames/bind';
import style from '~/assets/scss/admin/Comment.module.scss';
import { CommentContext } from '~/Context/CommentContext';

const cx = classNames.bind(style);
const ListCommentReply = () => {
    const { fetchCommentCount } = useContext(CommentContext);
    const params = useParams();
    const [listReply, setListReply] = useState();
    const [loading, setLoading] = useState(false);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);
    const idStore = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idStore.current = id;
    };
    const fetchCommentsReply = async () => {
        try {
            const result = await commentsApi.getCommentById(params.id);
            setListReply(result.data);
            fetchCommentCount();
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Store: ', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCommentsReply();
    }, []);
    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteCommentReply = async () => {
                setLoading(true);
                try {
                    const result = await commentsApi.deleteRepcomment(idStore.current);
                    fetchCommentsReply();
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to delete store ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            deleteCommentReply();
        }
    };
    const handleSelectActive = (e, id, content) => {
        e.preventDefault();
        const data = { rep_id_comment: id, rep_comment: content, is_active: e.target.value };
        console.log('data', data);
        const EditStatusCommentReply = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.update(data, id);
                // set
                fetchCommentsReply();
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
        EditStatusCommentReply();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách bình luận</h2>
                <p className="content__heading--subtitle">Bình luận, sản phẩm</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Người bình luận</th>
                                    <th>Nội dung bình luận</th>
                                    <th>Trạng thái</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listReply?.map((item, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.user_reply}</td>
                                            <td>{item.rep_comment}</td>
                                            <td>
                                                <form key={index}>
                                                    <select
                                                        onChange={(e) =>
                                                            handleSelectActive(e, item.id, item.rep_comment)
                                                        }
                                                        value={item.is_active}
                                                        className={
                                                            item.is_active == 1 ? cx('input__ACTIVE') : cx('input__')
                                                        }
                                                    >
                                                        <option value="0">Chờ duyệt</option>
                                                        <option value="1">Đã duyệt</option>
                                                    </select>
                                                </form>
                                            </td>

                                            <td
                                                className="text-center btn__tbl"
                                                onClick={(e) => {
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                Xóa
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCommentReply;
