import Navigation from "./components/Navigation";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
const App = () => {
    const user = useSelector((state) => state.user);
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    {!user && (
                        <>
                            {" "}
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />
                        </>
                    )}
                    <Route path="/new-product" element={<NewProduct />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
