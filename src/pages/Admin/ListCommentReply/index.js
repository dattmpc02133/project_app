import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import commentsApi from '../../../api/commentsAPi';
import { useMemo } from 'react';
import ImageUpload from '../../../components/ImageUpload';

const ListCommentReply = () => {
    const params = useParams();
    const [listReply, setListReply] = useState();
    const [selection, setSelection] = useState();
    const [selectActive, setSelectActive] = useState();

    const [loading, setLoading] = useState(false);
    const [listComments, setListComments] = useState();
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);

    const idStore = useRef();
    console.log('idStore', idStore);
    const handleDelete = (id) => {
        setComfirm(true);
        console.log(' idStore.current ', idStore.current);
        idStore.current = id;
    };
    useEffect(() => {
        const fetchCommentsReply = async () => {
            try {
                const result = await commentsApi.getCommentById(params.id);
                console.log('result', result);
                setListReply(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch Store: ', error);
                setLoading(false);
            }
        };
        fetchCommentsReply();
    }, []);
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
    const handleSelectActive = (e, id, content) => {
        e.preventDefault();
        const data = { rep_id_comment: id, rep_comment: content, is_active: e.target.value };
        console.log('data', data);
        const EditStatusCommentReply = async () => {
            setLoading(true);
            try {
                const result = await commentsApi.update(data, id);
                console.log('result', result);
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
                                {Array.isArray(listReply)
                                    ? listReply?.map(
                                          (item, index) => (
                                              console.log('item', item),
                                              (
                                                  <>
                                                      <tr key={index}>
                                                          <td>{index + 1}</td>
                                                          <td>{item.user_reply}</td>
                                                          <td>{item.rep_comment}</td>
                                                          <td>
                                                              <form key={index}>
                                                                  <select
                                                                      onChange={(e) =>
                                                                          handleSelectActive(
                                                                              e,
                                                                              item.id,
                                                                              item.rep_comment,
                                                                          )
                                                                      }
                                                                      className="input__text--ctrl"
                                                                  >
                                                                      <option value="0">Chờ duyệt</option>
                                                                      <option value="1">Đã duyệt</option>
                                                                  </select>
                                                              </form>
                                                          </td>

                                                          <td
                                                              className="text-center btn__tbl"
                                                              onClick={(e) => {
                                                                  handleDelete(item.id_comment);
                                                              }}
                                                          >
                                                              Xóa
                                                          </td>
                                                      </tr>
                                                  </>
                                              )
                                          ),
                                      )
                                    : false}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCommentReply;
