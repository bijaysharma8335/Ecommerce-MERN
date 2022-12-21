import Navigation from "./components/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductPage from "./pages/EditProduct";

const App = () => {
    const user = useSelector((state) => state.user);
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route
                                path="/product/:id/edit"
                                element={<EditProductPage />}
                            />
                        </>
                    )}
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/new-product" element={<NewProduct />} />
                    <Route
                        path="/category/:category"
                        element={<CategoryPage />}
                    />

                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
