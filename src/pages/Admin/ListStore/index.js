import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import storeApi from '~/api/storeApi';
import { Link } from 'react-router-dom';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

const ListStore = () => {
    const [loading, setLoading] = useState(false);
    const [listStore, setListStore] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);

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

    const fetchListColor = async () => {
        try {
            const result = await storeApi.getAll();
            console.log('result', result);
            setPagination(result.paginator.totalPages);
            setListStore(result.data);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Store: ', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchListColor();
    }, []);

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchListColor(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        console.log(pagination);
        if (page < pagination) {
            const pageId = page + 1;
            setPage(pageId);
            fetchListColor(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchListColor(`?page=${page}`);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách cửa hàng, showroom</h2>
                <p className="content__heading--subtitle">Cửa hàng, showroom</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên cửa hàng</th>
                                    <th>Kho hàng</th>
                                    <th>Tỉnh, thành phố</th>
                                    <th>Quận, huyện</th>
                                    <th>Phường xã</th>
                                    <th>Trạng thái</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listStore)
                                    ? listStore.map((item, index) => (
                                          <tr key={item.id}>
                                              <td>{10 * (page - 1) + index + 1}</td>
                                              <td>{item.name}</td>
                                              <td>{item.warehouse}</td>
                                              <td>{item.province}</td>
                                              <td>{item.district}</td>
                                              <td>{item.ward}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang hoạt động' : 'Nghừng hoạt động'}
                                              </td>
                                              <td className="text-center btn__tbl">
                                                  <Link to={`/admin/store/edit/${item.id}`}>Sửa</Link>
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
                                      ))
                                    : false}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        curentPage={page}
                        totalPages={pagination}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListStore;
