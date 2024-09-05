
import Home from "./pages/Home";
import Signup from "./pages/SignUp";

import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import Login from "./pages/login";

function App() {
    const { user } = useContext(AuthContext);

    return (
            <Routes>
                 <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
            />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/" /> : <Signup />}
                />
            </Routes>
    );
}

export default App;
