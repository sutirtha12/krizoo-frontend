import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect , useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/authSlice";

/* PUBLIC COMPONENTS */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import Male from "./pages/Male";
import Female from "./pages/Female";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/Thankyou";
import ShopAll from "./pages/ShopAll";

/* ADMIN */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUpload from "./pages/admin/AdminUpload";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminEditProduct from "./pages/admin/AdminEditProduct";
import MyOrders from "./pages/MyOrders";
import MyProfile from "./pages/MyProfile";
import ScrollToTop from "./components/ScrollToTop";
import AuthLoader from "./components/AuthLoader";

/* ---------------- WRAPPER ---------------- */
function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      {/* PUBLIC NAVBAR */}
      {!isAdminRoute && <Navbar />}
<ScrollToTop/>
      {/* PAGE CONTENT */}
      <div className={!isAdminRoute ? "pt-24" : ""}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/male" element={<Male />} />
          <Route path="/female" element={<Female />} />
          <Route path="/shop" element={<ShopAll />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myorders" element={<MyOrders />} />
          

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/edit/:id" element={<AdminEditProduct />} />
            <Route path="upload" element={<AdminUpload />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </div>

      {/* PUBLIC FOOTER */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

/* ---------------- ROOT ---------------- */
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700); // ⏱️ 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}