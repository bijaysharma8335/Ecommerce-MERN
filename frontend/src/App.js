import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductPage from "./pages/EditProduct";
import { addNotification } from "./features/userSlice";

const App = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io("ws://localhost:8000");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });
        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);

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
