import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComments, faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

function Dashbord() {
  return (
         <>
    <AdminHeader/>

  
      <div className="md:grid grid-cols-5 ">
        <div className="col-span-1">
          <AdminSidebar/>
        </div>
        <div className="col-span-4 bg-green-100 min-h-screen ">
        <div className="md:grid grid-cols-4 md:mx-20 gap-2 md:mt-10">
              {/* Blogs */}
          <div className="flex p-3 items-center shadow my-2">
            <div className="p-3 bg-green-400 rounded-2xl mx-3">
              <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">2</h1>
              <h3 className="text-center font-bold text-2xl">Blogs</h3>
            </div>
          </div>
  
          {/* Comments */}
          <div className="flex p-3 items-center shadow my-2">
            <div className="p-3 bg-green-400 rounded-2xl mx-3">
              <FontAwesomeIcon icon={faComments} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">2</h1>
              <h3 className="text-center font-bold text-2xl">Comments</h3>
            </div>
          </div>
  
          {/* Draft */}
          <div className="flex p-3 items-center shadow my-2">
            <div className="p-3 bg-green-400 rounded-2xl mx-3">
              <FontAwesomeIcon icon={faBook} className="text-2xl" />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl">2</h1>
              <h3 className="text-center font-bold text-2xl">Draft</h3>
            </div>
          </div>
        </div>
        <div className="col-span-4">
                    <div className="md:mx-20">
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
      </div>
    </>
   
  
    
    
  
  )
}

export default Dashbord
