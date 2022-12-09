import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import commentsApi from '../../../api/commentsAPi';
import { useMemo } from 'react';
import ImageUpload from '../../../components/ImageUpload';

const ListComment = () => {
    const { state } = useLocation();
    const { id: idProduct, comment: comment } = state;
    console.log('idProduct', idProduct);
    const params = useParams();
    const idCommentReply = params?.id;
    const [selection, setSelection] = useState();

    const [loading, setLoading] = useState(false);
    const [listComments, setListComments] = useState();
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);

    const idStore = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idStore.current = id;
    };
    const handleSelectActive = (e, id, content) => {
        e.preventDefault();
        const data = { content: content, is_active: e.target.value };
        console.log('data', data);
        const EditStatusComment = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.update(data, id);
                console.log('result', result);
                // setMessStatus(result.status);
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
            const deleteStore = async () => {
                setLoading(true);
                try {
                    const result = await commentsApi.delete(idStore.current);
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    // set
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
            deleteStore();
        }
    };

    const ProductCommentById = useMemo(() => {
        const responComment = comment?.comments?.map((comment) => {
            comment.active = false;
            return comment;
        });
        return responComment;
    }, [idProduct, comment]);

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
                                {Array.isArray(ProductCommentById)
                                    ? ProductCommentById?.map((item, index) => (
                                          <>
                                              <tr key={item.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{item.user_id}</td>
                                                  <td>{item.content}</td>
                                                  <td>
                                                      <form>
                                                          <select
                                                              onChange={(e) =>
                                                                  handleSelectActive(e, item.id, item.content)
                                                              }
                                                              className="input__text--ctrl"
                                                          >
                                                              <option value="0">Chờ duyệt</option>
                                                              <option value="1">Đã duyệt</option>
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
                                      ))
                                    : false}
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
