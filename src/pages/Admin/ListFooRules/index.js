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
    const [searchRules, setSearchRules] = useState('');
    const deleteContent = useRef();
    useEffect(() => {
        const params = `?title=${searchRules}`;
        if (searchRules.length > 3) {
            fetchFooterRules(params);
        } else if (searchRules.length === 0) {
            fetchFooterRules();
        }
    }, [searchRules]);

    const fetchFooterRules = async (params) => {
        // setLoading(true);
        try {
            const result = await footerApi.getAllContentFoo(params);
            setListCate(result.data);
            setCateFooter(result.paginator);
            // setLoading(false);
            console.log('data', result);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            // setLoading(false);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchFooterRules(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        if (page < cateFooter?.totalPages) {
            const pageId = page + 1;
            setPage(pageId);
            fetchFooterRules(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchFooterRules(`?page=${page}`);
    };

    const handleDelete = (id) => {
        setComfirm(true);
        deleteContent.current = id;
    };

    const handleAction = (type, params) => {
        if (type) {
            setComfirm(false);
            const deleteFooter = async () => {
                try {
                    const dltFooter = await footerApi.deleteContent(deleteContent.current);
                    setMessStatus(dltFooter.message);
                    setStatusHandle(true);
                    setModal(true);
                    setLoading(false);
                    fetchFooterRules(params);
                } catch (error) {
                    console.log('L???i x??a', error);
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
        e.preventDefault();
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh s??ch n???i dung v?? ch??nh s??ch</h2>
                <p className="content__heading--subtitle">N???i dung v?? ch??nh s??ch</p>
            </div>
            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onSubmit={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchRules}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="T??m ki???m danh m???c..."
                                    onChange={(e) => setSearchRules(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ti??u ????? n???i dung</th>
                                    <th>T??n danh m???c</th>
                                    <th>Tr???ng th??i</th>
                                    <th>Ng?????i t???o</th>
                                    <th>Ng?????i c???p nh???t</th>
                                    <th colSpan="2" className="text-center">
                                        Thao t??c
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listCate)
                                    ? listCate.map((item, index) => (
                                          <tr key={item.id}>
                                              <td>{10 * (page - 1) + index + 1}</td>
                                              <td>{item.title}</td>
                                              <td>{item.category_name}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? '??ang k??ch ho???t' : 'Ch??a k??ch ho???t'}
                                              </td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center">
                                                  <Link
                                                      to={`/admin/footer/content/edit/${item.id}/${item.slug}`}
                                                      state={{ item }}
                                                  >
                                                      S???a
                                                  </Link>
                                              </td>
                                              <td className="text-center">
                                                  <Link
                                                      onClick={() => {
                                                          handleDelete(item.id);
                                                      }}
                                                  >
                                                      X??a
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
