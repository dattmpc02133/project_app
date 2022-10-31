import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutView from './pages/LayoutView';
import AccesSories from './pages/AccesSories';
import Home from './pages/Home';
import Ipad from './pages/iPad';
import Iphone from './pages/iPhone';
import Mac from './pages/Mac';
import Sound from './pages/Sound';
import TekZone from './pages/TekZone';
import TopCare from './pages/TopCare';
import Watch from './pages/Watch';
import ProductDetail from './pages/ProductDetail';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutView />}>
                    <Route path="" element={<Home />} />
                    <Route path="/iphone" element={<Iphone />}>
                        <Route path="iphone:id" element={<ProductDetail />}></Route>
                    </Route>
                    <Route path="/mac" element={<Mac />} />
                    <Route path="/ipad" element={<Ipad />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route path="/sound" element={<Sound />} />
                    <Route path="/accessories" element={<AccesSories />} />
                    <Route path="/tekzone" element={<TekZone />} />
                    <Route path="/topcare" element={<TopCare />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
