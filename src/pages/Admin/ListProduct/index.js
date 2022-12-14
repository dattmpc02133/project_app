import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import productApi from '~/api/productApi';
import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
import { Link } from 'react-router-dom';
import Pagination from '~/components/Pagination';

const ListCatePost = () => {
    const [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(1);
    const [searchProduct, setSearchProduct] = useState('');
    useEffect(() => {
        const params = `?name=${searchProduct}`;
        if (searchProduct.length > 3) {
            fetchProduct(params);
        } else if (searchProduct.length === 0) {
            fetchProduct();
        }
    }, [searchProduct]);

    const fetchProduct = async (params) => {
        // setLoading(true);
        try {
            const result = await productApi.getAllAddmin(params);
            setListProduct(result.data.data);
            console.log('result', result.data);
            setPagination(result.data.last_page);
            // setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            // setLoading(false);
        }
    };

    const idProduct = useRef();

    const handleDelete = (id) => {
        setComfirm(true);
        idProduct.current = id;
    };

    const handleAction = (type) => {
        if (type) {
            setComfirm(false);
            const deleteColor = async () => {
                setLoading(true);
                try {
                    const result = await productApi.delete(idProduct.current);
                    setMessStatus(result.message);
                    setStatusHandle(true);
                    setModal(true);
                    // fetchProduct();
                    fetchProduct(`?page=${page}`);
                    setLoading(false);
                } catch (error) {
                    console.log('Failed to delete product ', error);
                    const res = error.response.data;
                    setMessStatus(res.message);
                    setLoading(false);
                    setModal(true);
                    setStatusHandle(false);
                }
            };
            deleteColor();
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            const pageId = page - 1;
            setPage(pageId);
            fetchProduct(`?page=${pageId}`);
        }
    };
    const handleNextPage = () => {
        console.log(pagination);
        if (page < pagination) {
            const pageId = page + 1;
            setPage(pageId);
            fetchProduct(`?page=${pageId}`);
        }
    };

    const handleChangePage = (page) => {
        setPage(page);
        fetchProduct(`?page=${page}`);
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
                <h2 className="content__heading--title">Danh s??ch s???n ph???m</h2>
                <p className="content__heading--subtitle">S???n ph???m</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <form className="form__search row" onClick={(e) => handleSearch(e)}>
                        <div className="input__group">
                            <div className="input__text">
                                <input
                                    value={searchProduct}
                                    id="ip-name"
                                    type="text"
                                    className="input__text--ctrl"
                                    placeholder="T??m ki???m danh m???c..."
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>T??n s???n ph???m</th>
                                    <th>M?? s???n ph???m</th>
                                    <th>H??nh ???nh</th>

                                    <th>Tr???ng th??i</th>
                                    <th>Ng?????i th??m</th>
                                    <th>Ng?????i c???p nh???t</th>
                                    <th colSpan="2" className="text-center">
                                        Thao t??c
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listProduct)
                                    ? listProduct.map((item, index) => (
                                          <tr key={item.id}>
                                              <td>{10 * (page - 1) + index + 1}</td>
                                              <td className="tbl__20">
                                                  <p className="tbl__box--limit">{item.name}</p>
                                              </td>
                                              <td>{item.code}</td>
                                              {/* <td>{item.slug}</td> */}
                                              <td>
                                                  <div>
                                                      <img className="img__tbl" src={item.url_image} />
                                                  </div>
                                              </td>
                                              {/* <td>{item.brand_name}</td> */}
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? '??ang k??ch ho???t' : 'Ch??a k??ch ho???t'}
                                              </td>
                                              <td>{item.create_by_name}</td>
                                              <td>{item.update_by_name}</td>
                                              <td className="text-center btn__tbl">
                                                  <Link to={`/admin/product/edit/${item.id}/${item.slug}`}>S???a</Link>
                                              </td>
                                              <td
                                                  className="text-center btn__tbl"
                                                  onClick={() => handleDelete(item.id)}
                                              >
                                                  X??a
                                              </td>
                                          </tr>
                                      ))
                                    : false}
                                {/* <tr>
                                    <td>1</td>
                                    <td>iPhone 14</td>
                                    <td>SP012931</td>
                                    <td>
                                        <div>
                                            <img
                                                className="img__tbl"
                                                src="https://cdn.tgdd.vn/Products/Images/42/240259/s16/iPhone-14-thumb-topzone%20(5)-650x650.png"
                                            />
                                        </div>
                                    </td>
                                    <td>??i???n tho???i</td>
                                    <td>Apple</td>
                                    <td className="an_active">??ang k??ch ho???t</td>
                                    <td className="text-center btn__tbl">S???a</td>
                                    <td className="text-center btn__tbl">X??a</td>
                                </tr> */}
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

export default ListCatePost;
