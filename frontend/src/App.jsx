import Seller from "./seller/pages/Seller"
import User from "./user/User"
import { ContextProvider } from "./user/context/ContextProvider"

function App() {
  return (
    <div>
      <ContextProvider>
        <User />
      </ContextProvider>
      <Seller />
    </div>
  )
}

export default App
