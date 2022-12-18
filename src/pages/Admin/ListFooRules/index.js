import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import footerApi from '../../../api/footerApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
function ListFooRules() {
    const [comfirm, setComfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [listCate, setListCate] = useState([]);
    const [electCateFooter, setDelectCateFooter] = useState(false);
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const [cateFooter, setCateFooter] = useState([]);
    const deleteContent = useRef();
    useEffect(() => {
        fetchCatePost();
    }, []);

    const fetchCatePost = async (params) => {
        setLoading(true);
        try {
            const result = await footerApi.getAllContentFoo(params);
            setListCate(result.data);
            setCateFooter(result.paginator);
            setLoading(false);
            // console.log('data', result.data);
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
        if (page < cateFooter?.totalPages) {
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
        deleteContent.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteFooter = async () => {
                try {
                    const dltFooter = await footerApi.deleteContent(deleteContent.current);
                    setMessage(dltFooter.message);
                    const result = await footerApi.getAllContent();
                    setListCate(result.data);
                    setMessStatus(result.status);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                } catch (error) {
                    console.log('Lỗi xóa', error);
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
                <h2 className="content__heading--title">Danh sách nội dung và chính sách</h2>
                <p className="content__heading--subtitle">Nội dung và chính sách</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Tiêu đề nội dung</th>
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
                                              <td>{item.category_name}</td>
                                              <td>{item.title}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center">
                                                  <Link
                                                      to={`/admin/footer/content/edit/${item.id}/${item.slug}`}
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
                            totalPages={cateFooter?.totalPages}
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

export default ListFooRules;
