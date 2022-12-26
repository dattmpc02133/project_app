import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import brandApi from '~/api/brandApi';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
function ListBrand() {
    const [brandAll, setBrandAll] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [deleteBrand, SetDeleteBrand] = useState();
    const [comfirm, setComfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [pageBrand, setPageBrand] = useState([]);
    const deleteBrands = useRef();
    const [searchBrand, setSearchBrand] = useState('');

    useEffect(() => {
        const params = `?name=${searchBrand}`;

        if (searchBrand.length > 3) {
            getAllBrand(params);
        } else if (searchBrand.length === 0) {
            getAllBrand();
        }
    }, [searchBrand]);

    const getAllBrand = async (params) => {
        try {
            const allBrands = await brandApi.getAll(params);
            setBrandAll(allBrands.data);
            console.log(allBrands);
            setPageBrand(allBrands.paginator);
        } catch (error) {
            console.log('lỗi lấy danh sách', error);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            getAllBrand(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageBrand?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            getAllBrand(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        getAllBrand(`?page=${page}`);
    };

    const handleDelete = (id) => {
        setComfirm(true);
        deleteBrands.current = id;
    };

    const handleAction = (type, params) => {
        if (type) {
            setComfirm(false);
            const getDeletBrand = async () => {
                setLoading(true);
                try {
                    const deleteBrand = await brandApi.delete(deleteBrands.current);
                    setMessStatus(deleteBrand.message);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    getAllBrand(params);
                } catch (error) {
                    console.log('lỗi khi xóa', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setStatusHandle(false);
                    setModal(true);
                    setLoading(false);
                }
            };
            getDeletBrand();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục thương hiệu</h2>
                <p className="content__heading--subtitle">Danh mục thương hiệu</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchBrand}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setSearchBrand(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên thương hiệu</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(brandAll)
                                    ? brandAll.map((item, index) => (
                                          <tr key={item.id}>
                                              <td>{9 * (page - 1) + index + 1}</td>
                                              <td>{item.brand_name}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center">
                                                  <Link
                                                      to={`/admin/brand/edit/${item?.id}/${item?.slug}`}
                                                      state={{ item }}
                                                  >
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
                    <Pagination
                        curentPage={page}
                        totalPages={pageBrand?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListBrand;
