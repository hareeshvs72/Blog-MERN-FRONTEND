import React, { useEffect, useState } from 'react'
import UserSidebar from '../Components/UserSidebar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faComments, faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { toast, ToastContainer } from 'react-toastify'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { getIndividualUserBlogAPi, getSingleBlogViewAPI, removeIndividualBlogsAPI, updateBlogApi } from '../../service/allAPI'
import { Link, useNavigate } from 'react-router-dom'
import BASEURL from '../../service/serverURL'

function UserBlogList() {

  const [blogs, setBlogs] = useState([])
  const [deleteBlog, setDeleteBlog] = useState({})
  const navigate = useNavigate()
  const [thumPreview, setThumbPreview] = useState("")
  const [editModale, setEditModale] = useState(false)
  const[dotModale,setDotModale] = useState(null)
  
  const [blogId, setBlogId] = useState("")
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    thumbnail: "",
    allowUpload: false,
    username: ""

  })
  console.log(blogDetails);
  console.log(thumPreview);

  // console.log(blogs);

  useEffect(() => {
    getAllBlogs()

  }, [deleteBlog])

  console.log(blogs.length);

  //  category count 

  const categoryCount = blogs.map(item => item.category).length
  console.log(categoryCount);

  // get all individual user blog 
  const getAllBlogs = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getIndividualUserBlogAPi(reqHeader)
        if (result.status == 200) {
          setBlogs(result.data)
        }
        else {
          console.log(result);

        }
      } catch (error) {
        console.log(error);

      }
    }
  }
  // delet individual user Blog
  const deleteBlogs = async (blogId) => {
    try {
      const result = await removeIndividualBlogsAPI(blogId)
      if (result.status == 200) {
        toast.success("Delete The Blog SuccessFully !!!")
        setDeleteBlog(result.data)
      }
      else {
        console.log(result);

      }

    } catch (error) {
      console.log(error);

    }
  }

  const getBlogId = async (blogId) => {
    displayBlogView(blogId)
    setBlogId(blogId)
    setEditModale(true)
  }

  console.log(blogId);
  // handile thubnail

  const handileThumbnail = (e) => {
    console.log(e.target.files[0]);

    // const fileArray = blogDetails.thumbnail
    // console.log(fileArray);

    // fileArray.push(e.target.files[0])
    // console.log(fileArray);
    setBlogDetails({ ...blogDetails, thumbnail: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    if (url) {


      setThumbPreview(url)
    }


    console.log(url);
    console.log(thumPreview);


  }

  const handileUpdateBLog = async () => {
    const token = sessionStorage.getItem("token")
    console.log("inside view function");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      const reqBody = new FormData();

      for (let key in blogDetails) {
        if (key === "thumbnail") {

          if (blogDetails.thumbnail instanceof File) {
            reqBody.append("thumbnail", blogDetails.thumbnail);
          }
        } else {
          reqBody.append(key, blogDetails[key]);
        }
      }


      try {
        const result = await updateBlogApi(blogId, reqBody, reqHeader)
        if (result.status == 200) {
          toast.success("Update Blog SuccessFully !!!")
          setTimeout(() => {
            setEditModale(false)
          })
        }
        else {
          console.log(result);

        }
      } catch (error) {
        console.log(error);

      }
    }
  }

  const displayBlogView = async (blogId) => {
    const token = sessionStorage.getItem("token")
    console.log("inside view function");
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getSingleBlogViewAPI(blogId, reqHeader)
        if (result.status == 200) {
          console.log(result.data);

          setBlogDetails(result.data)
          setThumbPreview(result.data.thumbnail)


        } else {
          console.log(result);

        }
      } catch (error) {
        console.log(error);

      }
    }


  }




  return (
    <>
      <div className="md:grid grid-cols-5 ">
        <div className="col-span-1 relative z-10">

          <UserSidebar />
        </div>
        <div className="col-span-4   bg-green-100 min-h-screen">
          <div className="md:grid grid-cols-4 md:mx-20 gap-2 md:mt-10">
            {/* Blogs */}
            <div className="flex p-3 items-center shadow my-2 hover:bg-black hover:text-green-400 transition-colors ">
              <div className="p-3 bg-green-400 rounded-2xl mx-3">
                <FontAwesomeIcon icon={faSquarePlus} className="text-2xl text-black" />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl">{blogs?.length}</h1>
                <h3 className="text-center font-bold text-2xl">No Of Blogs</h3>
              </div>
            </div>

            {/* Comments */}
            <div className="flex p-3 items-center shadow my-2  hover:bg-black hover:text-green-400 transition-colors">
              <div className="p-3 bg-green-400 rounded-2xl mx-3">
                <FontAwesomeIcon icon={faComments} className="text-2xl  text-black" />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl">{blogs?.filter(item=>item.status == "Aproved").length}</h1>
                <h3 className="text-center font-bold text-2xl">Aproved</h3>
              </div>
            </div>

            {/* Draft */}
            <div className="flex p-3 items-center shadow my-2  hover:bg-black hover:text-green-400 transition-colors">
              <div className="p-3 bg-green-400 rounded-2xl mx-3">
                <FontAwesomeIcon icon={faBook} className="text-2xl  text-black" />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl">{categoryCount}</h1>
                <h3 className="text-center font-bold text-2xl">Categories</h3>
              </div>
            </div>
          </div>
          <div className="md:mx-10 md:mt-10">
            <h1 className="text-green-400 text-xl font-bold">All Blogs</h1>
            <table className="my-3 shadow w-full table-auto bg-black p-3 rounded-xl">
              <thead className="text-white">
                <tr>
                  {/* <th className="px-4 py-2 text-left font-bold text-xl">#</th> */}
                  <th className="px-4 py-2 text-left font-semibold text-xl"> Title</th>
                  <th className="px-4 py-2 text-left font-semibold text-xl">Date</th>
                  <th className="px-4 py-2 text-left font-semibold text-xl">Status</th>
                  <th className="px-4 py-2 text-left font-semibold text-xl">Actions</th>
                </tr>
              </thead>
              {/* duplicate blog list */}
              <tbody >
                {blogs?.length > 0 ?
                  blogs?.map((item, index) => (
                    <tr key={item?._id} className="text-green-400  ">
                      {/* <td className="px-4 py-2 font-bold text-lg">{index + 1}</td> */}
                      <td className="px-4 py-2 flex items-center">
                        <img width={'70px'} height={'40px'} className='object-cover' src={`${BASEURL}/uploads/${item?.thumbnail}`} alt="" />

                      <Link className='hover:underline ' to={`/${item?._id}/view`} > <h1 className='font-semibold mx-3'>  {item?.title}</h1></Link>
                       </td>
                      <td className="px-4 py-2">{new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}</td>
                      <td className={`px-4 py-2 font-semibold ${item?.status == "Aproved" ?  "text-green-600" : "text-red-600"  }`}>{item?.status}</td>
                      <td className="px-4 py-2">
                        <button className='relative p-3 cursor-pointer bg-white rounded-2xl' onClick={()=>setDotModale(dotModale === item?._id ? null : item?._id)}><img src="/3dot.png" alt="3 dot" width={'20px'} /></button>
                      {dotModale === item?._id &&
                        <div className="absolute  bg-white border shadow-md rounded p-2 mt-1 z-10">
                          <button onClick={() => { getBlogId(item?._id) }} className="bg-black text-green-400 px-3 py-1 rounded">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button onClick={() => deleteBlogs(item?._id)} className="bg-black text-green-400 px-3 py-1 ml-2 rounded">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>}
                      </td>
                    </tr>
                  ))

                  :
                  <div>Not Upload Any Blogs Yet</div>
                }
              </tbody>
            </table>
          </div>
        </div>
        {editModale && 
        <div className='absolute flex   justify-center inset-0 min-h-screen z-10 bg-black'>
          {/* close edit */}
          <div><button  className='bg-black p-2 rounded-2xl mx-2 text-green-400' onClick={()=>setEditModale(false)}><FontAwesomeIcon icon={faXmark}/></button></div>
          <div className=' bg-black p-3 md:px-10 rounded-2xl  shadow-2xl '>
            <form className='text-green-400' >
              {/* upload thubnail */}

              <div className='inline-flex flex-col items-center justify-center'>
                <input onChange={e => handileThumbnail(e)} type="file" className='hidden' id='thubnail' />
                <h3 className='font-bold my-3' >Upload Thumbnail</h3>
                <div className='flex  md:flex-row flex-col '>
                  <label htmlFor="thubnail" className='border-2 bg-green-400 px-6 py-5 block rounded-2xl cursor-pointer'>
                    <FontAwesomeIcon icon={faCloudArrowUp} className='text-5xl text-black' />
                    <p className='text-center'>Upload</p>
                  </label>

                  <div  className='my-3 h-24 w-50'>
                    <img
                      src={thumPreview.startsWith("blob:")
                        ? thumPreview
                        : `${BASEURL}/uploads/${thumPreview}`
                      }
                      alt="thumbnail preview"
                      className='mx-2 w-full h-full'
                    />

                  </div>
                </div>
              </div>

              {/* title */}

              <div className='my-3 md:w-[500px]'>
                <label htmlFor="title" className='font-semibold'>Blog Title</label>
                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, title: e.target.value }) }}
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
                  onChange={(e) => { setBlogDetails({ ...blogDetails, subTitle: e.target.value }) }}
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
                  onChange={(e) => { setBlogDetails({ ...blogDetails, description: e.target.value }) }}
                  value={blogDetails.description}
                  id='BlogDescription'
                  placeholder="Message"
                  className="my-2 w-full h-32 px-3 py-2 bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                ></textarea>
              </div>
              <div className='my-3 flex flex-col md:w-[200px]'>
                <label htmlFor="category">Blog Category</label>
                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, category: e.target.value }) }}
                  value={blogDetails.category}
                  id='category'
                  type="text"
                  placeholder="Blog Category"
                  className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                />
              </div>
              <div className='my-3 flex  md:w-[200px]'>

                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, allowUpload: e.target.checked }) }}
                  checked={blogDetails.allowUpload}
                  id='allowUpload'
                  type="checkbox"

                  className="px-3 py-2 my-2 w-[40px] outline-0 bg-white rounded border-3 border-green-400  focus:border-0  "
                />
                <label htmlFor="allowUpload">Premission For Upload</label>

              </div>
              <button type='button' onClick={handileUpdateBLog} className="  flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 md:w-[500px] rounded hover:border-2 hover:border-green-400 hover:bg-black border-2 border-transparent hover:text-green-400">
                Update BLog
              </button>
            </form>
          </div>
        </div>}
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

export default UserBlogList