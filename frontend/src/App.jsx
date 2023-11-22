
import { Route, Routes } from "react-router-dom"
import Sidebar from "./seller/components/sidebar"
// import Product from "./seller/pages/product"

function App() {
  return (
    <div className="bg-[#D8DEDF]">
      <Routes>
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/" element={<Home />} />
        <Route> <Route path="/products" element={<Product />} /></Route>
      </Routes>
    </div>
  )
}

function Home() {
  return (
    <h1 className="font-bold text-2xl text-red-900 m-10">Welcome to Mangan</h1>
  )
}

export default App
