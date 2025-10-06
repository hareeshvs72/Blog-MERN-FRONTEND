import { faComment, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function AdminSidebar() {
    const [ navbarStyle , setNavbarStyle] = useState(false)
    const [ dashbordStyle , setDashbordStyle] = useState(true)
    const [ addBlogStyle , setAddBlogStyle] = useState(false)
    const [blogListStyle , setBlogListStyle] = useState(false)
    const [ commentStyle , setCommentStyle] = useState(false)
  return (
    <>
    <div className='md:hidden block bg-green-400 p-3 text-2xl'  >
       <button onClick={()=>setNavbarStyle(!navbarStyle)} > <FontAwesomeIcon icon={faBars} /></button>
    </div>
    <div className={navbarStyle && 'md:block hidden '} >
        <div className="w-full h-full flex flex-col items-center px-2 md:py-10 mt-1 ">
            <div onClick={()=>{setDashbordStyle(true);setAddBlogStyle(false);setBlogListStyle(false);setCommentStyle(false) }} className={dashbordStyle ?'font-bold  border-r-6 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
                <button ><Link><FontAwesomeIcon icon={faHouse} className='mx-2' />DashBord</Link></button>
            </div>
              <div onClick={()=>{setAddBlogStyle(true);setDashbordStyle(false);setBlogListStyle(false);setCommentStyle(false) }} className={addBlogStyle ?'font-bold  border-r-6 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
                <button ><Link><FontAwesomeIcon icon={faCirclePlus}  className='mx-2' />Add Blog</Link></button>
            </div>
             <div onClick={()=>{setBlogListStyle(true);setDashbordStyle(false);setAddBlogStyle(false);setCommentStyle(false) }} className={blogListStyle ?'font-bold  border-r-6 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
                <button ><Link><FontAwesomeIcon icon={faListCheck}   className='mx-2'/>Add Blog</Link></button>
            </div>
            <div onClick={()=>{setCommentStyle(true);setDashbordStyle(false);setAddBlogStyle(false);setBlogListStyle(false) }} className={commentStyle ?'font-bold  border-r-6 border-green-700 bg-green-400 w-full text-center p-3' : 'p-3 text-center font-bold ' }>
                <button ><Link><FontAwesomeIcon icon={faComment}  className='mx-2' />Comments</Link></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminSidebar