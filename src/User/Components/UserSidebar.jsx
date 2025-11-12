import { faHome } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck, faSquarePen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import BASEURL from '../../service/serverURL'
import { userUpdateContext } from '../../context/ResponseContextApi'

function UserSidebar() {
  const { userEditresponse, setUserEditResponse } = useContext(userUpdateContext)
  const [navbarStyle, setNavbarStyle] = useState(false)
  const [adminDp, setAdminDp] = useState("")
  const [adminName, setAdminName] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('users')) {
      const user = JSON.parse(sessionStorage.getItem('users'))
      setAdminDp(user.profile)
      setAdminName(user.username)
    }
  }, [userEditresponse])

  const active = "font-bold border-r-4 border-green-700 bg-green-400 w-full p-3 rounded-md shadow-md"
  const notActive = "p-3 text-center font-semibold text-gray-700 hover:bg-green-100 w-full rounded-md transition-all duration-300"

  return (
    <>
      {/* <AdminHeader/> */}
      {/* Mobile toggle button */}
      <div className="md:hidden block bg-green-400 p-3 text-2xl shadow-sm">
        <button
          onClick={() => setNavbarStyle(!navbarStyle)}
          className="hover:text-black transition-colors"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center justify-center my-5 text-center">
        <img
          className="border-4 border-green-400 object-cover"
          src={
            adminDp === ""
              ? "https://tse1.mm.bing.net/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?pid=Api&P=0&h=180"
              : `${BASEURL}/uploads/${adminDp}`
          }
          alt="user admin logo"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <p className="my-3 font-bold text-lg text-gray-800">{adminName}</p>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`${
          navbarStyle ? "block" : "hidden"
        } md:block transition-all duration-300`}
      >
        <div className="w-full flex flex-col items-center md:items-stretch px-3 md:py-4 mt-1 space-y-2">
          <NavLink
            to={"/Create"}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="mx-2" /> Create Blog
          </NavLink>

          <NavLink
            to={"/profile-edit"}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            <FontAwesomeIcon icon={faSquarePen} className="mx-2" /> Profile Edit
          </NavLink>

          <NavLink
            to={"/user-blog"}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            <FontAwesomeIcon icon={faListCheck} className="mx-2" /> Blog List
          </NavLink>

          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            <FontAwesomeIcon icon={faHome} className="mx-2" /> Home
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default UserSidebar
