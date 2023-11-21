import { Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard"
function Seller() {
    return (
        <div className="bg-[#D8DEDF]">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default Seller