import React, { createContext, useEffect, useState } from 'react'
export const autherisedContext = createContext("")
function AutherisedUserContext({children}) {
    const [role,setRole] = useState("")
    const [authorisedUser,setAuthorisedUser] = useState(false)
    useEffect(()=>{
           if(sessionStorage.getItem("users") && sessionStorage.getItem("token") ){
            const users = JSON.parse(sessionStorage.getItem("users"))
            setRole(users.role)
            setAuthorisedUser(true)
           }
    },[role,authorisedUser])
  return (
    <>
    <autherisedContext.Provider value={{authorisedUser,setAuthorisedUser,role}}>{children}</autherisedContext.Provider>
    </>
  )
}

export default AutherisedUserContext