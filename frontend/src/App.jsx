import Dashboard from "./seller/components/dashboard"
import { Route, Routes } from "react-router-dom"
import LandingPage from "./user/pages/LandingPage"

function App() {
  return (
    <div className="bg-[#D8DEDF]">
      <Routes>
        {/* User Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Seller Route */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
