import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import catePostApi from '~/api/catePostApi';
import categoriesApi from '../../../api/categoriesApi';

function ListProductSubs() {
    const [subsAll, setSubsAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [deleteSubs, SetDeleteSubs] = useState();

    const deletcSubs = useRef();

    useEffect(() => {
        const getAllSubs = async () => {
            try {
                const allSubs = await categoriesApi.getAll();
                setSubsAll(allSubs.data);
                console.log('sub', allSubs.data);
            } catch (error) {
                console.log('lỗi lấy danh sách', error);
            }
        };
        getAllSubs();
    }, []);

    const handleDelete = (id) => {
        console.log('id', id);
        SetDeleteSubs(true);
        deletcSubs.current = id;
        const getDeletSubs = async () => {
            try {
                const deletesSubs = await catePostApi.deleteSubs(deletcSubs.current);
                setMessage(deletesSubs.status);
                setStatusHandle(true);
                setModal(true);
                setLoading(false);
                const allSubs = await categoriesApi.getAll();
                setSubsAll(allSubs.data);
            } catch (error) {
                console.log('lỗi khi xóa', error);
                const res = error.response.data;
                console.log(res);
                setMessStatus(res.message);
                setStatusHandle(false);
                setModal(true);
                setLoading(false);
            }
        };
        getDeletSubs();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục Subs</h2>
                <p className="content__heading--subtitle">Danh mục Subs</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Subs</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subsAll?.map((item, index) =>
                                    item.subs.map((items, i) => (
                                        <tr key={items.id}>
                                            <td>{i + 1}</td>
                                            <td>{items.name}</td>

                                            <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                {items.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                            </td>
                                            <td>{items.updated_by == null ? 'Null' : items.updated_by}</td>
                                            <td>{items.updated_by == null ? 'Null' : items.updated_by}</td>
                                            <td className="text-center">
                                                <Link to={`/admin/productsub/edit/${items.id}`} state={{ items }}>
                                                    Sửa
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    onClick={() => {
                                                        handleDelete(items.id);
                                                    }}
                                                >
                                                    Xóa
                                                </Link>
                                            </td>
                                        </tr>
                                    )),
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProductSubs;
