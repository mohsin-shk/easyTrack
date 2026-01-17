import React from "react"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"

function App() {
  
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-[#020B2A] to-black text-white flex items-start justify-center pt-32">
        <Navbar/>
        <Dashboard/>
      </div>
    </>
  )
}

export default App
