import React, { useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import AdminHeader from "../components/AdminHeader"
import AdminSidebar from "../components/AdminSidebar"
import { getAllUserAdminApi } from "../../service/allAPI"
import BASEURL from "../../service/serverURL"

function UserList() {
    const [allUsers, setAllusers] = useState([])

    useEffect(() => {
        handileAllUser()
    }, [])
    console.log(allUsers);

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
            console.log(error);

        }
    }
    return (
        <>
            <AdminHeader />


            <div className="md:grid grid-cols-5">
                <div className="col-span-1">
                    <AdminSidebar />
                </div>
                <div className="col-span-4 md:px-20   bg-green-100 min-h-screen">
                    <div className="md:mx-10 md:mt-10">
                        <h1 className="text-green-400 my-5 text-4xl font-bold text-center">All Users List</h1>
                        <div className="md:grid grid-cols-3 gap-10">
                            {/* dupliacte */}
                            {allUsers.length > 0 ?
                                allUsers.map((items, index) => (
                                    <div key={index} className="p-3 rounded bg-white shadow flex items-center">
                                        <div className="mx-3">

                                            <img className="w-10 h-10 rounded-full" style={{ borderRadius: '50%' }} src={
                                                items?.profile === ""
                                                    ? "https://d2kf8ptlxcina8.cloudfront.net/YH5TFCE1QY-preview.png"
                                                    : items?.profile.startsWith('https://lh3.googleusercontent.com/')
                                                        ? items?.profile
                                                        : `${BASEURL}/uploads/${items?.profile}`} alt="user logo" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-black">
                                                <span className="text-gray-600">User Mail: </span>
                                                <span className="text-green-500">{items?.email}</span>
                                            </p>
                                            <p className="text-sm font-semibold text-black">
                                                <span className="text-gray-600">User Name: </span>
                                                <span className="text-green-500">{items?.username}</span>
                                            </p>                                        </div>

                                    </div>
                                ))

                                :
                                <div>
                                    <p>no users</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>





    )
}

export default UserList
