import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect } from 'react';
import catePostApi from '~/api/catePostApi';

const ListCatePost = () => {
    const [loading, setLoading] = useState(false);
    const [listCate, setListCate] = useState([]);
    useEffect(() => {
        const fetchCatePost = async () => {
            setLoading(true);
            try {
                const result = await catePostApi.getAll();
                setListCate(result.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch Categories: ', error);
                setLoading(false);
            }
        };
        fetchCatePost();
    }, []);
    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục tin tức</h2>
                <p className="content__heading--subtitle">Danh mục tin tức</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Đường dẫn</th>
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
                                              <td>{index}</td>
                                              <td>{item.name}</td>
                                              <td>{item.slug}</td>
                                              <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                                  {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                              </td>
                                              <td>{item.created_by == null ? 'Null' : item.created_by}</td>
                                              <td>{item.updated_by == null ? 'Null' : item.updated_by}</td>
                                              <td className="text-center">Sửa</td>
                                              <td className="text-center">Xóa</td>
                                          </tr>
                                      ))
                                    : false}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCatePost;
