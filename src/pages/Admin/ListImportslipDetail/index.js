// import '~/assets/scss/admin/Content.scss';
// import Loading from '~/components/Loading';
// import { useState, useEffect, useRef } from 'react';
// import proImportSlip from '../../../api/proImportSlip';
// import { useParams } from 'react-router-dom';

// function ListImportslipDetail() {
//     const [loading, setLoading] = useState(false);
//     const [quantity, setQuantity] = useState([]);
//     const [idProduct, setIdProduct] = useState([]);
//     const params = useParams();

//     useEffect(() => {
//         const getProImportSlip = async () => {
//             setLoading(true);
//             try {
//                 const getAllImportSlip = await proImportSlip.getProductSlip(params.id);

//                 setLoading(false);
//             } catch (error) {
//                 console.log('Failed Product import slip', error);
//                 setLoading(false);
//             }
//         };
//         getProImportSlip();
//     }, []);

//     return (
//         <div className="wrapper">
//             {loading ? <Loading /> : ''}

//             <div className="content__heading">
//                 <h2 className="content__heading--title">Danh sách danh mục tin tức</h2>
//                 <p className="content__heading--subtitle">Danh mục tin tức</p>
//             </div>

//             <div className="content__wrapper">
//                 <div className="content__main">
//                     <div className="table__block">
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>Tên sản phẩm</th>
//                                     <th>Mã sản phẩm </th>
//                                     <th>Số lượng nhập</th>
//                                     <th>Giá nhập</th>
//                                 </tr>
//                             </thead>
//                             <tbody></tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ListImportslipDetail;
