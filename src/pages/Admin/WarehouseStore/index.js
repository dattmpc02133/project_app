import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import wareHouseApi from '~/api/wareHouseApi';
import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';
const WarehouseStore = () => {
    const param = useParams();
    const StoreID = param.id;
    const [loading, setLoading] = useState(false);
    const [listWareHouseStore, setListWareHouseStore] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);

    const idWarehouse = useRef();
    useEffect(() => {
        const data = {
            warehouse_id: StoreID,
        };
        const fetchWareHouseStore = async () => {
            setLoading(true);
            try {
                const result = await wareHouseApi.getProductStore(data);
                setListWareHouseStore(result.data.data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch WareHouse: ', error);
                setLoading(false);
            }
        };
        fetchWareHouseStore();
    }, [StoreID]);
    return (
        <div className="wrapper">
            {/* {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />} */}
            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách kho hàng</h2>
                <p className="content__heading--subtitle">Kho hàng</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Biến thể</th>
                                    <th>Cửa hàng</th>

                                    {/* <th colSpan="2" className="text-center">
                                        Thao tác
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(listWareHouseStore) &&
                                    listWareHouseStore.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td className={item.product_amount < 10 ? 'amountActive' : ''}>
                                                {item.product_amount}
                                            </td>
                                            <td>{item.variant_name}</td>
                                            <td>{item.Showroom}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarehouseStore;
