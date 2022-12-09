import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import storeApi from '~/api/storeApi';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import cartApi from '~/api/cartApi';

import Dialog from '~/components/Dialog';
import Modal from '~/components/Modal';

const ListStore = () => {
    const [loading, setLoading] = useState(false);
    const [listStore, setListStore] = useState([]);
    const [comfirm, setComfirm] = useState(false);
    const [messStatus, setMessStatus] = useState(false);
    const [statusHandle, setStatusHandle] = useState(false);
    const [modal, setModal] = useState(false);

    const params = useParams();

    useEffect(() => {
        const getOrdersDetails = async () => {
            try {
                const result = await cartApi.getOrdersId(params.id);
                console.log(result);
            } catch (error) {
                console.log('Failed to get orders', error);
            }
        };

        getOrdersDetails();
    }, []);
    return (
        <div className="wrapper">
            {/* {loading ? <Loading /> : ''}
            {comfirm && <Dialog closeDialog={setComfirm} action={handleAction} />}
            {modal && <Modal closeModal={setModal} message={messStatus} status={statusHandle} />} */}
            <div className="content__heading">
                <h2 className="content__heading--title">Chi tiết đơn hàng</h2>
                <p className="content__heading--subtitle">Đơn hàng</p>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="oreder__block">
                        <div className="oreder__heading">
                            <h2>Thông tin đơn hàng</h2>
                        </div>
                        <div className="oreder__total">
                            <div className="oreder__item">
                                <p>Mã đơn hàng: </p>
                                <p>: </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListStore;
