import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { createBlogApi } from '../../service/allAPI'
import { useNavigate } from 'react-router-dom'


function Create() {

  const [blogDetails, setBlogDetails] = useState({
    title:"",
    subTitle:"",
    description:"",
    category:"",
    thumbnail:[],
    
  })
  const [token,setToken] = useState("")
  const [thumPreview,setThumbPreview] = useState([])
  const navigate = useNavigate("")

  console.log(blogDetails);
  
  // use useEffect Hook For geting Token when this page will load

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  console.log(token);

  // reset input feild when upload blog complete
 const handileReset = ()=>{
  setBlogDetails({
    title:"",
    subTitle:"",
    description:"",
    category:"",
    thumbnail:[],
    
  })
  setThumbPreview('')
 }
  // handile uplaod thumbnail

  const handileThumbnail = (e)=>{
      console.log(e.target.files[0]);
      
      const fileArray = blogDetails.thumbnail
      console.log(fileArray);
      
      fileArray.push(e.target.files[0])
        console.log(fileArray);
     setBlogDetails({...blogDetails,thumbnail:fileArray})
      const url  = URL.createObjectURL(e.target.files[0])
      if(thumPreview.length < 1){
            const thumbnailSamble = thumPreview
      thumbnailSamble.push(url)
      setThumbPreview(thumbnailSamble)
      }
  
      console.log(url);
      console.log(thumPreview);
      
      
  }
  // upload blogs
  const handileUploadBlog = async ()=>{
    console.log("inside upload");
    
    const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
   const {title,subTitle,description,category,thumbnail }= blogDetails
    if(!title || !subTitle || !description|| !category || thumbnail.length == 0){
      toast.warning("Please Fill The Form Completedly")
    }
    const reqBody =new  FormData()
    for(let key in blogDetails){
      if(key !== "thumbnail"){
        reqBody.append(key,blogDetails[key])
      }
      else{
        blogDetails.thumbnail.forEach(img=>{
          reqBody.append("thumbnail", img)
        })
      }
    }
    try {
      const result = await createBlogApi(reqBody , reqHeader)
      if(result.status == 201){
        toast.success("Blog Created SucessFully")
        navigate("/blog")
        handileReset()
      }
      else if(result.status == 401){
       toast.info(result.response.data)
      }
      else{
        console.log(result);
        
      }
    } catch (error) {
      console.log(error);
      
    }

  }
  return (
    <>
      {/* <AdminHeader /> */}

      <>
        <div className="md:grid grid-cols-5">
          <div className="col-span-1 bg-black relative z-10">

            {/* <AdminSidebar /> */}
          </div>
          <div className="col-span-4 bg-green-100 min-h-screen">
            <div className='md:mx-40 p-3 gap-2 md:mt-10'>
              <div className='bg-white p-3 md:px-10 rounded-2xl  shadow-2xl '>
                <form >
                  {/* upload thubnail */}
                
                    <div className='inline-flex flex-col items-center justify-center'>
                      <input onChange={e=>handileThumbnail(e)} type="file" className='hidden' id='thubnail' />
                      <h3 className='font-bold my-3' >Upload Thumbnail</h3>
                      <div className='flex  md:flex-row flex-col '>
                      <label htmlFor="thubnail" className='border-2 bg-green-400 px-6 py-5 block rounded-2xl cursor-pointer'>
                        <FontAwesomeIcon icon={faCloudArrowUp} className='text-5xl' />
                        <p className='text-center'>Upload</p>
                      </label>
                   
                    <div className=''>
                     {thumPreview != "" && <img src={thumPreview} alt="thumbnail preview" width={'100px'} className='mx-2' height={'100px'} />}
                    </div>
                     </div>
                </div>

                  {/* title */}

                  <div className='my-3 md:w-[500px]'>
                    <label htmlFor="title" className='font-semibold'>Blog Title</label>
                    <input
                     onChange={(e)=>{setBlogDetails({...blogDetails,title:e.target.value})}}
                     value={blogDetails.title}
                      id='title'
                      type="text"
                      placeholder="Name"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    />
                    {/* sub Title */}
                  </div>
                  <div className='my-3 md:w-[500px]'>
                    <label htmlFor="subtitle" className='font-semibold'>Sub Title</label>
                    <input
                      onChange={(e)=>{setBlogDetails({...blogDetails,subTitle:e.target.value})}}
                     value={blogDetails.subTitle}
                      id='subtitle'
                      type="text"
                      placeholder="Name"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    />
                  </div>
                  {/* blog description */}
                  <div className='my-3 md:w-[500px]'>
                    <label htmlFor="BlogDescription" className='font-semibold'>Blog Description</label>
                    <textarea
                      onChange={(e)=>{setBlogDetails({...blogDetails,description:e.target.value})}}
                     value={blogDetails.description}
                      id='BlogDescription'
                      placeholder="Message"
                      className="my-2 w-full h-32 px-3 py-2 bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    ></textarea>
                  </div>
                  <div className='my-3 flex flex-col md:w-[200px]'>
                    <label htmlFor="category">Blog Category</label>
                    <input
                      onChange={(e)=>{setBlogDetails({...blogDetails,category:e.target.value})}}
                     value={blogDetails.category}
                      id='category'
                      type="text"
                      placeholder="Blog Category"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    />
                  </div>
                  <button type='button' onClick={handileUploadBlog} className="  flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 md:w-[500px] rounded hover:border-2 hover:border-green-400 hover:bg-black border-2 border-transparent hover:text-green-400">
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>


  <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"

      />
    </>
  )
}

export default Create