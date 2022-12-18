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
import CreateStore from './pages/Admin/CreateStore';
import ListStore from './pages/Admin/ListStore';
import EditStore from './pages/Admin/EditStore';
import ProImportSlip from './pages/Admin/ProImportSlip';
import Login from './components/Login';
import Pay from './pages/Pay';
import DetailProduct from './components/DetailProduct';
import CreateFooter from './pages/Admin/CreateFooter';
import ListCateFooter from './pages/Admin/ListCateFooter';
import EditFooter from './pages/Admin/EditFooter';
import Product from './pages/Product';
import CreateCategories from './pages/Admin/CreateCatePost';
import CreateBrand from './pages/Admin/CreateBrand';
import LoginClient from './pages/LoginClient';

import LoginUpdate from './pages/LoginUpdate';
import LoginHistoryCart from './pages/LoginHistoryCart';

import CreateFooRules from './pages/Admin/CreateFooRules';
import ListFooRules from './pages/Admin/ListFooRules';
import EditFooRules from './pages/Admin/EditFooRules';
import CreateSubs from './pages/Admin/CreateSubs';
import CreateContact from './pages/Admin/CreateContact';
import ListContact from './pages/Admin/ListContact';
import EditContact from './pages/Admin/EditContact';

import EditCategories from './pages/Admin/EditCategories';
import ListSubs from './pages/Admin/ListSubs';
import EditSubs from './pages/Admin/EditSubs';
import ListBrand from './pages/Admin/ListBrand';
import EditBrand from './pages/Admin/EditBrand';
import ListPost from './pages/Admin/ListPost';
import EditPost from './pages/Admin/EditPost';
import CreateCategoriesPro from './pages/Admin/CreateCategoriesPro';
import ListCategoriesProduct from './pages/Admin/ListCategoriesProduct';
import EditCategoriesPro from './pages/Admin/EditCategoriesPro';
import CreateProductSubs from './pages/Admin/CreateProductSubs';
import EditProductSubs from './pages/Admin/EditProductSubs';
import ListProductSubs from './pages/Admin/ListProductSubs';
import TekZoneCate from './pages/TekZoneCate';

import ListProductComment from './pages/Admin/ListProductComment';
import ListComment from './pages/Admin/ListComment';
import ListCommentReply from './pages/Admin/ListCommentReply';
import ListOrders from './pages/Admin/ListOrders';
import OrderDetais from './pages/Admin/OrderDetais';
import OrderCuccess from './pages/OrderCuccess';
import WarehouseStore from './pages/Admin/WarehouseStore';
import EditLogo from './pages/Admin/EditLogo';
import ListLogo from './pages/Admin/ListLogo';
import ListImportslipDetail from './pages/Admin/ListImportslipDetail';
import ListImportslip from './pages/Admin/ListImportslip';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutView />}>
                    <Route path="" element={<Home />} />
                    <Route path=":slug" element={<Product />} />
                    <Route path="/productDetail" element={<DetailProduct />} />
                    <Route path="/tekzonecate/:id/:slug" element={<TekZoneCate />} />
                    <Route path="/daimond" element={<TekZone />} />
                    <Route path="/tekzonedetail/:id/:slug" element={<TekZoneDetail />} />
                    <Route path="/topcare" element={<TopCare />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pay" element={<Pay />} />
                    <Route path="/paycucess" element={<OrderCuccess />} />
                    <Route path="footer" element={<LayoutDetailFooter />}>
                        <Route path="insurance/:id" element={<Insurance />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/login" element={<LoginClient />} />
                    <Route path="/uplogin" element={<LoginUpdate />} />
                    <Route path="/hislogin" element={<LoginHistoryCart />} />
                </Route>

                <Route path="login-admin" element={<LoginAdmin />} />
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<NotFound />} />
                    <Route path="layout" element={<NotFound />} />
                    <Route path="phone" element={<NotFound />} />
                    <Route path="location" element={<NotFound />} />
                    <Route path="listlogo" element={<ListLogo />} />
                    <Route path="listlogo/edit/:id" element={<EditLogo />} />
                    {/* 
                    <Route path="catepost/list" element={<ListCatePost />} /> */}
                    <Route path="post/add" element={<CreatePost />} />
                    <Route path="post/list" element={<ListPost />} />
                    <Route path="post/edit/:id/:slug" element={<EditPost />} />
                    <Route path="product/add" element={<CreateProduct />} />
                    <Route path="product/list" element={<ListProduct />} />
                    <Route path="product/edit/:id/:slug" element={<EditProduct />} />
                    <Route path="color/add" element={<CreateColor />} />
                    <Route path="color/list" element={<ListColor />} />
                    <Route path="warehouse/add" element={<CreateWareHouse />} />
                    {/* footer */}
                    <Route path="footer/add" element={<CreateFooter />} />
                    <Route path="footer/list" element={<ListCateFooter />} />
                    <Route path="footer/edit/:id/:slug" element={<EditFooter />} />
                    {/* footer content */}
                    <Route path="footer/content/add" element={<CreateFooRules />} />
                    <Route path="footer/content/list" element={<ListFooRules />} />
                    <Route path="footer/content/edit/:id/:slug" element={<EditFooRules />} />
                    {/* categories admin*/}
                    <Route path="categoriespost/add" element={<CreateCategories />} />
                    <Route path="categoriespost/list" element={<ListCatePost />} />
                    <Route path="categoriespost/edit/:id/:slug" element={<EditCategories />} />
                    {/* Brand */}
                    <Route path="brand/add" element={<CreateBrand />} />
                    <Route path="brand/list" element={<ListBrand />} />
                    <Route path="brand/edit/:id/:slug" element={<EditBrand />} />

                    <Route path="warehouse/list" element={<ListWareHouse />} />
                    <Route path="warehouse/store/:id" element={<WarehouseStore />} />
                    <Route path="warehouse/edit/:id" element={<EditWareHouse />} />
                    {/* subs */}
                    <Route path="subs/add" element={<CreateSubs />} />
                    <Route path="subs/list" element={<ListSubs />} />
                    <Route path="subs/edit/:id/:slug" element={<EditSubs />} />
                    {/* categories product */}
                    <Route path="categoriesproduct/add" element={<CreateCategoriesPro />} />
                    <Route path="categoriesproduct/list" element={<ListCategoriesProduct />} />
                    <Route path="categoriesproduct/edit/:id/:slug" element={<EditCategoriesPro />} />
                    {/* subscateproduct */}
                    <Route path="productsub/add" element={<CreateProductSubs />} />
                    <Route path="productsub/list" element={<ListProductSubs />} />
                    <Route path="productsub/edit/:id/:slug" element={<EditProductSubs />} />

                    <Route path="store/add" element={<CreateStore />} />
                    <Route path="store/list" element={<ListStore />} />
                    <Route path="store/edit/:id" element={<EditStore />} />
                    <Route path="importslip/add" element={<ProImportSlip />} />
                    <Route path="importslip/list" element={<ListImportslip />} />
                    <Route path="importslipdetail/list/:id/:code" element={<ListImportslipDetail />} />

                    {/* comment */}
                    <Route path="comment/listproductcomment" element={<ListProductComment />} />
                    <Route path="comment/listcomment" element={<ListComment />} />
                    <Route path="comment/listcommentreply/:id" element={<ListCommentReply />} />

                    <Route path="contact/add" element={<CreateContact />} />
                    <Route path="contact/list" element={<ListContact />} />
                    <Route path="contact/edit/:id/:slug" element={<EditContact />} />
                    <Route path="orders/list" element={<ListOrders />} />
                    <Route path="orders/details/:id/:code" element={<OrderDetais />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
