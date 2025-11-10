import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { easeInOut, motion } from 'framer-motion'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminHeader() {
  const navigate  =  useNavigate()
  const handileLogout = ()=>{
    sessionStorage.clear()
    navigate('/login')
  }
  return (
     <div 
     className='bg-green-400   px-10 flex items-center justify-between'>
        <div>
            <img src="/logo.png" alt="logo" width={'80px'} height={'80px'} />
        </div>
        <div>
          <button onClick={handileLogout} className='px-4 bg-black text-green-400 font-bold py-2 hover:rounded-3xl'><FontAwesomeIcon icon={faPowerOff} />Logout</button>
        </div>

    </div>
  )
}

export default AdminHeader