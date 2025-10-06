import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'

function Dashbord() {
  return (
    <>
    <AdminHeader/>

    <>
      <div className="md:grid grid-cols-5">
        <div className="col-span-1">
          <AdminSidebar/>
        </div>
        <div className="col-span-4">
          bnm,
        </div>
      </div>
    </>
   
    
    
    </>
  )
}

export default Dashbord