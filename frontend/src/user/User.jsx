import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Register from "./pages/Register"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import { ContextProvider } from "./context/ContextProvider"
import { FilterProvider } from "./context/FilterProvider"
import ContactUs from "./pages/ContactUs"
import BelumBayar from "./pages/BelumBayar"
import Catering from "./pages/Catering"
import { PackagesProvider } from "./context/PackagesProvider"
import Checkout from "./pages/Checkout"
import ListBelumBayar from "./pages/ListBelumBayar"

function User() {
    return (
        <ContextProvider>
            <PackagesProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/homepage" element={<FilterProvider><Homepage /></FilterProvider>} />
                    <Route path="/catering/:packageId" element={<Catering />} />
                    <Route path="/checkout/" element={<Checkout />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/pesanan/belumbayar" element={<ListBelumBayar />} />
                    <Route path="/pesanan/belumbayar/:idPesanan" element={<BelumBayar />} />
                    <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                </Routes>
            </PackagesProvider>
        </ContextProvider>
    )
}

export default User