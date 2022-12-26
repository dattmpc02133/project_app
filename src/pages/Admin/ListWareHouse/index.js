import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import wareHouseApi from '~/api/wareHouseApi';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

const ListWareHouse = () => {
    const [loading, setLoading] = useState(false);
    const [listWareHouse, setListWareHouse] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);
    const [searchWareHouse, setSearchWareHouse] = useState('');
    const idWarehouse = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idWarehouse.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteWareHouse = async () => {
                setLoading(true);
                try {
                    const result = await wareHouseApi.delete(idWarehouse.current);
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    const resultGetWarehouse = await wareHouseApi.getAll();
                    setListWareHouse(resultGetWarehouse.data);
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
            deleteWareHouse();
        }
    };

    const fetchWareHouse = async (params) => {
        // setLoading(true);
        try {
            const result = await wareHouseApi.getAll(params);
            setPagination(result.paginator.totalPages);
            setListWareHouse(result.data);
            console.log('setListWareHouse', setListWareHouse);
            // setLoading(false);
        } catch (error) {
            console.log('Failed to fetch WareHouse: ', error);
            // setLoading(false);
        }
    };

    useEffect(() => {
        const params = `?name=${searchWareHouse}`;
        if (searchWareHouse.length > 3) {
            fetchWareHouse(params);
        } else if (searchWareHouse.length === 0) {
            fetchWareHouse();
        }
    }, [searchWareHouse]);

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchWareHouse(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        console.log(pagination);
        if (page < pagination) {
            const pageId = page + 1;
            setPage(pageId);
            fetchWareHouse(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchWareHouse(`?page=${page}`);
    };

    const handleSearch = (e) => {
        e.preventdefault();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách kho hàng</h2>
                <p className="content__heading--subtitle">Kho hàng</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchWareHouse}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setSearchWareHouse(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên kho</th>
                                    <th>Tỉnh, thành phố</th>
                                    <th>Quận, huyện</th>
                                    <th>Phường, xã</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listWareHouse) &&
                                    listWareHouse.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{10 * (page - 1) + index + 1}</td>
                                            <td>
                                                <Link to={`/admin/warehouse/store/${item.id}`}>{item.name}</Link>
                                            </td>
                                            <td>{item.province}</td>
                                            <td>{item.district}</td>
                                            <td>{item.ward_id}</td>
                                            <td>{item.address}</td>
                                            <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                            </td>
                                            <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                            <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                            <td className="text-center btn__tbl">
                                                <Link to={`/admin/warehouse/edit/${item.id}`}>Sửa</Link>
                                            </td>
                                            <td
                                                className="text-center btn__tbl"
                                                onClick={() => {
                                                    handleDelete(item.id);
                                                }}
                                            >
                                                Xóa
                                            </td>
                                        </tr>
                                    ))}
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

export default ListWareHouse;
