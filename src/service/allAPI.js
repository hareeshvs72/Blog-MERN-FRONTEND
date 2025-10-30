// guest 

import CommonAPi from "./commonApi"
import BASEURL from "./serverURL"


//  --------------------- users --------------------
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

// update user profile callled by Profile edit component

  export const userProfileEditAPI = async(reqBody,reqHeader)=>{
  return await  CommonAPi("PUT",`${BASEURL}/user-update`,reqBody,reqHeader)
} 

// ----------------------- Blogs ------------------------------------

// create blogs

export const createBlogApi = async(reqBody,reqHeader)=>{
  return await  CommonAPi("POST",`${BASEURL}/create`,reqBody,reqHeader)
}

// display blogs in blog component 

export const displayBlogApi = async(searchValue,reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/blog?search=${searchValue}`,{},reqHeader)
}


// display latest blogs in home page 

export const displayLatestBlogInHomeApi = async()=>{
  return await  CommonAPi("GET",`${BASEURL}/home`)
}

// view a single blog 

export const getSingleBlogViewAPI = async(blogId, reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/view/${blogId}/blog`,{},reqHeader)
}


// ----------------------- commnets  -----------------------


// create new comments --- called by view componnet wen click on post button

export const createNewCommentAPI = async(blogId,reqBody,reqHeader)=>{
  return await  CommonAPi("POST",`${BASEURL}/create-comment/${blogId}`,reqBody,reqHeader)
}

// display all the comments
export const getAllCommnetsAPI = async (blogId,reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/all-comment/${blogId}`,{},reqHeader)
}

