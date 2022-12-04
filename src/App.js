import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutView from './pages/LayoutView';
import Home from './pages/Home';
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
import LayoutDetailFooter from './pages/LayoutDetailFooter';
import Insurance from './pages/Insurance';
import CreateWareHouse from './pages/Admin/CreateWareHouse';
import ListWareHouse from './pages/Admin/ListWareHouse';
import EditWareHouse from './pages/Admin/EditWareHouse';
import Login from './components/Login';
import Pay from './pages/Pay';
import DetailProduct from './components/DetailProduct';
import CreateFooter from './pages/Admin/CreateFooter';
import ListCateFooter from './pages/Admin/ListCateFooter';
import EditFooter from './pages/Admin/EditFooter';
import Product from './pages/Product';
import CreateCategories from './pages/Admin/CreateCategories';
import CreateBrand from './pages/Admin/CreateBrand';
import LoginClient from './pages/LoginClient';
import CreateFooRules from './pages/Admin/CreateFooRules';
import ListFooRules from './pages/Admin/ListFooRules';
import EditFooRules from './pages/Admin/EditFooRules';
import CreateSubs from './pages/Admin/CreateSubs';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<LayoutView />}>
                    <Route path="" element={<Home />} />
                    <Route path=":slug" element={<Product />} />
                    <Route path="/productDetail" element={<DetailProduct />} />
                    <Route path="/daimond?id=45" element={<TekZone />} />
                    <Route path="/tekzonedetail" element={<TekZoneDetail />} />
                    <Route path="/topcare" element={<TopCare />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pay" element={<Pay />} />
                    <Route path="footer" element={<LayoutDetailFooter />}>
                        <Route path="insurance" element={<Insurance />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/logins" element={<LoginClient />} />
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
                    {/* footer */}
                    <Route path="footer/add" element={<CreateFooter />} />
                    <Route path="footer/list" element={<ListCateFooter />} />
                    <Route path="footer/edit/:id" element={<EditFooter />} />
                    {/* footer content */}
                    <Route path="footer/content/add" element={<CreateFooRules />} />
                    <Route path="footer/content/list" element={<ListFooRules />} />
                    <Route path="footer/content/edit/:id" element={<EditFooRules />} />
                    {/* categories admin*/}
                    <Route path="categories/add" element={<CreateCategories />} />
                    <Route path="categories/list" element={<ListCatePost />} />
                    {/* Brand */}
                    <Route path="brand/add" element={<CreateBrand />} />
                    <Route path="categories/list" element={<ListCatePost />} />
                    <Route path="warehouse/list" element={<ListWareHouse />} />
                    <Route path="warehouse/edit/:id" element={<EditWareHouse />} />
                    {/* subs */}
                    <Route path="subs/add" element={<CreateSubs />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
