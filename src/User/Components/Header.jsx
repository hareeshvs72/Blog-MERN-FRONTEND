import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faSquarePlus, faUser } from '@fortawesome/free-regular-svg-icons'
import { faAddressCard, faBars, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { easeIn, easeInOut, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [navBarBtn, setNavBarbtn] = useState(false)
  const [token , setToken] = useState("")
  const [dropDown , setDropDown] = useState(false)
  const [userDp , setUserDp] = useState("")
 
  const navigate = useNavigate()

  useEffect(()=>{
   if(sessionStorage.getItem('token')){
    const token = sessionStorage.getItem('token')
    setToken(token)
    const user = JSON.parse(sessionStorage.getItem('users'))
    setUserDp(user.profile)
    console.log(userDp)
    
   }
  },[token])
  console.log(userDp);
  

  const logout = ()=>{
        sessionStorage.clear()
        navigate('/')
        setDropDown(false)
        setToken("")
  }
  return (
    <>
      <motion.div 
        initial={{opacity:0, y:-100}}
     animate={{opacity:1 , y:0}}
     transition={{duration:.3 , ease:easeIn}}
      >
        {/* First Header */}
        <div className="w-full py-1 md:px-10 px-2 flex justify-end text-green-400 items-center">
          <a href='#'  aria-label="Facebook" className='mx-2 text-2xl hover:text-black transition-colors' > <FontAwesomeIcon icon={faFacebook} /></a>
          <a href='#'  aria-label="instagram" className='mx-2 text-2xl  hover:text-black transition-colors'>  <FontAwesomeIcon icon={faInstagram} /></a>
          <a href='#' aria-label="twitter x" className='mx-2 text-2xl  hover:text-black transition-colors'><FontAwesomeIcon icon={faXTwitter} /></a>
        </div>

        {/* Second Header */}

        <div className="px-2 bg-green-400 md:flex  justify-between items-center md:py-0 py-2 md:px-10">
          <div className='flex items-center justify-between'>
            {/* logo and Name */}
            <div className='hidden md:block'>
              <img src="/logo.png" style={{ width: '100px', height: '70px' }} alt="Logo" />
            </div>
            {/* nav bar button */}
            <div className='flex items-center justify-between w-full my-2'>
              <div className='md:hidden '>
                <button onClick={() => { setNavBarbtn(!navBarBtn) }} ><FontAwesomeIcon icon={faBars} className='text-2xl ' /></button>
              </div>
              {/* small screen Login */}
              <div className="md:hidden block ">
                <button className='bg-black  text-green-400 px-3 py-2 rounded font-semibold hover:border border-black hover:bg-green-400 hover:text-black transition-all' ><Link to={'/login'} ><FontAwesomeIcon icon={faUser} />Login</Link></button>
              </div>
            </div>
          </div>
          {/* nav bar */}
          <div className={navBarBtn ? 'flex md:flex-row  flex-col md:bg-none bg-black rounded text-green-400' : ' md:flex justify-center items-center hidden'}>
            <Link to={'/'} className='mx-3 md:my-0 my-2 font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >Home</Link>
            <Link to={'/blog'} className='mx-3 md:my-0 my-2 font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >Blog</Link>
            <Link to={'/aboutus'} className='mx-3  md:my-0 my-2 font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >AboutUS</Link>
            <Link to={'/contact'} className='mx-3  md:my-0 my-2  font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >Contact</Link>
          </div>
          {/* login link */}
        <div>
            { !token ?
              <div className="md:block hidden">
              <button className='md:bg-black md:text-green-400 px-3 py-2 rounded font-semibold hover:border border-black hover:bg-green-400 hover:text-black transition-all' ><Link to={'/login'} ><FontAwesomeIcon  icon={faUser} />Login</Link></button>
            </div>
            :
            <div>
              <img onClick={()=>setDropDown(!dropDown)} src={userDp == "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" : userDp.startsWith('https://lh3.googleusercontent.com/'? userDp :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s" ) } alt="userImage" width={"40px"} height={'40px'} style={{borderRadius:'50%'}} />
              
                 { dropDown &&
                        <div className='absolute right-0 px-4 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'>
                        <div className="py-1 ">
                          <Link className='block  py-2  text-sm text-gray-700' to={'/profile'}> <p><FontAwesomeIcon icon={faAddressCard} className='me-2' /> Profile </p></Link>
                          <Link className='block  py-2  text-sm text-gray-700' to={'/create'}> <p><FontAwesomeIcon icon={faSquarePlus} className='me-2 font-bold' /> Create </p></Link>
                          <button type='button' onClick={logout} ><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout </button>
                        </div>
                      </div>}
              </div>
           
            }
          </div>
        </div>

      </motion.div>


    </>
  )
}

export default Header