import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const adminUpdateContext = createContext("")
export const userUpdateContext = createContext("")
function ContextApi({children}) {
   
    const [adminEditresponse,setAdmineditResponse] = useState({})
        const [userEditresponse,setUserEditResponse] = useState({})
  return (
    <>
    
    <adminUpdateContext.Provider value={{adminEditresponse,setAdmineditResponse}} >
        <userUpdateContext.Provider value={{userEditresponse,setUserEditResponse}}>{children}</userUpdateContext.Provider>
        </adminUpdateContext.Provider></>
   
  )
}

export default ContextApi