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

    useEffect(() => {
        fetchCatePost();
    }, []);

    const fetchCatePost = async (params) => {
        try {
            setLoading(true);
            const result = await categoriesApi.getAll(params);
            setListCate(result.data.data);
            setPageCateProduct(result.data);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            setLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchCatePost(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageCateProudct?.last_page) {
            const pageId = page + 1;
            setPage(pageId);
            fetchCatePost(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchCatePost(`?page=${page}`);
    };

    const handleDelete = (id) => {
        setComfirm(true);
        deleteCatePosts.current = id;
    };

    const handleAction = (type) => {
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
                    const result = await categoriesApi.getAll();
                    setListCate(result.data.data);
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
                                                  <Link to={`/admin/categoriesproduct/edit/${item.id}`}>Sửa</Link>
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
                        totalPages={pageCateProudct?.last_page}
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
