import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div className='w-full h-screen  flex items-center' >
      <img src="/pnf.gif" alt="" className='w-full md:h-screen relative bg-no-repeat bg-cover bg-center' />
      <div className=' absolute md:ml-10 ml-2 '>
        <button className="   gap-2 text-black font-bold md:px-20 px-2 py-2 my-2 bg-green-400  rounded hover:border-2 hover:border-green-400 hover:bg-black border-2 border-transparent hover:text-green-400">
          <Link to={'/'} >Go Back</Link>
        </button>

      </div>
    </div>
  )
}

export default Pnf