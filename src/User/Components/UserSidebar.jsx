import {  faHome, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck, faSquarePen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'


function UserSidebar() {
   const [ navbarStyle , setNavbarStyle] = useState(false)
      const [ dashbordStyle , setDashbordStyle] = useState(true)
      const [ addBlogStyle , setAddBlogStyle] = useState(false)
      const [blogListStyle , setBlogListStyle] = useState(false)
      const [ commentStyle , setCommentStyle] = useState(false)
      const active = "font-bold  border-r-4 border-green-700 bg-green-400 w-full  p-3"
      const notActive = 'p-3 text-center font-bold'
    return (
      <>
      {/* <AdminHeader/> */}
      <div className='md:hidden block bg-green-400 p-3 text-2xl'  >
         <button onClick={()=>setNavbarStyle(!navbarStyle)} > <FontAwesomeIcon icon={faBars} /></button>
      </div>
      <div className={`${navbarStyle && 'md:block hidden'}   `}  >
              <div className="w-full h-full flex flex-col items-center px-2 md:py-10 mt-1   ">
                 <NavLink to={'/Create'} className={({isActive})=>isActive ? active :notActive} >
                       <FontAwesomeIcon icon={faCirclePlus} className='mx-2' /> Create Blog
                 </NavLink>
                  <NavLink to={'/profile-edit'} className={({isActive})=>isActive ? active :notActive} >
                       <FontAwesomeIcon icon={faSquarePen}  className='mx-2' />Profile Edit
                 </NavLink>
                  <NavLink to={'/user-blog'} className={({isActive})=>isActive ? active :notActive} >
                       <FontAwesomeIcon icon={faListCheck}   className='mx-2'/>Blog List
                 </NavLink>
                  <NavLink to={'/'} className={({isActive})=>isActive ? active :notActive} >
                       <FontAwesomeIcon icon={faHome}   className='mx-2'/>Home
                 </NavLink>
  
              </div>
         
      </div>
      </>
    )
}

export default UserSidebar