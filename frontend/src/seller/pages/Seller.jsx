import { Route, Routes } from "react-router-dom"
import Sidebar from "../components/sidebar"
import Products from "./products"
import ProductProvider from "../context/product-provider"
import PaketList from "./paket-list"


function Seller() {
    return (
        <ProductProvider>
            <Routes >
                <Route path="/dashboard" element={<Sidebar />} />
                <Route path="/products" element={<Products />} />
                <Route path="/list-products" element={<PaketList />} />
            </Routes>
        </ProductProvider>
    )
}

export default Seller