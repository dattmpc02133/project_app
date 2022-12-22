import '~/assets/scss/admin/Content.scss';
import Loading from '~/components/Loading';
import { useState, useEffect, useRef } from 'react';
import proImportSlip from '../../../api/proImportSlip';
import { useParams } from 'react-router-dom';

function ListImportslipDetail() {
    const [loading, setLoading] = useState(false);
    const [importSlipDetail, setImportSlipDetail] = useState();
    const [importSlip, setImportSlip] = useState([]);

    const params = useParams();
    console.log(params.id);
    useEffect(() => {
        const getAllProductSlipDetail = async () => {
            setLoading(true);

            try {
                const getAllImportSlip = await proImportSlip.getAllProductSlip(params.id);

                const getByIdSlip = await proImportSlip.getAllProductSlipDetails();

                const data = getByIdSlip.data.filter((item) => item.product_import_slip_id == params.id);

                setImportSlipDetail(data);
                setLoading(false);
            } catch (error) {
                console.log('Failed to ImportProductSlipDetail', error);
                setLoading(false);
            }
        };
        getAllProductSlipDetail();
    }, []);

    return (
        <div className="wrapper">
            {loading ? <Loading /> : ''}

            <div className="content__heading">
                <h2 className="content__heading--title">Danh sách danh mục phiếu nhập</h2>
            </div>

            <div className="content__wrapper">
                <div className="content__main">
                    <div className="table__block">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Màu sản phẩm</th>
                                    <th>Biến thể</th>
                                    <th>Số lượng nhập</th>
                                    <th>Giá nhập</th>
                                </tr>
                            </thead>
                            <tbody>
                                {importSlipDetail?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.product_id}</td>
                                        <td>{item?.color_id}</td>
                                        <td>{item?.pro_variant_id}</td>
                                        <td>{item?.quantity_import}</td>
                                        <td>{item?.price_import}</td>
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

export default ListImportslipDetail;
