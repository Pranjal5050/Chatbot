// import { useState } from "react"
// import Home from "./pages/Home"

// function App() {

//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (

//     <div className="flex h-screen bg-[#0f172a] text-white">



//       <Home
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//     </div>

//   )

// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App