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
import AdminSidebar from './Admin/components/AdminSidebar'
import Bloglist from './Admin/pages/Bloglist'
import Create from './Admin/pages/Create'
import Layout from './Admin/components/Layout'
import Preload from './Auth/Preload'

function App() {
 const [preload , setPreload]= useState(true)
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

        <Route path='/*' element={<Pnf />} />


        
          <Route path='/admin-dashbord' element={<Dashbord />} />

          
          <Route path='/admin-bloglist' element={<Bloglist />} />
          <Route path='/admin-create' element={<Create />} />
       

      </Routes>

    </>
  )
}

export default App
