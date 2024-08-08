import React from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Body from "./components/Body"
const App = () => {
  return (
    <div className='bg-slate-100 h-screen w-full'>
      <Navbar />
      <Body />
      <Footer />
    </div>
  )
}

export default App
