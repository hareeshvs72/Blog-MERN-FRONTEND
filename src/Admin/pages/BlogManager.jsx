import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { getAllBlogsAdminAPI, updateBlogStatusAPI } from "../../service/allAPI"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import BASEURL from "../../service/serverURL"
import { toast, ToastContainer } from 'react-toastify'

function BlogManager() {
  const [blogs, setBlogs] = useState([])
  const [statusupdate, setStatusUpdate] = useState(false)

  useEffect(() => {
    handileAllBlogs()
    setStatusUpdate(false)
  }, [statusupdate])

  // display blogs
  const handileAllBlogs = async () => {
    const token = sessionStorage.getItem("token")

    if (token) {
      try {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const result = await getAllBlogsAdminAPI(reqHeader)
        setBlogs(result.data)
      } catch (error) { }
    }
  }

  // approve blog status
  const handileUpdateBlogStatus = async (blog) => {
    const token = sessionStorage.getItem("token")

    if (token) {
      try {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const result = await updateBlogStatusAPI(blog, reqHeader)
        if (result.status === 200) {
          toast.success("Blog approved successfully!")
          setStatusUpdate(true)
        } else {
          toast.warning("Something went wrong!")
        }
      } catch (error) { }
    }
  }

  return (
    <>
      <AdminHeader />

      <div className="md:grid grid-cols-5">
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-4 bg-green-100 py-8 min-h-screen px-5">

          {/* STAT CARDS */}
          <div className="grid md:grid-cols-3 gap-8 mx-3 mb-10">

            {/* Total Blogs */}
            <div className="flex p-5 bg-white rounded-xl shadow hover:shadow-xl transition">
              <div className="p-4 bg-green-400 rounded-xl mr-4">
                <FontAwesomeIcon icon={faSquarePlus} className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{blogs.length}</h1>
                <p className="font-semibold">Total Blogs</p>
              </div>
            </div>

            {/* Approved */}
            <div className="flex p-5 bg-white rounded-xl shadow hover:shadow-xl transition">
              <div className="p-4 bg-green-400 rounded-xl mr-4">
                <FontAwesomeIcon icon={faComments} className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{blogs.filter(item => item?.status === "Aproved").length}</h1>
                <p className="font-semibold">Approved</p>
              </div>
            </div>

            {/* Pending */}
            <div className="flex p-5 bg-white rounded-xl shadow hover:shadow-xl transition">
              <div className="p-4 bg-green-400 rounded-xl mr-4">
                <FontAwesomeIcon icon={faBook} className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{blogs.filter(item => item?.status === "pending").length}</h1>
                <p className="font-semibold">Pending</p>
              </div>
            </div>

          </div>

          {/* ALL BLOGS SECTION */}
          <h1 className="text-green-500 text-center text-4xl font-extrabold mb-8">
            All Blogs
          </h1>

          <div className="grid md:grid-cols-3 gap-10 px-3">

            {blogs.length > 0 ? (
              blogs.map((items, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition flex flex-col justify-between">

                  {/* IMAGE */}
                  <div className="h-52 mb-3">
                    <img
                      src={`${BASEURL}/uploads/${items?.thumbnail}`}
                      className="w-full h-full object-cover rounded-lg"
                      alt="thumbnail"
                    />
                  </div>

                  {/* DETAILS */}
                  <div>
                    <h2 className="text-xl font-bold text-green-700 mb-1">{items?.title}</h2>
                    <h3 className="text-sm text-blue-500 font-semibold">{items?.subTitle}</h3>

                    <p className="text-gray-700 my-2">
                      {items?.description.length > 120 ? items?.description.slice(0, 120) + "..." : items?.description}
                    </p>

                    <span className="inline-block bg-black text-green-400 px-4 py-1 rounded-lg font-bold mt-2">
                      {items?.category}
                    </span>
                  </div>

                  {/* APPROVE BUTTON */}
                  <div className="mt-4">
                    {items?.status === "Aproved" ? (
                      <div className="flex justify-center my-2">
                        <img src="/aprove.webp" width="90px" alt="approved gif" />
                      </div>
                    ) : (
                      <button
                        onClick={() => handileUpdateBlogStatus(items)}
                        className="w-full py-2 bg-black text-green-400 font-bold rounded-lg hover:bg-green-400 hover:text-black transition"
                      >
                        Approve Blog
                      </button>
                    )}
                  </div>

                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-lg font-semibold text-gray-700">
                No blogs uploaded yet.
              </p>
            )}

          </div>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </>
  )
}

export default BlogManager
