import React, { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { getAllBlogsAdminAPI, updateBlogStatusAPI } from "../../service/allAPI"
import BASEURL from "../../service/serverURL"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'


function Dashbord() {
  const[blogs,setBlogs] = useState([])
  const [statusupdate,setStatusUpdate] = useState(false)
  useEffect(()=>{
      handileAllBlogs()
      setStatusUpdate(false)
  },[statusupdate])
 
  console.log(blogs);
 
   
  // display blogs
  const handileAllBlogs= async () =>{
    const token = sessionStorage.getItem("token")
    
    if(token){
      try {
           const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllBlogsAdminAPI(reqHeader)
    console.log(result.data);
    setBlogs(result.data)
    
        
      } catch (error) {
        
      }
    }
  }
  // aprove blog status
 
  const handileUpdateBlogStatus = async(blog)=>{
    const token = sessionStorage.getItem("token")
    
    if(token){
      try {
           const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await updateBlogStatusAPI(blog,reqHeader)
    if(result.status == 200) {
       toast.success("Approved the Blog !!!")
       setStatusUpdate(true)
    }
    else{
      toast.warning("someThing Went Wrong !!!")
    }
    console.log(result.data);
    // setBlogs(result.data)
    
        
      } catch (error) {
        
      }
    }
  }

  return (
         <>
    <AdminHeader/>

  
      <div className="md:grid grid-cols-5  ">
        <div className="col-span-1">
          <AdminSidebar/>
        </div>
        <div className="col-span-4 bg-green-100 py-5 min-h-screen ">
        <div className="md:grid grid-cols-4 md:mx-20 gap-2 md:mt-10">
              {/* Blogs */}
          <div className="flex p-3 items-center shadow my-2 ">
            <div className="p-3 bg-green-400 rounded-2xl mx-3">
              <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">{blogs?.length}</h1>
              <h3 className="text-center font-bold text-2xl">Blogs</h3>
            </div>
          </div>
  
          {/* Comments */}
          <div className="flex p-3 items-center shadow my-2">
            <div className="p-3 bg-green-400 rounded-2xl mx-3">
              <FontAwesomeIcon icon={faComments} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">{blogs.filter(item=>item?.status == "Aproved").length}</h1>
              <h3 className="text-center font-bold text-2xl">Aproved</h3>
            </div>
          </div>
  
          {/* Draft */}
          <div className="flex p-3 items-center shadow my-2">
            <div className="p-3 bg-green-400 rounded-2xl mx-3">
              <FontAwesomeIcon icon={faBook} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">{blogs.filter(item=>item?.status == "pending").length}</h1>
              <h3 className="text-center font-bold text-2xl">Pending</h3>
            </div>
          </div>
        </div>
        <div className="col-span-4">
                    <div className="md:mx-20">
                <h1 className="text-green-400 my-5 text-center text-4xl font-bold">All Blogs</h1>
              <div className="md:grid grid-cols-3  gap-10 my-5 md:my-0 my-3">
            {/* card dupliacte */}
            {blogs?.length > 0 ?
              blogs?.map((items, index) => (
                <div key={index} className='flex justify-between flex-col p-2 rounded shadow hover:shadow-2xl    md:my-0 my-3'>
                <div>
                    <div style={{ height: '200px' }}>
                      <img style={{ width: "100%", height: '200px', borderRadius: "10px" }} src={`${BASEURL}/uploads/${items?.thumbnail}`} alt="Thubnail" className='bg-cover' />
                    </div>
                    <div>
                      <div>
                        <h1 className='text-2xl font-bold my-2'>{items?.title}</h1>
                        <h1 className='text-xm text-blue-400 font-bold my-2'>{items?.subTitle}</h1>
                        <p className='font-semibold text-justify'>{items?.description.length > 120 ? `${items?.description.slice(0, 120)}...` : items?.description}</p>
                      </div>
                     <button className='px-4 mt-2 bg-black text-green-400 font-bold py-2 hover:bg-green-400 hover:text-black'>{items?.category}</button>
                    
                    </div>
                </div>
                 <div> 
                  {/* aprove button */}
                  {items?.status == "Aproved" ?
                  <div className="flex items-center justify-center my-3"><img className="" width={'80px'} src={'/aprove.webp'} alt="aprove gif" /></div>
                  :
                   <button onClick={()=>handileUpdateBlogStatus(items)} className='px-4 my-3 w-full bg-black text-green-400 font-bold py-2 hover:bg-green-400 hover:text-black'>Approved</button>}
                   </div>
                </div>))
              :
              <div>
                <p>no blogs are uploaded by any other users</p>
              </div>
            }
          

          </div>
              </div>
                </div>
        </div>
      </div>

        <ToastContainer
                position="top-right"
                autoClose={3000}
                pauseOnHover
                theme="colored"

            />
    </>
   
  
    
    
  
  )
}

export default Dashbord
