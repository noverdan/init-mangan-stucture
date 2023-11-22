import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/sidebar"
function Seller() {
    return (
        <div className="bg-[#D8DEDF]">
            <Routes>
                <Route path="/dashboard" element={<Sidebar />} />
            </Routes>
        </div>
    )
}

export default Seller