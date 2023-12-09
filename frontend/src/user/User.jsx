import { Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Register from "./pages/Register"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import { ContextProvider, DataContext } from "./context/ContextProvider"
import { FilterProvider } from "./context/FilterProvider"
import ContactUs from "./pages/ContactUs"
import BelumBayar from "./pages/BelumBayar"
import Catering from "./pages/Catering"
import { PackagesProvider } from "./context/PackagesProvider"
import Checkout from "./pages/Checkout"
import ListBelumBayar from "./pages/ListBelumBayar"
import ListDiproses from "./pages/ListDiproses"
import ListDibatalkan from "./pages/ListDibatalkan"
import ListSelesai from "./pages/ListSelesai"
import NotFound from "./pages/NotFound"
import PesananBatal from "./pages/PesananBatal"
import PesananDiproses from "./pages/PesananDiproses"
import PesananSelesai from "./pages/PesananSelesai"
import { useContext } from "react"



function User() {
    const { isLoggedIn } = useContext(DataContext)
    return (
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
                <Route path="/pesanan/diproses" element={<ListDiproses />} />
                <Route path="/pesanan/dibatalkan" element={<ListDibatalkan />} />
                <Route path="/pesanan/selesai" element={<ListSelesai />} />
                <Route path="/pesanan/belumbayar/:idPesanan" element={<BelumBayar />} />
                <Route path="/pesanan/diproses/:idPesanan" element={<PesananDiproses />} />
                <Route path="/pesanan/selesai/:idPesanan" element={<PesananSelesai />} />
                <Route path="/pesanan/dibatalkan/:idPesanan" element={<PesananBatal />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </PackagesProvider>
    )
}

export default User