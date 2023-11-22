import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Navbar from "./components/Navbar"

function User() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default User