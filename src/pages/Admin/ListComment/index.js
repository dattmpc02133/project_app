import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import commentsApi from '../../../api/commentsAPi';
import { useMemo } from 'react';
import ImageUpload from '../../../components/ImageUpload';

import classNames from 'classnames/bind';
import style from '~/assets/scss/admin/Comment.module.scss';
const cx = classNames.bind(style);
const ListComment = () => {
    const { state } = useLocation();
    const { id: idProduct, comment: comment } = state;
    const [loading, setLoading] = useState(false);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);
    const [resultGetComment, setResultGetComment] = useState();
    const [render, setRender] = useState(false);
    const idComment = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idComment.current = id;
    };
    const handleSelectActive = (e, id, content) => {
        e.preventDefault();
        const data = { content: content, is_active: e.target.value };
        console.log('data', data);
        const EditStatusComment = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.update(data, id);
                // setResultGetComment(result);
                fetchListComment();
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

        EditStatusComment();
    };
    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteComment = async () => {
                setLoading(true);
                try {
                    const result = await commentsApi.delete(idComment.current);
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    setResultGetComment(resultGetComment);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to delete Comment ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            deleteComment();
        }
    };

    const fetchListComment = async () => {
        try {
            const result = await commentsApi.getAll();
            const responComment = result?.data.filter((item) => item.id == idProduct);
            setResultGetComment(responComment[0].comments);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListComment();
    }, []);
    // const ProductCommentById = useMemo(() => {
    //     const responComment = comment?.comments?.map((comment) => {
    //         console.log('comment', comment);
    //         return comment;
    //     });
    //     return responComment;
    // }, [idProduct, comment]);

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
                                {resultGetComment?.map(
                                    (item, index) => (
                                        console.log('item', item),
                                        (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.created_by}</td>
                                                    <td>{item.content}</td>
                                                    <td>
                                                        <form>
                                                            <select
                                                                onChange={(e) =>
                                                                    handleSelectActive(e, item.id, item.content)
                                                                }
                                                                value={item.is_active}
                                                                className={
                                                                    item.is_active == 1
                                                                        ? cx('input__ACTIVE')
                                                                        : cx('input__')
                                                                }
                                                            >
                                                                <option value="1">Đã duyệt</option>
                                                                <option value="0">Chờ duyệt</option>
                                                            </select>
                                                        </form>
                                                    </td>
                                                    <td className="text-center btn__tbl">
                                                        <Link to={`/admin/comment/listcommentreply/${item.id}`}>
                                                            Xem trả lời
                                                        </Link>
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
                                        )
                                    ),
                                )}
                            </tbody>
                            {/* <ImageUpload /> */}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListComment;
