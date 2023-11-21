import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

function User() {
    return (
        <div className="bg-[#D8DEDF]">
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default User