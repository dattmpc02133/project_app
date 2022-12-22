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
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async (params) => {
        setLoading(true);
        try {
            const result = await productApi.getAllAddmin(params);
            setListProduct(result.data.data);
            console.log('result', result.data);
            setPagination(result.data.last_page);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            setLoading(false);
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
                    fetchProduct();
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
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách sản phẩm</h2>
                <p className="content__heading--subtitle">Sản phẩm</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Mã sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th>Thương hiệu</th>
                                    <th>Trạng thái</th>
                                    <th>Người thêm</th>
                                    <th>Người cập nhật</th>
                                    <th colSpan="2" className="text-center">
                                        Thao tác
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
                                              <td>{item.brand_name}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center btn__tbl">
                                                  <Link to={`/admin/product/edit/${item.id}/${item.slug}`}>Sửa</Link>
                                              </td>
                                              <td
                                                  className="text-center btn__tbl"
                                                  onClick={() => handleDelete(item.id)}
                                              >
                                                  Xóa
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
                                    <td>Điện thoại</td>
                                    <td>Apple</td>
                                    <td className="an_active">Đang kích hoạt</td>
                                    <td className="text-center btn__tbl">Sửa</td>
                                    <td className="text-center btn__tbl">Xóa</td>
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
