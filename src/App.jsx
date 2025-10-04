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
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<LogReg register />} />
        <Route path='/login' element={<LogReg />} />
          <Route path='/:id/view' element={<View/>} />

        <Route path='/*' element={<Pnf />} />
      </Routes>

    </>
  )
}

export default App
