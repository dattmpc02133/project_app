import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import productApi from '~/api/productApi';

import { Link } from 'react-router-dom';

const ListCatePost = () => {
    const [loading, setLoading] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const result = await productApi.getAll();
                setListProduct(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch Categories: ', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);
    console.log(listProduct);
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
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
                                              <td>{index + 1}</td>
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
                                              <td className="text-center">
                                                  <Link to={`/admin/product/edit/${item.id}/${item.slug}`}>Sửa</Link>
                                              </td>
                                              <td className="text-center">Xóa</td>
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
                </div>
            </div>
        </div>
    );
};

export default ListCatePost;
