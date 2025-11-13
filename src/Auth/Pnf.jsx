import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      
      {/* Background gif*/}
      <img 
        src="/pnf.gif" 
        alt="Page Not Found" 
        className="absolute inset-0 w-full h-full object-cover"
      />

     
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-400 drop-shadow-lg">
          404
        </h1>
        <p className="text-xl md:text-2xl text-white font-semibold mb-8 drop-shadow">
          Oops! Page Not Found
        </p>

        <Link to={'/'}>
          <button className="px-8 py-3 bg-green-400 font-bold text-black rounded-lg hover:bg-black hover:text-green-400 border-2 border-transparent hover:border-green-400 transition-all duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Pnf
