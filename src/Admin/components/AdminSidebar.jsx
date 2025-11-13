import { faComment, faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBars, faCirclePlus, faListCheck, faUserShield, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import BASEURL from '../../service/serverURL'
import { adminUpdateContext } from '../../context/ResponseContextApi'

function AdminSidebar() {
  const { adminEditresponse } = useContext(adminUpdateContext)
  const [navbarStyle, setNavbarStyle] = useState(false)
  const [adminDp, setAdminDp] = useState("")
  const [adminName, setAdminName] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('users')) {
      const user = JSON.parse(sessionStorage.getItem('users'))
      setAdminDp(user.profile)
      setAdminName(user.username)
    }
  }, [adminEditresponse])

  const active =
    "font-bold bg-green-400 text-black w-full text-center p-3 rounded-xl shadow-md transition-all"
  const notActive =
    "p-3 text-center font-semibold text-green-300 hover:bg-green-300 hover:text-black w-full rounded-xl transition-all"

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden block bg-green-400 p-3 text-2xl shadow-md">
        <button onClick={() => setNavbarStyle(!navbarStyle)}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center flex-col my-3 transition-all">
        <img
          className="border-4 border-green-400 shadow-xl"
          src={
            adminDp == ""
              ? "https://tse1.mm.bing.net/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?pid=Api&P=0&h=180"
              : `${BASEURL}/uploads/${adminDp}`
          }
          alt="admin dp"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <p className="my-2 font-bold text-green-700">{adminName}</p>
      </div>

      {/* Sidebar Navigation */}
      <div className={`${navbarStyle && "md:block hidden"}`}>
        <div className="w-full flex flex-col items-center px-3 py-3 space-y-2">

          <NavLink to={"/admin-dashbord"} className={({ isActive }) => (isActive ? active : notActive)}>
            <FontAwesomeIcon icon={faHouse} className="mx-2" /> Dashboard
          </NavLink>

           <NavLink to={"/admin-blogmanager"} className={({ isActive }) => (isActive ? active : notActive)}>
            <FontAwesomeIcon icon={faChartBar} className="mx-2" /> Blog Manager
          </NavLink>

          <NavLink to={"/admin-userlist"} className={({ isActive }) => (isActive ? active : notActive)}>
            <FontAwesomeIcon icon={faListCheck} className="mx-2" /> User List
          </NavLink>

          <NavLink to={"/admin-settings"} className={({ isActive }) => (isActive ? active : notActive)}>
            <FontAwesomeIcon icon={faUserShield} className="mx-2" /> Admin Settings
          </NavLink>

         

        </div>
      </div>
    </>
  )
}

export default AdminSidebar
