import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Login from "./pages/Login"

function User() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            </Routes>
        </div>
    )
}

export default User