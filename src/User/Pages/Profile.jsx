import React, { useState } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

function Profile() {
     const [listInComplete , setInListComplete] = useState(true)
    const [listComplete , setListComplete] = useState(false)
    const isActive = `bg-green-400 px-3 py-2 border-2 border-black  my-3 font-bold cursor-pointer`
    const notActive = `bg-black px-3 py-2 cursor-pointer border-2 border-green-400 text-green-400  my-3 font-bold`
  return (
   <>
       <Header/>
       <>
       <div className="bg-black" style={{height:'200px'}} >
       
       </div>
        <div className="bg-white p-3 " style={{width:'230px', height:'230px', borderRadius:'50%',marginLeft:'70px',marginTop:'-130px'}}>
          <img style={{width:'200px', height:'200px', borderRadius:'50%'}} src="https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png" alt="profic picture" />
        </div>
        <div className="md:flex px-20 justify-between mt-5">
          <div className="flex justify-center items-center">
            <h1 className="font-bold text-xl ">User Name</h1>
            <FontAwesomeIcon className='text-blue-400 ml-3' icon={faCircleCheck} />
          </div>
          <div>Edit</div>
        </div>

        <div className="md:px-20 px-5 my-5 text-justify">
          
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia fuga officiis cum. Eaque, molestias corporis doloribus quae recusandae harum quos officia dolores quisquam maxime explicabo sunt ratione sit amet! Consequatur saepe, recusandae ullam expedita vero nesciunt nisi qui eveniet odio animi, consequuntur laborum delectus officia perferendis, doloribus neque cumque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium mollitia fuga officiis cum. Eaque, molestias corporis doloribus quae recusandae harum quos officia dolores quisquam maxime explicabo sunt ratione sit amet! Consequatur saepe, recusandae ullam expedita vero nesciunt nisi qui eveniet odio animi, consequuntur laborum delectus officia perferendis, doloribus neque cumque! lorem100
          
        </div>
        <div className='flex justify-center items-center'> 
            <div className='mx-2'>
                <button onClick={()=>{setInListComplete(true);setListComplete(false)}} className={listInComplete ? isActive :notActive}>InComplete</button>
                
            </div>
             <div className='mx-2'>
                <button onClick={()=>{setListComplete(true);setInListComplete(false)}} className={listComplete ? isActive :notActive}>Complete</button>
                
            </div>
        </div>
       {listInComplete && <div className="md:grid grid-cols-4  bg-green-100 md:px-20 md:py-10 gap-10 md:my-0 my-3">
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

        </div>}
        { listComplete &&
             <div className="md:grid grid-cols-4  bg-green-100 md:px-20 md:py-10 gap-10 md:my-0 my-3">
                <div className='p-2 rounded shadow hover:shadow-2xl   md:my-0 my-3'>
          <div style={{height:'200px'}}>
            <img src="https://tse4.mm.bing.net/th/id/OIP.IE1imfd_0Zi8rwbvjyrH1wHaE8?pid=Api&P=0&h=180" alt="Thubnail" className='bg-cover w-full'  />
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
        }
       
        
          
       
       </>
       <Footer/>
    
    
    
    
    </>
  )
}

export default Profile