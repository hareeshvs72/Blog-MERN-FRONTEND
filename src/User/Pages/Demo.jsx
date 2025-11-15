import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'


function Demo() {
 const navigate = useNavigate("")


  return (
   <>
   
   <div className="h-screen flex flex-col items-center justify-center bg-green-50 p-4">
  <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-green-200">
    
    {/* Icon */}
    <div className="flex justify-center mb-4">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center shadow">
      
        <FontAwesomeIcon icon={faLock}  className='text-2xl'/>
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
    <button onClick={()=>navigate("/login")} className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-md">
      Login Now
    </button>
  </div>
</div>


   </>
  
  )
}

export default Demo
