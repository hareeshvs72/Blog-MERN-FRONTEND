import { faComment, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Bloglist from '../pages/UserList'
import Dashbord from '../pages/Dashbord'
import AdminHeader from './AdminHeader'


function AdminSidebar() {
    const [ navbarStyle , setNavbarStyle] = useState(false)
    const [ dashbordStyle , setDashbordStyle] = useState(true)
    const [ addBlogStyle , setAddBlogStyle] = useState(false)
    const [blogListStyle , setBlogListStyle] = useState(false)
    const [ commentStyle , setCommentStyle] = useState(false)
    const active = "font-bold  border-r-4 border-green-700 bg-green-400 w-full text-center p-3"
    const notActive = 'p-3 text-center font-bold'
  return (
    <>
    {/* <AdminHeader/> */}
    <div className='md:hidden block bg-green-400 p-3 text-2xl'  >
       <button onClick={()=>setNavbarStyle(!navbarStyle)} > <FontAwesomeIcon icon={faBars} /></button>
    </div>
    <div className={`${navbarStyle && 'md:block hidden'}   `}  >
            <div className="w-full h-full flex flex-col items-center px-2 md:py-10 mt-1   ">
               <NavLink to={'/admin-dashbord'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faHouse} className='mx-2' />DashBord
               </NavLink>
                {/* <NavLink to={'/admin-create'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faCirclePlus}  className='mx-2' />Add Blog
               </NavLink> */}
                <NavLink to={'/admin-userlist'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faListCheck}   className='mx-2'/>User List
               </NavLink>

            </div>
       
    </div>
    </>
  )
}

export default AdminSidebar