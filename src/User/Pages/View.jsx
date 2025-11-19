
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { faUser, faCalendar, faCommentDots, faShareAlt, faPen, faTrash, faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Components/Footer";
import { Link, useParams } from 'react-router-dom';
import { createNewCommentAPI, getAllCommnetsAPI, getSingleBlogViewAPI, removeCommentAPi, updateCommentApi } from '../../service/allAPI';
import BASEURL from '../../service/serverURL';
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'
import {FacebookShareButton,FacebookIcon, WhatsappShareButton, WhatsappIcon} from 'react-share'

function View() {
  const [blog, setBlog] = useState({})
  const [token, setToken] = useState("")
  const { id } = useParams()
  const dateOnly = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const [text, setText] = useState("")
  const [allComments, setAllComments] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [userDp, setUserdp] = useState("")
  const [shareModale,setShareModale] = useState(false)
  const [shareURL,setShareUrl] = useState("")
  const [userId,setUserId] = useState()
  const [updateBtn,setUpdateBtn] = useState(false)
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      const users = JSON.parse(sessionStorage.getItem("users"))
      setUserdp(users.profile)
      displayBlogView()
      displayCommnets()
      setUserId(users._id)
        setShareUrl(window.location.href)
      
    }
  }, [token, refresh])

  console.log(userId);
  
  // browser url
  // console.log("url of brwser " , shareURL);
  
// copy url 
console.log(allComments);


const handileCopyUrl = ()=>{
  console.log("inside copy url function");
  
  navigator.clipboard.writeText(shareURL)
  
}

  // Display comments
  const displayCommnets = async () => {
    try {
      if (token) {
        const reqHeader = { "Authorization": `Bearer ${token}` }
        const result = await getAllCommnetsAPI(id, reqHeader)
        if (result.status == 200) {
          setAllComments(result.data)
        }
      }
    } catch (error) { console.log(error); }
  }

  // Add comment
  const addNewCommnet = async () => {
    const reqBody = { text }
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` }
      const result = await createNewCommentAPI(id, reqBody, reqHeader)
      if (result.status == 200) {
        toast.success("Comment Added SuccessFully !!!")
        setText("")
        setRefresh(true)
      }
    } catch (error) { }
  }

  // Display blog
  const displayBlogView = async () => {
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` }
      try {
        const result = await getSingleBlogViewAPI(id, reqHeader)
        if (result.status == 200) {
          setBlog(result.data)
        }
      } catch (error) { }
    }
  }
  //  handile edit button
const handileEditButton = (commentDetail) => {
  setText(commentDetail.text);
  setUpdateBtn(true);
  setSelectedComment(commentDetail); 
};

  // update comment 
  const updateComment = async () => {
  console.log("inside update comment");

  if (!selectedComment) {
    toast.error("No comment selected!");
    return;
  }

  if (!text) {
    toast.info("Please fill the comment box");
    return;
  }

  const reqHeader = {
    "Authorization": `Bearer ${token}`,
    
  };

  const reqBody = {
    _id: selectedComment._id,
    text: text,
    userId:selectedComment.userId
  };

  try {
    const result = await updateCommentApi(reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Comment Updated!");
      setText("");
      setUpdateBtn(false);
      setSelectedComment(null);
      setRefresh(prev=>!prev); // refresh comments
    }
  } catch (error) {
    console.log(error);
  }
};

// delete comment

