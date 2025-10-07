import { faComment, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Bloglist from '../pages/Bloglist'
import Dashbord from '../pages/Dashbord'
import AdminHeader from './AdminHeader'


function AdminSidebar() {
    const [ navbarStyle , setNavbarStyle] = useState(false)
    const [ dashbordStyle , setDashbordStyle] = useState(true)
    const [ addBlogStyle , setAddBlogStyle] = useState(false)
    const [blogListStyle , setBlogListStyle] = useState(false)
    const [ commentStyle , setCommentStyle] = useState(false)
  return (
    <>
    {/* <AdminHeader/> */}
    <div className='md:hidden block bg-green-400 p-3 text-2xl'  >
       <button onClick={()=>setNavbarStyle(!navbarStyle)} > <FontAwesomeIcon icon={faBars} /></button>
    </div>
    <div className={`${navbarStyle && 'md:block hidden'}   `}  >
        <ul className="w-full h-full flex flex-col items-center px-2 md:py-10 mt-1   ">
            <li onClick={()=>{setDashbordStyle(true);setAddBlogStyle(false);setBlogListStyle(false);setCommentStyle(false) }} className={dashbordStyle ?'font-bold  border-r-4 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
               <Link to={'/admin-dashbord'} ><FontAwesomeIcon icon={faHouse} className='mx-2' />DashBord</Link>
            </li>
              <li onClick={()=>{setAddBlogStyle(true);setDashbordStyle(false);setBlogListStyle(false);setCommentStyle(false) }} className={addBlogStyle ?'font-bold  border-r-4 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
                <Link to={'/admin-create'} ><FontAwesomeIcon icon={faCirclePlus}  className='mx-2' />Add Blog</Link>
            </li>
             <li onClick={()=>{setBlogListStyle(true);setDashbordStyle(false);setAddBlogStyle(false);setCommentStyle(false) }} className={blogListStyle ?'font-bold  border-r-4 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
               <Link  to={'/admin-bloglist'}><FontAwesomeIcon icon={faListCheck}   className='mx-2'/>Blog List</Link>
            </li>
            
        </ul>
        {/* conditional rendering */}
        {/* <div className='col-span-4'>
          {
            
            dashbordStyle &&<Dashbord/>
            
            
          }
        </div> */}
    </div>
    </>
  )
}

export default AdminSidebar