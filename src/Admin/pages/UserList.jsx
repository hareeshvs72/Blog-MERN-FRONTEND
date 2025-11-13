import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { getAllUserAdminApi } from "../../service/allAPI"
import BASEURL from "../../service/serverURL"

function UserList() {
  const [allUsers, setAllusers] = useState([])

  useEffect(() => {
    handileAllUser()
  }, [])

  const handileAllUser = async () => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        const result = await getAllUserAdminApi(reqHeader)
        setAllusers(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <AdminHeader />

      <div className="md:grid grid-cols-5">
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        <div className="col-span-4 bg-green-100 min-h-screen py-10 px-5 md:px-16">

          <h1 className="text-green-500 my-5 text-4xl font-extrabold text-center">
            All Users
          </h1>

          <div className="grid md:grid-cols-3 gap-8">

            {allUsers.length > 0 ? (
              allUsers.map((items, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-2xl transition flex items-center gap-5"
                >
                  {/* PROFILE IMAGE */}
                  <img
                    className="w-16 h-16 rounded-full border-4 border-green-400 object-cover shadow"
                    src={
                      items?.profile === ""
                        ? "https://d2kf8ptlxcina8.cloudfront.net/YH5TFCE1QY-preview.png"
                        : items?.profile.startsWith("https://lh3.googleusercontent.com/")
                        ? items?.profile
                        : `${BASEURL}/uploads/${items?.profile}`
                    }
                    alt="profile"
                  />

                  {/* USER INFO */}
                  <div className="">
                    <p className="text-gray-600 text-sm font-semibold">
                      Email:
                      <span className="ml-1 text-green-600 font-bold">
                        {items?.email}
                      </span>
                    </p>

                    <p className="text-gray-600 text-sm font-semibold">
                      Username:
                      <span className="ml-1 text-green-600 font-bold">
                        {items?.username}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-xl font-semibold text-gray-700">
                No users found.
              </p>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default UserList
