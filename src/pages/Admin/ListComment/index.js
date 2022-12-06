import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import storeApi from '~/api/storeApi';
import { Link } from 'react-router-dom';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';

const ListComment = () => {
    const [activePopupState, setActivePopupState] = useState();
    const [loading, setLoading] = useState(false);
    const [listStore, setListStore] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);

    const idStore = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idStore.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteStore = async () => {
                setLoading(true);
                try {
                    const result = await storeApi.delete(idStore.current);
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    const resultGetStore = await storeApi.getAll();
                    setListStore(resultGetStore.data);
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

    useEffect(() => {
        const fetchListColor = async () => {
            try {
                const result = await storeApi.getAll();
                setListStore(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch Store: ', error);
                setLoading(false);
            }
        };
        fetchListColor();
    }, []);
    console.log('activePopupState', activePopupState);
    const handleActivePopupState = () => {
        console.log('ádasdasdasdas');
        setActivePopupState(!activePopupState);
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                {!activePopupState ? (
                    <div
                        style={{
                            width: '1168px',
                            position: 'absolute',
                            height: '400px',
                            background: 'red',
                            borderRadius: '5px',
                        }}
                    >
                        <div>
                            {' '}
                            <div className="content__wrapper">
                                <div className="content__main">
                                    <div className="table__block">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nội dung</th>
                                                    <th>Người bình luận</th>
                                                    <th>Ngày bình luận</th>
                                                    <th>Trạng thái</th>
                                                    <th colSpan="2" className="text-center">
                                                        Thao tác
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>sản phẩm 456das4d65as</td>
                                                    <td>Cái đéo gì vậy trời ơi</td>

                                                    <td>2022-12-07</td>
                                                    {/* <td
                                                                  className={
                                                                      item.is_active == 1 ? 'active' : 'an__active'
                                                                  }
                                                              >
                                                                  {item.is_active == 1
                                                                      ? 'Đang hoạt động'
                                                                      : 'Nghừng hoạt động'}
                                                              </td> */}
                                                    <td>Chờ duyệt</td>
                                                    <td
                                                        className="text-center btn__tbl"
                                                        onClick={() => handleActivePopupState()}
                                                    >
                                                        Xóa
                                                    </td>
                                                </tr>
                                                {/* )) : false} */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={handleActivePopupState}
                            style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '56px' }}
                        >
                            &times;
                        </div>
                    </div>
                ) : (
                    ''
                )}
                <h2 className="content__heading--title">Danh sách bình luận</h2>
                <p className="content__heading--subtitle">Bình luận</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Sản phẩm</th>
                                    <th>Số lượt bình luận</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>sản phẩm 456das4d65as</td>
                                    <td>Cái đéo gì vậy trời ơi</td>
                                    {/* <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang hoạt động' : 'Nghừng hoạt động'}
                                              </td> */}

                                    <td className="text-center btn__tbl" onClick={() => handleActivePopupState()}>
                                        Chi tiết
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListComment;