const handileDeleteComment = async(commentID)=>{
  console.log("inside handileDeleteComment");
  if(token){
     const reqHeader = {
    "Authorization": `Bearer ${token}`,
    
  };
    try {
     const result = await removeCommentAPi(commentID,reqHeader)
     if(result.status == 200){
      toast.success("Delete SuccessFully !!!")
      setRefresh(prev=>!prev)
     }
     else{
      console.log(result.response.data);
      
     }
  } catch (error) {
    console.log(error);
    
  }
  }
}
  
  return (
    <>
      <Header />

      {token ? (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
          <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Thumbnail */}
            <div className="w-full h-120">
              <img
                src={blog?.thumbnail ? `${BASEURL}/uploads/${blog?.thumbnail}` : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"}
                alt="Blog Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="p-8">

              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase mb-3">
                {blog?.category}
              </span>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {blog?.title}
              </h1>

              <p className="text-gray-500 text-lg mb-6">
                {blog?.subTitle}
              </p>

              {/* Info row */}
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
              {blog?.description && (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {blog?.description.slice(0, 50)}
                  <br />
                  {blog?.description.slice(50)}
                </p>
              )}

              {/* SHARE BUTTON  */}
              <div className="my-6 flex justify-end">
                <button onClick={()=>setShareModale(true)} className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-green-700 flex items-center gap-2">
                  <FontAwesomeIcon icon={faShareAlt} /> Share
                </button>
              </div>

            </div>

            <hr className="my-8" />

            {/* COMMENTS SECTION */}
            <div className="p-3 px-8 pb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

              {/* Comment Input */}
              <div className="flex items-start space-x-3 mb-6">
                <img
                  src={userDp ?
                    userDp.startsWith('https://lh3.googleusercontent.com/')
                      ? userDp
                      : `${BASEURL}/uploads/${userDp}`
                    : "https://i.pravatar.cc/50?img=5"}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <textarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="Write a comment..."
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  ></textarea>
{updateBtn ?
                 
                  <button
                   onClick={updateComment}


                    type="button"
                    className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                   update
                  </button>
                  :
                   <button
                    onClick={addNewCommnet}
                    type="button"
                    className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                  Post Comment
                  </button>}
                </div>
              </div>

              {/* coomets dupliacte */}
              <div className="space-y-5">

                {allComments?.length > 0 &&
                  allComments.map((items, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      
                      {/* DP */}
                      <img
                        src={items?.userId?.profile
                          ? items.userId.profile.startsWith('https')
                            ? items.userId.profile
                            : `${BASEURL}/uploads/${items.userId.profile}`
                          : "https://i.pravatar.cc/50?img=8"}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />

                      {/* Comment Box */}
                      <div className="bg-gray-100 p-4 rounded-xl w-full shadow-sm border border-gray-200">

                        {/* Username */}
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-gray-800">
                            {items?.userId?.username}
                          </h4>

                          {/* edite and comment */}
                         {
                         items?.userId?._id == userId &&
                          <div className=" flex gap-3">
                            <button onClick={()=>{handileEditButton(items)}} className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
                              <FontAwesomeIcon icon={faPen} /> Edit
                            </button>
                            <button onClick={()=>{handileDeleteComment(items?._id)}} className="text-red-600 hover:text-red-800 text-sm font-semibold flex items-center gap-1">
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                          </div>}
                        </div>

                        {/* Text */}
                        <p className="text-gray-700 text-sm mt-1">{items?.text}</p>

                        {/* Time */}
                        <span className="text-xs text-gray-500 block mt-2">
                          {moment(items?.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center flex-col'>
          <img src="https://hailbytes.com/wp-content/uploads/2020/07/Login.gif" alt="login gif" />
          <p className='my-5 font-semibold text-xl'>
            Please <Link to={'/login'} className='text-green-400'>Login</Link> To View More
          </p>
        </div>
      )}

      {/* share modale */}
      {
      shareModale&&
        <div>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            {/* Close Button */}
            <button onClick={()=>setShareModale(false)} className="absolute right-3 top-3">
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5 " />
            </button>


            <h2 className="text-xl font-semibold mb-5">Share this post</h2>


            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 border rounded-xl hover:bg-gray-100 transition cursor-pointer">
                 {/* <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-green-500" /> */}
                   <WhatsappShareButton url={shareURL} >
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                <span className="text-sm">WhatsApp</span>
              </div>


              <div className="flex flex-col items-center gap-2 p-3 border rounded-xl hover:bg-gray-100 transition cursor-pointer">
                {/* <FontAwesomeIcon icon={faFacebook} className="text-2xl text-blue-500" /> */}
                  <FacebookShareButton url={shareURL} >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                <span className="text-sm">Facebook</span>
              </div>


              <div onClick={()=>{handileCopyUrl()}} className="flex flex-col items-center gap-2 p-3 border rounded-xl hover:bg-gray-100 transition cursor-pointer">
                {/* <Copy className="h-7 w-7" /> */}
                 <FontAwesomeIcon icon={faCopy}  className="text-2xl" />
                <span className="text-sm">Copy Link</span>
              </div>
            </div>


            {/* Copy URL Box */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
                <span className="truncate text-sm text-green-900"> {shareURL} </span>
                <FontAwesomeIcon icon={faCopy} onClick={()=>{handileCopyUrl()}}  className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

      </div>
      
      }

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </>
  )
}

export default View
