import Navigation from "./components/Navigation";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
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
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
