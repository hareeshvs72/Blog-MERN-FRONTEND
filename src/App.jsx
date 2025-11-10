import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './User/Pages/Landing'
import Blog from './User/Pages/Blog'
import AboutUs from './User/Pages/AboutUs'
import Contact from './User/Pages/Contact'
import LogReg from './Auth/LogReg'
import Pnf from './Auth/Pnf'
import View from './User/Pages/View'
import Dashbord from './Admin/pages/Dashbord'

import Create from './Admin/pages/Create'
import Layout from './Admin/components/Layout'
import Preload from './Auth/Preload'
import Profile from './User/Pages/Profile'
import UserBlogList from './User/Pages/UserBlogList'
import ProfileCard from './User/Pages/ProfileCard'
import ProfileEdit from './User/Pages/ProfileEdit'
import UserList from './Admin/pages/UserList'



function App() {
 const [preload , setPreload]= useState(false)
 setTimeout(() => {
       setPreload(false)
 }, 6000);
  return (
    <>
      <Routes>
        <Route path='/' element={preload ? <Preload/> : <Landing />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<LogReg register />} />
        <Route path='/login' element={<LogReg />} />
        <Route path='/:id/view' element={<View />} />
       <Route path='/profile' element={<Profile />} />
        <Route path='/profile-edit' element={<ProfileEdit />} />
             <Route path='/user-blog' element={<UserBlogList/>} />
              <Route path='/profilecard' element={<ProfileCard/>} />
        
        <Route path='/*' element={<Pnf />} />


        
          <Route path='/admin-dashbord' element={<Dashbord />} />

          
          <Route path='/admin-userlist' element={<UserList />} />
          <Route path='/create' element={<Create />} />
       

      </Routes>
 
    </>
  )
}

export default App
