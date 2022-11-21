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
import LayoutAdmin from './pages/LayoutAdmin';
import Login from './components/Login';
import Pay from './pages/Pay';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<LayoutView />}>
                    <Route path="" element={<Home />} />
                    <Route path=":slug" element={<Product />}>
                        <Route path=":id" element={<Product />} />
                        <Route path=":id/:product" element={<Product />} />
                    </Route>
                    <Route path="/tekzone" element={<TekZone />} />
                    <Route path="/tekzonedetail" element={<TekZoneDetail />} />
                    <Route path="/topcare" element={<TopCare />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pay" element={<Pay />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/admin" element={<LayoutAdmin />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
