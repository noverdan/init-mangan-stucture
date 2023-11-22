import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

function User() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default User