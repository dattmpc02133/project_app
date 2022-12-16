import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import footerApi from '../../../api/footerApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
function ListContact() {
    const [comfirm, setComfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [dl, setDeleteContactFooter] = useState(false);
    const [modal, setModal] = useState(false);
    const [ListContact, setListContact] = useState([]);
    const deleteContact = useRef();
    useEffect(() => {
        const fetchContact = async () => {
            setLoading(true);
            try {
                const result = await footerApi.getAllContact();
                setListContact(result.data);
                setLoading(false);
                console.log('data', result.data);
            } catch (error) {
                console.log('Không thành công: ', error);
                setLoading(false);
            }
        };

        fetchContact();
    }, []);

    const handleDelete = (id) => {
        setComfirm(true);
        deleteContact.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const delContact = async () => {
                try {
                    const dltFooter = await footerApi.deleteContact(deleteContact.current);
                    setMessage(dltFooter.message);
                    const result = await footerApi.getAllContact();
                    setListContact(result.data);
                    setMessStatus(result.status);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                } catch (error) {
                    console.log('Lỗi xóa', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            delContact();
        }
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục liên hệ</h2>
                <p className="content__heading--subtitle">Danh mục liên hệ</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Dịch vụ</th>
                                    <th>Số diện thoại</th>
                                    <th>Thời gian liên hệ</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(ListContact)
                                    ? ListContact.map((item, index) => (
                                          <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>{item.name_category}</td>
                                              <td>{item.name}</td>
                                              <td>{item.phone}</td>
                                              <td>{item.time}</td>
                                              {/* <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td> */}
                                              {/* <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td> */}
                                              <td className="text-center">
                                                  <Link to={`/admin/contact/edit/${item.id}`} state={{ item }}>
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
                                      ))
                                    : false}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListContact;
