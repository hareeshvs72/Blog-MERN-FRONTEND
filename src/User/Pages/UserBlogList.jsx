import React, { useEffect, useState } from 'react'
import UserSidebar from '../Components/UserSidebar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { faComments, faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import { faBook, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { toast, ToastContainer } from 'react-toastify'
import { getIndividualUserBlogAPi, getSingleBlogViewAPI, removeIndividualBlogsAPI, updateBlogApi } from '../../service/allAPI'
import { Link, useNavigate } from 'react-router-dom'
import BASEURL from '../../service/serverURL'

function UserBlogList() {

  const [blogs, setBlogs] = useState([])
  const [deleteBlog, setDeleteBlog] = useState({})
  const navigate = useNavigate()
  const [thumPreview, setThumbPreview] = useState("")
  const [editModale, setEditModale] = useState(false)
  const [dotModale, setDotModale] = useState(null)

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

  useEffect(() => {
    getAllBlogs()
  }, [deleteBlog])

  const categoryCount = blogs.map(item => item.category).length

  const getAllBlogs = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` }
      try {
        const result = await getIndividualUserBlogAPi(reqHeader)
        if (result.status == 200) setBlogs(result.data)
      } catch (error) { console.log(error) }
    }
  }

  const deleteBlogs = async (blogId) => {
    try {
      const result = await removeIndividualBlogsAPI(blogId)
      if (result.status == 200) {
        toast.success("Delete The Blog SuccessFully !!!")
        setDeleteBlog(result.data)
      }
    } catch (error) { console.log(error) }
  }

  const getBlogId = async (blogId) => {
    displayBlogView(blogId)
    setBlogId(blogId)
    setEditModale(true)
  }

  const handileThumbnail = (e) => {
    setBlogDetails({ ...blogDetails, thumbnail: e.target.files[0] })
    const url = URL.createObjectURL(e.target.files[0])
    setThumbPreview(url)
  }

  const handileUpdateBLog = async () => {
    const token = sessionStorage.getItem("token")
      const { title, subTitle, description, category, thumbnail, allowUpload } = blogDetails
    
        if (!title || !subTitle || !description || !category || thumbnail.length == 0 || allowUpload === false) {
          toast.warning("Please Fill The Form Completedly")
          return
        }else{
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` }
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
          setTimeout(() => { setEditModale(false) }, 500)
        }
      } catch (error) { console.log(error) }
    }
  }
  }

  const displayBlogView = async (blogId) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = { "Authorization": `Bearer ${token}` }
      try {
        const result = await getSingleBlogViewAPI(blogId, reqHeader)
        if (result.status == 200) {
          setBlogDetails(result.data)
          setThumbPreview(result.data.thumbnail)
        }
      } catch (error) { console.log(error) }
    }
  }

  return (
    <>
      <div className="md:grid grid-cols-5 bg-green-50 min-h-screen">
        
        {/* SIDEBAR */}
        <div className="col-span-1 relative z-10 shadow-md bg-white">
          <UserSidebar />
        </div>

        {/* MAIN */}
        <div className="col-span-4 p-6">

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">

            {/* Total Blogs */}
            <div className="flex items-center p-5 shadow bg-white rounded-2xl hover:shadow-xl transition-all">
              <div className="p-3 bg-green-400 rounded-2xl mr-3">
                <FontAwesomeIcon icon={faSquarePlus} className="text-2xl text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{blogs?.length}</h1>
                <p className="font-semibold">Total Blogs</p>
              </div>
            </div>

            {/* Approved */}
            <div className="flex items-center p-5 shadow bg-white rounded-2xl hover:shadow-xl transition-all">
              <div className="p-3 bg-green-400 rounded-2xl mr-3">
                <FontAwesomeIcon icon={faComments} className="text-2xl text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{blogs?.filter(item => item.status == "Aproved").length}</h1>
                <p className="font-semibold">Approved</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center p-5 shadow bg-white rounded-2xl hover:shadow-xl transition-all">
              <div className="p-3 bg-green-400 rounded-2xl mr-3">
                <FontAwesomeIcon icon={faBook} className="text-2xl text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{categoryCount}</h1>
                <p className="font-semibold">Categories</p>
              </div>
            </div>
          </div>

          {/* BLOG TABLE */}
          <h1 className="text-2xl font-bold text-green-600 mb-3">My Blogs</h1>

          <div className="">
            <table className="w-full bg-black text-green-400 rounded-xl shadow-lg">
              <thead>
                <tr>
                  <th className="p-4 text-left text-xl font-semibold">Title</th>
                  <th className="p-4 text-left text-xl font-semibold">Date</th>
                  <th className="p-4 text-left text-xl font-semibold">Status</th>
                  <th className="p-4 text-left text-xl font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs?.length > 0 ?
                  blogs.map(item => (
                    <tr key={item?._id} className="border-t border-green-900 hover:bg-green-900/20">
                      <td className="p-4 flex items-center">
                        <img
                          src={`${BASEURL}/uploads/${item?.thumbnail}`}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <Link to={`/${item?._id}/view`} className="ml-3 underline">
                          {item?.title}
                        </Link>
                      </td>

                      <td className="p-4">
                        {new Date(item?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric"
                        })}
                      </td>

                      <td className={`p-4 font-semibold ${item?.status == "Aproved" ? "text-green-500" : "text-red-500"}`}>
                        {item?.status}
                      </td>

                      <td className="p-4 relative">
                        <button
                          className="bg-white px-3 py-2 rounded-xl shadow hover:bg-green-300 transition"
                          onClick={() => setDotModale(dotModale === item?._id ? null : item?._id)}
                        >
                          <img src="/3dot.png" width="20" />
                        </button>

                        {dotModale === item?._id && (
                          <div className="absolute bg-white shadow-lg border rounded-lg p-2 mt-2 right-0 z-20 flex space-x-2">
                            <button onClick={() => getBlogId(item?._id)} className="bg-black text-green-400 px-3 py-1 rounded">
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button onClick={() => deleteBlogs(item?._id)} className="bg-black text-green-400 px-3 py-1 rounded">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )) :

                  <tr>
                    <td colSpan="4" className="text-center text-white p-5">No Blogs Found</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------------- EDIT MODAL ---------------- */}
        {editModale &&
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-20 p-4">

            <button className="absolute top-5 right-5 bg-green-500 text-black p-2 rounded-xl" onClick={() => setEditModale(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="bg-black text-green-400 p-6 rounded-xl w-full max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">

              <form>

                {/* Thumbnail */}
                <div className="flex flex-col items-center mb-5">
                  <input type="file" id="thum" className="hidden" onChange={handileThumbnail} />

                  <label htmlFor="thum" className="bg-green-400 text-black px-6 py-4 rounded-xl cursor-pointer mb-3">
                    <FontAwesomeIcon icon={faCloudArrowUp} className="text-4xl" />
                    <p>Upload Thumbnail</p>
                  </label>

                  <div className="w-40 h-24 border rounded overflow-hidden">
                    <img
                      src={thumPreview.startsWith("blob:") ? thumPreview : `${BASEURL}/uploads/${thumPreview}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="font-semibold">Blog Title</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white text-black rounded border-2 border-green-600 mt-1"
                    value={blogDetails.title}
                    onChange={e => setBlogDetails({ ...blogDetails, title: e.target.value })}
                  />
                </div>

                {/* Sub Title */}
                <div className="mb-4">
                  <label className="font-semibold">Sub Title</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white text-black rounded border-2 border-green-600 mt-1"
                    value={blogDetails.subTitle}
                    onChange={e => setBlogDetails({ ...blogDetails, subTitle: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="font-semibold">Description</label>
                  <textarea
                    className="w-full p-2 bg-white text-black rounded border-2 border-green-600 mt-1 h-24"
                    value={blogDetails.description}
                    onChange={e => setBlogDetails({ ...blogDetails, description: e.target.value })}
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="font-semibold">Category</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white text-black rounded border-2 border-green-600 mt-1"
                    value={blogDetails.category}
                    onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })}
                  />
                </div>

                {/* Upload Permission */}
                <div className="flex items-center mb-5">
                  <input
                    type="checkbox"
                    checked={blogDetails.allowUpload}
                    onChange={e => setBlogDetails({ ...blogDetails, allowUpload: e.target.checked })}
                    className="w-5 h-5 mr-3"
                  />
                  <label>Permission For Upload</label>
                </div>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handileUpdateBLog}
                  className="w-full bg-green-500 text-black font-bold py-2 rounded-xl hover:bg-black hover:text-green-400 border-2 border-transparent hover:border-green-400 transition"
                >
                  Update Blog
                </button>

              </form>
            </div>
          </div>
        }

      </div>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </>
  )
}

export default UserBlogList
