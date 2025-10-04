import {  faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
    <div className="bg-green-400  md:px-30 p-10">
      <div className="md:grid grid-cols-3  ">
        <div className='md:px-10'>
           <div className=''>
              <img src="/logo.png" style={{ width: '100px', height: '70px' }} alt="Logo" />
            </div>
           <h1 className='font-bold text-2xl'>"Ideas That Shape Tomarrow !!! "</h1>

        </div>
       <div className='flex items-center justify-center md:my-0 md:py-0  my-3'>
            <Link to={'/'} className='mx-3  md:my-0 my-2 font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >Home</Link>
            <Link to={'/blog'} className='mx-3 md:my-0 my-2 font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >Blog</Link>
            <Link to={'/aboutus'} className='mx-3  md:my-0 my-2 font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >AboutUS</Link>
            <Link to={'/contact'} className='mx-3  md:my-0 my-2  font-bold hover:bg-black hover:p-2 text-center rounded-2xl transition-all hover:text-green-400' >Contact</Link>
          </div>
          
          <div className='flex md:flex-row flex-col'>
            {/* bar */}
             <div className='md:w-0.5 md:mx-3 md:h-full bg-black h-0.5 w-full mb-4 '></div>
                {/* contact info */}
            <div >
               <div className='flex  cursor-pointer'>
                 <FontAwesomeIcon icon={faEnvelope} className='bg-black text-green-400 rounded-full p-3 hover:bg-green-400 hover:text-black hover:border-2 border-black ' style={{width:'20px',height:'20px', borderRadius:'50%'}}/>
                 <div className='mx-4'>
                   <h3 className='font-bold'>Email</h3>
                   <p>FeatureTalks@gmail.com</p>
                 </div>
                 
                 </div>
                  <div className='flex cursor-pointer my-3'>
                 <FontAwesomeIcon icon={faXTwitter} className='bg-black text-green-400 rounded-full p-3 hover:bg-green-400 hover:text-black hover:border-2 border-black ' style={{width:'20px',height:'20px', borderRadius:'50%'}}/>
                 <div className='mx-4'>
                   <h3 className='font-bold'>Twitter X</h3>
                   <p>@FeatureTalks</p>
                 </div>
                 
                 </div>
                
                 <div className='flex items-center  '>
                  <input type="text" placeholder='Enter Email' className=' h-9 px-2 placeholder:text-black focus:bg-black focus:text-green-400 focus:outline-2 focus:outline-green-600 outline-2 outline-black transition-all'  />
                  <button className='bg-black text-green-400 px-2  mx-2 h-9 hover:bg-green-400 hover:text-black hover:border-2 transition-colors ' ><FontAwesomeIcon icon={faArrowRight} /></button>
                 </div>
                 
            </div>

          </div>
      </div>
     
      
    </div>
     <div className='bg-black'>
        <div>
          <p className='text-green-400 text-center p-2'>@Designed By Hareesh Vs</p>
        </div>
      </div>
    
    
    
    </>
  )
}

export default Footer