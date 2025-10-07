import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"

function Bloglist() {
  return (
      <>
    <AdminHeader  />

  
      <div className="md:grid grid-cols-5">
        <div className="col-span-1">
          <AdminSidebar/>
        </div>
        <div className="col-span-4 md:px-20   bg-green-100 min-h-screen">
            <div className="md:mx-10 md:mt-10">
        <h1 className="text-green-400 text-xl font-bold">All Blogs</h1>
        <table className="my-3 shadow w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-bold text-xl">#</th>
              <th className="px-4 py-2 text-left font-bold text-xl">Blog Title</th>
              <th className="px-4 py-2 text-left font-bold text-xl">Date</th>
              <th className="px-4 py-2 text-left font-bold text-xl">Status</th>
              <th className="px-4 py-2 text-left font-bold text-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-bold text-lg">1</td>
              <td className="px-4 py-2">My First Blog</td>
              <td className="px-4 py-2">2025-10-07</td>
              <td className="px-4 py-2 text-green-600 font-semibold">Published</td>
              <td className="px-4 py-2">
                <button className="bg-black text-green-400 px-3 py-1 rounded">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="bg-black text-green-400 px-3 py-1 ml-2 rounded">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </>
   
    
    
   
   
  )
}

export default Bloglist
