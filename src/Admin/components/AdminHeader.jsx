import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { easeInOut, motion } from 'framer-motion'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminHeader() {
  const navigate = useNavigate()

  const handileLogout = () => {
    sessionStorage.clear()
    navigate('/login')
  }

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="bg-green-400 shadow-md px-6 md:px-10 py-3 flex items-center justify-between sticky top-0 z-20"
    >
      
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="logo"
          width="85"
          height="85"
          className="drop-shadow-md"
        />
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={handileLogout}
          className="px-5 py-2 bg-black text-green-400 font-bold rounded-xl 
                     hover:bg-green-600 hover:text-black transition-all shadow-md"
        >
          <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
          Logout
        </button>
      </div>

    </motion.div>
  )
}

export default AdminHeader
