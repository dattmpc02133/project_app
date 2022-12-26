import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import LogoApi from '~/api/logoApi';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';

function ListLogo() {
    const [loading, setLoading] = useState(false);
    const [listCate, setListCate] = useState();
    const [messStatus, setMessStatus] = useState();
    const [statusHandle, setStatusHandle] = useState();
    const [message, setMessage] = useState();
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetchCatePost();
    }, []);
    const fetchCatePost = async () => {
        setLoading(true);
        try {
            const result = await LogoApi.getAll();
            setListCate(result);

            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch Categories: ', error);
            setLoading(false);
        }
    };

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}
            {/* {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />} */}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}

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
                                    <th>Logo</th>
                                    <th>Trạng thái</th>

                                    {/* <th>Người cập nhật</th> */}
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCate?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={item.image} style={{ width: 80 }} />
                                        </td>
                                        <td className={item.is_active == 1 ? 'active' : 'an__active'}>
                                            {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                        </td>

                                        {/* <td>{item.updated_by == null ? 'Null' : item.updated_by}</td> */}
                                        <td>
                                            <Link to={`/admin/listlogo/edit/${item?.id}`}>Sửa</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListLogo;
