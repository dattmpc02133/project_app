import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutView from './pages/LayoutView';
import Home from './pages/Home';
import Product from './pages/Product';
import TekZone from './pages/TekZone';
import TopCare from './pages/TopCare';
import NotFound from './pages/NotFound';
import TekZoneDetail from './pages/TekZoneDetail';
import Cart from './pages/Cart';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import CreateCatePost from './pages/Admin/CreateCatePost';
import ListCatePost from './pages/Admin/ListCatePost';
import CreatePost from './pages/Admin/CreatePost';
import CreateProduct from './pages/Admin/CreateProduct';
import ListProduct from './pages/Admin/ListProduct';
import EditProduct from './pages/Admin/EditProduct';
import CreateColor from './pages/Admin/CreateColor';
import ListColor from './pages/Admin/ListColor';
import LoginAdmin from './pages/Admin/LoginAdmin';
import CreateWareHouse from './pages/Admin/CreateWareHouse';
import ListWareHouse from './pages/Admin/ListWareHouse';
import EditWareHouse from './pages/Admin/EditWareHouse';
import CreateStore from './pages/Admin/CreateStore';
import ListStore from './pages/Admin/ListStore';
import EditStore from './pages/Admin/EditStore';
import ProImportSlip from './pages/Admin/ProImportSlip';
import Login from './components/Login';
import Pay from './pages/Pay';
import DetailProduct from './components/DetailProduct';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<LayoutView />}>
                    <Route path="" element={<Home />} />
                    <Route path=":slug" element={<Product />} />
                    <Route path="/productdetail" element={<DetailProduct />} />
                    <Route path="/tekzone" element={<TekZone />} />
                    <Route path="/tekzonedetail" element={<TekZoneDetail />} />
                    <Route path="/topcare" element={<TopCare />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pay" element={<Pay />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="login-admin" element={<LoginAdmin />} />
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<NotFound />} />
                    <Route path="layout" element={<NotFound />} />
                    <Route path="phone" element={<NotFound />} />
                    <Route path="location" element={<NotFound />} />
                    <Route path="catepost/add" element={<CreateCatePost />} />
                    <Route path="catepost/list" element={<ListCatePost />} />
                    <Route path="post/add" element={<CreatePost />} />
                    <Route path="post/list" element={<NotFound />} />
                    <Route path="product/add" element={<CreateProduct />} />
                    <Route path="product/list" element={<ListProduct />} />
                    <Route path="product/edit/:id/:slug" element={<EditProduct />} />
                    <Route path="color/add" element={<CreateColor />} />
                    <Route path="color/list" element={<ListColor />} />
                    <Route path="warehouse/add" element={<CreateWareHouse />} />
                    <Route path="warehouse/list" element={<ListWareHouse />} />
                    <Route path="warehouse/edit/:id" element={<EditWareHouse />} />
                    <Route path="store/add" element={<CreateStore />} />
                    <Route path="store/list" element={<ListStore />} />
                    <Route path="store/edit/:id" element={<EditStore />} />
                    <Route path="importslip/add" element={<ProImportSlip />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
