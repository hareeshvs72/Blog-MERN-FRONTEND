import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

function Pnf() {
   const navigate = useNavigate("")
  const [token, setToken]= useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[token])
  return (
    <>
    
   
     { token ?
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
  :
        <div className="h-screen flex flex-col items-center justify-center bg-green-50 p-4">
          <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-green-200">
  
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center shadow">
  
                <FontAwesomeIcon icon={faLock} className='text-2xl' />
              </div>
            </div>
  
            {/* Text */}
            <h1 className="text-2xl font-bold text-green-700">
              Please Login
            </h1>
  
            <p className="mt-2 text-gray-600">
              You must be logged in to view this page.
            </p>
  
            {/* Button */}
            <button onClick={() => navigate("/login")} className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md">
              Login Now
            </button>
          </div>
        </div>
  
      }


    </>
  )
}

export default Pnf
