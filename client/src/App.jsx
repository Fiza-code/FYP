import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
// import ProductDetailPage from './pages/ProductDetailPage'
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrder from './pages/';
import AdminPanel from './pages/AdminPanel';
import Profile from "./pages/Profile";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="collection" element={<Collection />} />
        {/* <Route path="product/:productId" element={<ProductDetailPage />} /> */}
        <Route path="cart" element={<Cart />} />
        {/* <Route path="login" element={<Login />} /> */}
  {/* <Route path="placeOrder"element={<PlaceOrder />} />
        <Route path="placeorder" element={<PlaceOrder />} /> */}
         <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />

      </Route>
       
    </Routes>
  );
}

export default App;