import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Register from "./pages/Register"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import { ContextProvider } from "./context/ContextProvider"
import { FilterProvider } from "./context/FilterProvider"

function User() {
    return (
        <ContextProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/homepage" element={<FilterProvider><Homepage /></FilterProvider>} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            </Routes>
        </ContextProvider>
    )
}

export default User