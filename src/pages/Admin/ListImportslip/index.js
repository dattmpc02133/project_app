import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import proImportSlip from '../../../api/proImportSlip';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';

function ListImportslip() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [importSlip, setImportSlip] = useState([]);
    const [pageSlip, setPageSlip] = useState([]);
    useEffect(() => {
        getProImportSlip();
    }, []);
    const getProImportSlip = async (params) => {
        setLoading(true);
        try {
            const getAllImportSlip = await proImportSlip.getAllProductSlip(params);
            setImportSlip(getAllImportSlip.data);
            setPageSlip(getAllImportSlip.paginator);
            setLoading(false);
        } catch (error) {
            console.log('Failed Product import slip', error);
            setLoading(false);
        }
    };
    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getProImportSlip(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageSlip?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getProImportSlip(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getProImportSlip(`?page=${page}`);
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}

            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục phiếu nhập</h2>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên cửa hàng</th>
                                    <th>Tên Kho </th>
                                    <th>Ngày Nhập hàng</th>
                                    <th>Người Nhập hàng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {importSlip?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.warehouse}</td>
                                        {/* <td>{item.subcategory_id}</td> */}
                                        <td>{item?.created_at == null ? 'Null' : item?.created_at}</td>
                                        <td>{item?.created_by == null ? 'Null' : item?.created_by}</td>
                                        <td>
                                            <Link
                                                to={`/admin/importslipdetail/list/${item?.id}/${item.code}`}
                                                state={item.id}
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
                        totalPages={pageSlip?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListImportslip;
