import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import footerApi from '../../../api/footerApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
function ListCatePost() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [listCate, setListCate] = useState([]);
    const [electCateFooter, setDelectCateFooter] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [comfirm, setComfirm] = useState(false);
    const [pageFooter, setPageFooter] = useState([]);
    const [page, setPage] = useState(1);
    const [searchCateFooter, setSearchCateFooter] = useState('');
    const deleteCateFoo = useRef();

    useEffect(() => {
        const params = `?name=${searchCateFooter}`;
        if (searchCateFooter.length > 3) {
            fetchCateFooter(params);
        } else if (searchCateFooter.length === 0) {
            fetchCateFooter();
        }
    }, [searchCateFooter]);

    const fetchCateFooter = async (params) => {
        // setLoading(true);
        try {
            const result = await footerApi.getAllFooter(params);
            setListCate(result.data);
            setPageFooter(result.paginator);
            // setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            // setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setComfirm(true);
        deleteCateFoo.current = id;
    };

    const handleAction = (type, params) => {
        if (type) {
            setComfirm(false);
            const deleteFooter = async () => {
                try {
                    const dltFooter = await footerApi.delete(deleteCateFoo.current);
                    setMessStatus(dltFooter.message);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    fetchCateFooter(params);
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

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchCateFooter(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < pageFooter?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            fetchCateFooter(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchCateFooter(`?page=${page}`);
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
                <h2 className="content__heading--title">Danh sách danh mục Footer</h2>
                <p className="content__heading--subtitle">Danh mục Footer</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchCateFooter}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="Tìm kiếm danh mục..."
                                    onChange={(e) => setSearchCateFooter(e.target.value)}
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
                                              <td>{10 * (page - 1) + index + 1}</td>
                                              <td>{item.name}</td>

                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center">
                                                  <Link
                                                      to={`/admin/footer/edit/${item?.id}/${item?.slug}`}
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
                    {listCate?.length != 0 && (
                        <Pagination
                            curentPage={page}
                            totalPages={pageFooter?.totalPages}
                            handlePrevPage={handlePrevPage}
                            handleChangePage={handleChangePage}
                            handleNextPage={handleNextPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCatePost;
