import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import catePostApi from '~/api/catePostApi';
import categoriesApi from '../../../api/categoriesApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
const ListCategoriesProduct = () => {
    const [loading, setLoading] = useState(false);
    const [listCate, setListCate] = useState([]);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [message, setMessage] = useState();
    const [modal, setModal] = useState(false);
    const [electCateFooter, setDeleteCatePost] = useState(false);
    const deleteCatePosts = useRef();
    const [comfirm, setComfirm] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCateProudct, setPageCateProduct] = useState([]);
    const [cateProduct, setCateProduct] = useState('');

    useEffect(() => {
        const params = `?name=${cateProduct}`;
        if (cateProduct.length > 2) {
            fetchCateProduct(params);
        } else if (cateProduct.length === 0) {
            fetchCateProduct();
        }
    }, [cateProduct]);

    const fetchCateProduct = async (params) => {
        try {
            // setLoading(true);
            const result = await categoriesApi.getAll(params);
            setListCate(result.data);
            setPageCateProduct(result.paginator);
            // setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            // setLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchCateProduct(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageCateProudct?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            fetchCateProduct(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchCateProduct(`?page=${page}`);
    };

    const handleDelete = (id) => {
        setComfirm(true);
        deleteCatePosts.current = id;
    };

    const handleAction = (type, params) => {
        if (type) {
            setComfirm(false);
            const deleteFooter = async () => {
                try {
                    const dltFooter = await categoriesApi.deleteCateProduct(deleteCatePosts.current);
                    setMessage(dltFooter.message);
                    console.log(dltFooter.message);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    const result = await categoriesApi.getAll(params);
                    setListCate(result.data);
                } catch (error) {
                    console.log('Failed to delete: ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            deleteFooter();
        }
    };

    const handleSearch = (e) => {
        console.log('e');
        e.preventDefault();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục sản phẩm</h2>
                <p className="content__heading--subtitle">Danh mục sản phẩm</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={cateProduct}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setCateProduct(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Trạng thái</th>
                                    <th>Người tạo</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listCate)
                                    ? listCate.map((item, index) => (
                                          <tr key={item.id}>
                                              <td>{9 * (page - 1) + index + 1}</td>
                                              <td>{item.name}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center">
                                                  <Link to={`/admin/categoriesproduct/edit/${item.id}/${item?.slug}`}>
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
                        totalPages={pageCateProudct?.totalPages}
                        handlePrevPage={handlePrevPage}
                        handleChangePage={handleChangePage}
                        handleNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListCategoriesProduct;
