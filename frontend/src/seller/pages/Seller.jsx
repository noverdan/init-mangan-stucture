import { Route, Routes } from "react-router-dom"
import Sidebar from "../components/sidebar"
import Products from "./products"

function Seller() {
    return (
        <div className="h-[100vh] bg-bg-300">
            <Routes>
                <Route path="/dashboard" element={<Sidebar />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </div>
    )
}

export default Seller