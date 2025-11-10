import { faComment, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import BASEURL from '../../service/serverURL'
import { adminUpdateContext } from '../../context/ResponseContextApi'



function AdminSidebar() {
    const {adminEditresponse,setAdmineditResponse} = useContext(adminUpdateContext)
  
    const [ navbarStyle , setNavbarStyle] = useState(false)
    const [adminDp,setAdminDp] = useState("")
  const [adminName,setAdminName] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem('users')){
      const user = JSON.parse((sessionStorage.getItem('users')))
      setAdminDp(user.profile)
      setAdminName(user.username)

    }
  
  },[adminEditresponse])
    const active = "font-bold  border-r-4 border-green-700 bg-green-400 w-full text-center p-3"
    const notActive = 'p-3 text-center font-bold'
  return (
    <>
    {/* <AdminHeader/> */}
    <div className='md:hidden block bg-green-400 p-3 text-2xl'  >
       <button onClick={()=>setNavbarStyle(!navbarStyle)} > <FontAwesomeIcon icon={faBars} /></button>
    </div>
     <div className='flex items-center  flex-col my-3 '>
            <img className='border ' src={adminDp=="" ?'https://tse1.mm.bing.net/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?pid=Api&P=0&h=180' : `${BASEURL}/uploads/${adminDp}` }alt='user admin logo' style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <p className='my-2'>{adminName}</p>
          </div>
    <div className={`${navbarStyle && 'md:block hidden'}   `}  >
            <div className="w-full h-full flex flex-col items-center px-2 md:py-3 mt-1   ">
               <NavLink to={'/admin-dashbord'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faHouse} className='mx-2' />DashBord
               </NavLink>
                {/* <NavLink to={'/admin-create'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faCirclePlus}  className='mx-2' />Add Blog
               </NavLink> */}
                <NavLink to={'/admin-userlist'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faListCheck}   className='mx-2'/>User List
               </NavLink>
               <NavLink to={'/admin-settings'} className={({isActive})=>isActive ? active :notActive} >
                     <FontAwesomeIcon icon={faListCheck}   className='mx-2'/>Admin Settings
               </NavLink>

            </div>
       
    </div>
    </>
  )
}

export default AdminSidebar