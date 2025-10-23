// guest 

import CommonAPi from "./commonApi"
import BASEURL from "./serverURL"

// register when click btn in logreg component

export const registerApi = async(reqBody)=>{
   return await CommonAPi("POST",`${BASEURL}/register`, reqBody)
}

// login

// login APi
export const loginApi = async(reqBody)=>{
  return await  CommonAPi("POST",`${BASEURL}/login`,reqBody)
}

// google api

export const googleLoginApi = async(reqBody)=>{
  return await  CommonAPi("POST",`${BASEURL}/google-login`,reqBody)
}