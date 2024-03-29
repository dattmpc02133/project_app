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
    const [openDetail, setOpenDetail] = useState();
    const [searchSlip, setSearchSlip] = useState('');
    useEffect(() => {
        const params = `?name=${searchSlip}`;
        if (searchSlip.length > 3) {
            getProImportSlip(params);
        } else if (searchSlip.length === 0) {
            getProImportSlip();
        }
    }, [searchSlip]);

    const getProImportSlip = async (params) => {
        try {
            const getAllImportSlip = await proImportSlip.getAllProductSlip(params);
            setImportSlip(getAllImportSlip.data);
            setPageSlip(getAllImportSlip.paginator);
        } catch (error) {
            console.log('Failed Product import slip', error);
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

    const handleSearch = (e) => {
        e.preventDefault();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}

            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục phiếu nhập</h2>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchSlip}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setSearchSlip(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tên cửa hàng</th>
                                    {/* <th>Tên Kho </th> */}
                                    <th>Tên sản phẩm</th>
                                    <th>Màu sản phẩm</th>
                                    <th>Tên biến thể</th>
                                    <th>Số lượng</th>
                                    <th>Giá tiền</th>
                                    <th>Ngày Nhập hàng</th>
                                    <th>Người Nhập hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {importSlip?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.name}</td>
                                        {/* <td>{item?.warehouse}</td> */}
                                        <td>{item?.details?.product_info?.name}</td>
                                        <td>{item?.details?.color?.name}</td>
                                        <td>{item?.details?.variant?.variant_product?.variant_name}</td>
                                        <td>{item?.details?.quantity_import}</td>
                                        <td>{item?.details?.price_import}</td>
                                        <td>{item?.created_at == null ? 'Null' : item?.created_at}</td>
                                        <td>{item?.created_by == null ? 'Null' : item?.created_by}</td>
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
