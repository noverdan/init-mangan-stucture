import Dashboard from "./seller/components/dashboard"
import { Route,Routes } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home/>} />
    </Routes>
  )
}

function Home(){
  return(
    <h1 className="font-bold text-2xl text-red-900 m-10">Welcome to Mangan</h1>
  )
}

export default App
