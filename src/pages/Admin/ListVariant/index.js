import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import brandApi from '~/api/brandApi';
import Dialog from '~/components/Dialog';
import Pagination from '~/components/Pagination';
import productApi from '~/api/productApi';

    function ListVariants() {
        const [listVariants, setListVariants] = useState();
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState();
        const [messStatus, setMessStatus] = useState();
        const [statusHandle, setStatusHandle] = useState();
        const [modal, setModal] = useState(false);
        const [deleteBrand, SetDeleteBrand] = useState();
        const [comfirm, setComfirm] = useState(false);
        const [page, setPage] = useState(1);
        const [pageBrand, setPageBrand] = useState([]);
        const deleteBrands = useRef();

        const handleDelete = (id) => {
            setComfirm(true);
            deleteBrands.current = id;
        };
        const getAllVariant = async () => {
            try {
                const allBrands = await productApi.getVariants();
                console.log('allBrands', allBrands);
                setListVariants(allBrands.data);
                console.log(allBrands);
                setPageBrand(allBrands.paginator);
            } catch (error) {
                console.log('lỗi lấy danh sách', error);
            }
        };
        useEffect(() => {
            getAllVariant();
        }, []);
        const handleAction = (type) => {
            if (type) {
                setComfirm(false);
                const getDeletBrand = async () => {
                    setLoading(true);
                    try {
                        const deleteBrand = await productApi.deleteVariants(deleteBrands.current);
                        setMessStatus(deleteBrand.message);
                        getAllVariant();
                        setStatusHandle(true);
                        setModal(true);
                        setLoading(false);
                    } catch (error) {
                        console.log('lỗi khi xóa', error);
                        const res = error.response.data;
                        setMessStatus(res.message);
                        setStatusHandle(false);
                        setModal(true);
                        setLoading(false);
                    }
                };
                getDeletBrand();
            }
        };

        return (
            <div className="wrapper">
                {loading ? <Loading /> : ''}
                {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
                {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />}
                <div className="content__heading">
                    <h2 className="content__heading--title">Danh sách danh mục thương hiệu</h2>
                    <p className="content__heading--subtitle">Danh mục thương hiệu</p>
                </div>
                <div className="content__wrapper">
                    <div className="content__main">
                        <div className="table__block">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên thương hiệu</th>
                                        <th>Trạng thái</th>
                                        <th colSpan="2" className="text-center">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(listVariants)
                                        ? listVariants.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.variant_name}</td>
                                                <td className={item.is_active == 1 ? 'active' : 'amountActive'}>
                                                    {item.is_active == 1 ? 'Đang kích hoạt' : 'Chưa kích hoạt'}
                                                </td>
                                                <td className="text-center">
                                                    <Link to={`/admin/variant/edit/${item?.id}`} state={{ item }}>
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
                    </div>
                </div>
            </div>
        );
    }

    export default ListVariants;
