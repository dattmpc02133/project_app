import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutView from './pages/LayoutView';
import Home from './pages/Home';
import Product from './pages/Product';
import TekZone from './pages/TekZone';
import TopCare from './pages/TopCare';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import TekZoneDetail from './pages/TekZoneDetail';
import Cart from './pages/Cart';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import CreateCatePost from './pages/Admin/CreateCatePost';
import ListCatePost from './pages/Admin/ListCatePost';
import CreatePost from './pages/Admin/CreatePost';
import LoginAdmin from './pages/Admin/LoginAdmin';

import Login from './components/Login';
import Pay from './pages/Pay';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<LayoutView />}>
                    <Route path="" element={<Home />} />
                    <Route path=":slug" element={<Product />} />
                    <Route path="/productdetail" element={<ProductDetail />} />
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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
