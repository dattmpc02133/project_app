import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import colorApi from '~/api/colorApi';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';

const ListColor = () => {
    const [loading, setLoading] = useState(false);
    const [listCorlor, setListColor] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);

    const idColor = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idColor.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteColor = async () => {
                setLoading(true);
                try {
                    const result = await colorApi.delete(idColor.current);
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    const resultGetColor = await colorApi.getAll();
                    setListColor(resultGetColor.data);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to delete color ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            deleteColor();
        }
    };

    useEffect(() => {
        const fetchListColor = async () => {
            try {
                const result = await colorApi.getAll();
                setListColor(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch Categories: ', error);
                setLoading(false);
            }
        };
        fetchListColor();
    }, []);
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách Màu sắc</h2>
                <p className="content__heading--subtitle">Sản phẩm</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên màu sắc</th>
                                    <th>Mã màu</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listCorlor)
                                    ? listCorlor.map((item, index) => (
                                          <tr key={item.id}>
                                              <td>{index}</td>
                                              <td>{item.name}</td>
                                              <td>{item.color_code}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center btn__tbl">Sửa</td>
                                              <td
                                                  className="text-center btn__tbl"
                                                  onClick={(e) => {
                                                      handleDelete(item.id);
                                                  }}
                                              >
                                                  Xóa
                                              </td>
                                          </tr>
                                      ))
                                    : false}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListColor;
