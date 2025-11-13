import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { createBlogApi } from '../../service/allAPI'
import { useNavigate } from 'react-router-dom'
import UserSidebar from '../../User/Components/UserSidebar'

function Create() {

  const [blogDetails, setBlogDetails] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    thumbnail: [],
    allowUpload: false,
    username: ""
  })
  const [token, setToken] = useState("")
  const [thumPreview, setThumbPreview] = useState("")
  const navigate = useNavigate("")

  // use useEffect Hook For geting Token when this page will load
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      const users = JSON.parse(sessionStorage.getItem("users"))
      setBlogDetails({ ...blogDetails, username: users.username })
    }
  }, [])

  // reset
  const handileReset = () => {
    setBlogDetails({
      title: "",
      subTitle: "",
      description: "",
      category: "",
      thumbnail: [],
      allowUpload: false,
      username: ""
    })
    setThumbPreview("")
  }

  // handile uplaod thumbnail
  const handileThumbnail = (e) => {
    const fileArray = blogDetails.thumbnail
    fileArray.push(e.target.files[0])

    setBlogDetails({ ...blogDetails, thumbnail: fileArray })
    const url = URL.createObjectURL(e.target.files[0])
    setThumbPreview(url)
  }

  // upload blogs
  const handileUploadBlog = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const { title, subTitle, description, category, thumbnail, allowUpload, username } = blogDetails

    if (!title || !subTitle || !description || !category || thumbnail.length == 0 || allowUpload === false) {
      toast.warning("Please Fill The Form Completedly")
      return
    } else {

      const reqBody = new FormData()
      for (let key in blogDetails) {
        if (key !== "thumbnail") {
          reqBody.append(key, blogDetails[key])
        }
        else {
          blogDetails.thumbnail.forEach(img => {
            reqBody.append("thumbnail", img)
          })
        }
      }

      try {
        const result = await createBlogApi(reqBody, reqHeader)
        if (result.status == 201) {
          toast.success("Blog Created SucessFully")
          setTimeout(() => {
            navigate("/blog")
            handileReset()
          }, 2500)
        }
        else if (result.status == 401) {
          toast.info(result.response.data)
        }
        else {
          console.log(result);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="md:grid grid-cols-5">
        <div className="col-span-1 relative z-10 shadow-md">
          <UserSidebar />
        </div>

        <div className="col-span-4 bg-green-50 min-h-screen py-10 px-5 md:px-20">

          <div className="bg-white p-6 md:px-10 rounded-2xl shadow-xl max-w-3xl mx-auto">

            <form>
              {/* upload thumbnail */}
              <div className="flex flex-col items-center justify-center mb-8">
                <input onChange={e => handileThumbnail(e)} type="file" className="hidden" id="thubnail" />

                <h3 className="font-bold text-xl mb-4">Upload Thumbnail</h3>

                <div className="flex flex-col md:flex-row items-center gap-6">

                  <label
                    htmlFor="thubnail"
                    className="border-2 border-green-400 bg-green-100 px-10 py-6 rounded-xl cursor-pointer hover:bg-green-300 transition-all text-center"
                  >
                    <FontAwesomeIcon icon={faCloudArrowUp} className="text-5xl mb-2" />
                    <p className="font-semibold">Upload</p>
                  </label>

                  <div className="h-28 w-32 border rounded-xl overflow-hidden bg-gray-200">
                    {thumPreview !== "" &&
                      <img src={thumPreview} alt="thumbnail preview" className="w-full h-full object-cover" />
                    }
                  </div>

                </div>
              </div>

              {/* title */}
              <div className="my-3">
                <label htmlFor="title" className="font-semibold">Blog Title</label>
                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, title: e.target.value }) }}
                  value={blogDetails.title}
                  id="title"
                  type="text"
                  placeholder="Enter blog title"
                  className="px-3 py-3 mt-2 w-full bg-white rounded border-2 border-green-400 focus:outline-green-700"
                />
              </div>

              {/* subtitle */}
              <div className="my-3">
                <label htmlFor="subtitle" className="font-semibold">Sub Title</label>
                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, subTitle: e.target.value }) }}
                  value={blogDetails.subTitle}
                  id="subtitle"
                  type="text"
                  placeholder="Enter sub title"
                  className="px-3 py-3 mt-2 w-full bg-white rounded border-2 border-green-400 focus:outline-green-700"
                />
              </div>

              {/* description */}
              <div className="my-3">
                <label htmlFor="BlogDescription" className="font-semibold">Blog Description</label>
                <textarea
                  onChange={(e) => { setBlogDetails({ ...blogDetails, description: e.target.value }) }}
                  value={blogDetails.description}
                  id="BlogDescription"
                  placeholder="Write your blog content..."
                  className="mt-2 w-full h-32 px-3 py-2 bg-white rounded border-2 border-green-400 focus:outline-green-700"
                ></textarea>
              </div>

              {/* category */}
              <div className="my-3">
                <label htmlFor="category" className="font-semibold">Blog Category</label>
                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, category: e.target.value }) }}
                  value={blogDetails.category}
                  id="category"
                  type="text"
                  placeholder="Enter category"
                  className="px-3 py-3 mt-2 w-full bg-white rounded border-2 border-green-400 focus:outline-green-700"
                />
              </div>

              {/* allow upload */}
              <div className="flex items-center gap-3 my-5">
                <input
                  onChange={(e) => { setBlogDetails({ ...blogDetails, allowUpload: e.target.checked }) }}
                  checked={blogDetails.allowUpload}
                  id="allowUpload"
                  type="checkbox"
                  className="w-5 h-5 text-green-600"
                />
                <label htmlFor="allowUpload" className="font-semibold">Permission For Upload</label>
              </div>

              {/* upload button */}
              <button
                type="button"
                onClick={handileUploadBlog}
                className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-black hover:text-green-400 border-2 border-transparent hover:border-green-400 transition-all"
              >
                Upload Blog
              </button>
            </form>

          </div>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </>
  )
}

export default Create
