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

// update admin profile

export const updateAdminProfile = async (reqBody, reqHeader) => {
  return await CommonAPi("PUT", `${BASEURL}/admin-profile-edit`, reqBody, reqHeader);
};


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

// update blog for individual users  - called by blogListComponent

export const updateBlogApi = async(blogId,reqBody, reqHeader)=>{
  return await  CommonAPi("PUT",`${BASEURL}/update-blog/${blogId}`,reqBody,reqHeader)
}


// get individual user blogs - called by user blog list component 


export const getIndividualUserBlogAPi = async(reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/individual/user`,{},reqHeader)
}

// delete individual blog by id  - called by user blog list component 

export const removeIndividualBlogsAPI = async(blogId)=>{
  return await  CommonAPi("DELETE",`${BASEURL}/delete-blogs/${blogId}`)
}

// like the blog - called by view componnet
export const likeBlogApi = async(blogId,reqHeader)=>{
  return await  CommonAPi("PUT",`${BASEURL}/blog/${blogId}/like`,{},reqHeader)
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

// update commnet called by view page

export const updateCommentApi = async (reqBody,reqHeader)=>{
  return await  CommonAPi("PUT",`${BASEURL}/update/comment`,reqBody,reqHeader)
}

// delete commnet called by view page

export const removeCommentAPi = async (blogId,reqHeader)=>{
  return await  CommonAPi("DELETE",`${BASEURL}/delete/${blogId}/comment`,{},reqHeader)
}


// ---------------------- admin -----------------------------------


// get all blogs  by admin   - called by dashbord component

export const getAllBlogsAdminAPI = async (reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/get-allblog-admin`,{},reqHeader)
}

// get all user by admin - called by user list

export const getAllUserAdminApi = async (reqHeader)=>{
  return await  CommonAPi("GET",`${BASEURL}/alluser-admin`,{},reqHeader)
}


// update blog status

export const updateBlogStatusAPI = async(reqBody,reqHeader)=>{
  return await  CommonAPi("PUT",`${BASEURL}/update-status`,reqBody,reqHeader)
}
