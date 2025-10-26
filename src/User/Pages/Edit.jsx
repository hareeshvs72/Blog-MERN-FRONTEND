import React from 'react'
import UserSidebar from '../Components/UserSidebar'

function Edit() {
  return (
    <>
          <div className="md:grid grid-cols-5">
            <div className="col-span-1 relative z-10">

              <UserSidebar/>
            </div>
            <div className="col-span-4 bg-green-100 min-h-screen">
                edit
            </div>
          </div>
        </>
  )
}

export default Edit