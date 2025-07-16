import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotesPage from "../pages/NotesPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={token ? "/notes" : "/login"} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/notes" element={
                        <PrivateRoute>
                            <NotesPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;