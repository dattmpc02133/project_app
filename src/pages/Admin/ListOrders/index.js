import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import cartApi from '../../../api/cartApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

const ListOrders = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [listOrder, setListOrder] = useState();
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async (params) => {
        setLoading(true);
        try {
            const result = await cartApi.getAllOrders(params);
            // setAllPost(allOrders.data);
            console.log('data', result);
            setListOrder(result.data);
            setPagination(result.paginator);
            setLoading(false);
        } catch (error) {
            console.log('Failed to get orders', error);
            setLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getOrders(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pagination?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getOrders(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getOrders(`?page=${page}`);
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {/* {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />} */}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách đơn hàng</h2>
                <p className="content__heading--subtitle">Đơn hàng</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Mã đơn hàng</th>
                                    <th>SĐT</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Trạng thái</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {setIndexItem(countItem * page - countItem)} */}
                                {listOrder?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{10 * (page - 1) + index + 1}</td>
                                        <td>{item.code}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.created_at}</td>
                                        <td>{item.status_name}</td>

                                        <td className="text-center">
                                            <Link
                                                className={'btn__tbl'}
                                                to={`/admin/orders/details/${item.id}/${item.code}`}
                                                state={{ item }}
                                            >
                                                Chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        curentPage={page}
                        totalPages={pagination?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListOrders;
