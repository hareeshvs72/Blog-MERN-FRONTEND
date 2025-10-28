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


// create blogs

export const createBlogApi = async(reqBody,reqHeader)=>{
  return await  CommonAPi("POST",`${BASEURL}/create`,reqBody,reqHeader)
}

// display blogs in blog component 

export const displayBlogApi = async(searchValue,reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/blog?search=${searchValue}`,{},reqHeader)
}


// display latest blogs in home page 

export const displayLatestBlogInHomeApi = async(reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/home`,{},reqHeader)
}
