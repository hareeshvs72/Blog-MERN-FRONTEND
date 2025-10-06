import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Blog() {
  return (
    <>
      <Header />
      <>

        <div className='md:px-20 md:py-10 p-5 bg-green-100'>
         <div className='flex items-center w-full flex-col'>
            <h1 className='text-3xl font-bold  my-3'>
              All Blogs
            </h1>
           
            <div className="relative w-[350px]">
              <input
                type="text"
                placeholder="Search Blogs"
                className="h-12 w-full border-2 px-4 pr-12 
                     bg-black/70 text-white outline-none 
                     border-green-500 rounded-full"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-white cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
              />
            </div>
         </div>
          <div className='my-4 flex flex-wrap  justify-start w-full'>
              <button className='foont-bold bg-black text-green-400 px-4 rounded py-1 m-1'> All</button>
               <button className='foont-bold bg-black text-green-400 px-4 rounded py-1 m-1'> Sports</button>
                <button className='foont-bold bg-black text-green-400 px-4 rounded py-1 m-1'> Life Style</button>
              
            </div>
              <div className="md:grid grid-cols-4  gap-10 md:my-0 my-3">
        {/* card dupliacte */}
        <div className='p-2 rounded shadow hover:shadow-2xl   md:my-0 my-3'>
          <div style={{height:'200px'}}>
            <img src="/thumb.png" alt="Thubnail" className='bg-cover'  />
          </div>
          <div>
           <div>
              <h1 className='text-2xl font-bold my-2'>Title</h1>
              <p className='font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum aliquid quaerat labore quod illo tempore nobis aperiam culpa sequi voluptatum veniam reiciendis, velit tempora rerum vel alias quidem! Nam, odit.</p>
              <Link to={'/:id/view'} className='text-green-900 font-bold underline cursour-pointer inline-block my-3' >Read More</Link>
           </div>
            <button className='px-4 bg-black text-green-400 font-bold py-2 hover:bg-green-400 hover:text-black'>Sports</button>
          </div>
        </div>

        <div className='p-2 rounded shadow  hover:shadow-2xl  md:my-0 my-3'>
          <div style={{height:'200px'}}>
            <img src="https://tse4.mm.bing.net/th/id/OIP.IE1imfd_0Zi8rwbvjyrH1wHaE8?pid=Api&P=0&h=180" alt="Thubnail" className='bg-cover w-full h-full'  />
          </div>
          <div>
           <div>
              <h1 className='text-2xl font-bold my-2'>Title</h1>
              <p className='font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum aliquid quaerat labore quod illo tempore nobis aperiam culpa sequi voluptatum veniam reiciendis, velit tempora rerum vel alias quidem! Nam, odit.</p>
              <Link to={'/:id/view'} className='text-green-900 font-bold underline cursour-pointer inline-block my-3' >Read More</Link>
           </div>
            <button className='px-4 bg-black text-green-400 font-bold py-2 hover:bg-green-400 hover:text-black'>Sports</button>
          </div>
        </div>
        
      </div>
        </div>
       


      </>
      <Footer />

    </>
  )
}

export default Blog