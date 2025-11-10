import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { faUser, faCalendar, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Components/Footer";
import { Link, useParams } from 'react-router-dom';
import { createNewCommentAPI, getAllCommnetsAPI, getSingleBlogViewAPI } from '../../service/allAPI';
import BASEURL from '../../service/serverURL';
  import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'

function View() {
  const [blog,setBlog] = useState({})
  const [token,setToken] = useState("")
  const {id} = useParams()
  const dateOnly = new Date(blog.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
const [text,setText] = useState("")
const [allComments,setAllComments] = useState([])
const [refresh,setRefresh]= useState(false)
const [userDp,setUserdp] = useState("")
// console.log(dateOnly);
console.log(blog);

  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
       setToken(sessionStorage.getItem("token"))
       const users = JSON.parse(sessionStorage.getItem("users"))
       console.log(users);
       setUserdp(users.profile)
       displayBlogView()
       displayCommnets()
    }
  },[token,refresh])
console.log(userDp);

console.log(allComments);

// display all the comments 

  const displayCommnets = async()=>{
    console.log("inside display comments");
    
    try {
      console.log("no token ", token);
      
    if(token){
        const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
      const result = await getAllCommnetsAPI(id,reqHeader)
      if(result.status == 200){
        console.log(result.data);
        
          setAllComments(result.data)
      }else{
        console.log("failed to get commnets",result);
        
      }
    }
    } catch (error) {
      console.log(error);
      
    }
  }

  // add comments to blog

  const addNewCommnet = async()=>{
   console.log("inside add new commnet");
       const reqBody = {
        text
       }
       
       
        try {
           const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await createNewCommentAPI(id,reqBody,reqHeader)
            if(result.status == 200){
              toast.success("Comment Added SuccessFully !!!")
               setText("")
               setRefresh(true)
            }
            else{
              console.log(result);
              
            }
        } catch (error) {
          
        }
       
   
  }

// display blog view
  const displayBlogView = async()=>{
     
     console.log( "inside view function");
   if(token){
          const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
     try {
      const result = await getSingleBlogViewAPI(id,reqHeader)
      if(result.status == 200){
         setBlog(result.data)
      }else{
        console.log(result);
        
      }
     } catch (error) {
      console.log(error);
      
     }
   }

     
  }
  return (
    
    <>
      <Header />
      {token ? <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div>
            {/* Thumbnail */}
              
              <div className="w-full h-120">
                <img
                  src={blog?.thumbnail ? `${BASEURL}/uploads/${blog?.thumbnail}`: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"}
                  alt="Blog Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
    
              {/* Blog Content */}
              <div className="p-8">
                {/* Category */}
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase mb-3">
                  {blog?.category}
                </span>
    
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {blog?.title}
                </h1>
    
                {/* Subtitle */}
                <p className="text-gray-500 text-lg mb-6">
                  {blog?.subTitle}
                </p>
    
                {/* Author & Date */}
                <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> By {blog?.username}
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" /> {blog?.createdAt && dateOnly}
                  </span>
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faCommentDots} className="mr-2" /> {allComments?.length} Comments
                  </span>
                </div>
    
                {/* Description */}
                {blog?.description && <p className="text-gray-700 leading-relaxed mb-6">
                   { blog?.description.slice(0,50) }
                    <br></br>
               
                 {blog?.description.slice(50)}
                </p>}
           
  
          </div>
           
            <hr className="my-8" />

            {/* Comment Section */}
            <div className='p-3'>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

              {/* Comment Input */}
              <div className="flex items-start space-x-3 mb-6">
                <img
                  src={userDp ?  userDp.startsWith('https://lh3.googleusercontent.com/') ? userDp : `${BASEURL}/uploads/${userDp}`: "https://i.pravatar.cc/50?img=5"}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                  onChange={(e)=>setText(e.target.value)}
                  value={text}
                    placeholder="Write a comment..."
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  ></textarea>
                  <button
                   onClick={addNewCommnet}
                    type="button"
                    className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Existing Comments */}
              <div className="space-y-5">
                {/* Comment 1 */}
             {allComments?.length > 0 &&
             allComments?.map((items,index)=>(
                <div key={index} className="flex items-start space-x-3">
                  <img
                    src={items?.userId?.profile ? items?.userId?.profile.startsWith('https://lh3.googleusercontent.com/') ? items?.userId?.profile : `${BASEURL}/uploads/${items?.userId?.profile}` :"https://i.pravatar.cc/50?img=8"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg w-full">
                    <h4 className="font-semibold text-gray-800">{items?.userId?.username}</h4>
                    <p className="text-gray-700 text-sm">
                     {items?.text}
                    </p>
                    <span className="text-xs text-gray-500"> {moment(items?.createdAt).fromNow()} </span>
                  </div>
                </div>
             ))
              
                
              }

             
              </div>
            </div>
          </div>
        </div>
      </div>
    :
     <div className='flex items-center justify-center flex-col '>
          <img src="https://hailbytes.com/wp-content/uploads/2020/07/Login.gif" alt="login gif" />
          <p className='my-5 font-semibold text-xl'>Please <Link to={'/login'} className='text-green-400' >Login</Link> To View More</p>
        </div>  
    }
      <Footer />
         <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnHover
          theme="colored"

        />
    </>
  )
}

export default View
