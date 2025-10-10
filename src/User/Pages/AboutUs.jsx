import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { easeIn, motion } from 'framer-motion'

function AboutUs() {
  return (
    <>
      <Header />
      <>

        <div className='md:px-20 md:py-10 p-5 bg-green-100'>
          <div className='flex items-center w-full flex-col'>
            <motion.h1 
             initial={{opacity:0, y:-30}}
             whileInView={{opacity:1,y:0}}
             transition={{duration:.5, ease:easeIn}}
            className='text-3xl font-bold  my-3'>
             About Us
            </motion.h1>

            <motion.p 
              initial={{opacity:0, x:-30}}
             whileInView={{opacity:1,x:0}}
             transition={{duration:.5, ease:easeIn}}
            
            className='font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempora quibusdam culpa adipisci incidunt et numquam blanditiis corrupti eaque sed nulla consectetur facilis neque voluptate magni reprehenderit, quo aliquid molestias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium libero porro earum quia, fuga perspiciatis laboriosam eius. Neque accusantium exercitationem atque enim excepturi error? Harum quod id delectus necessitatibus.</motion.p>

          </div>

          <div className="md:grid grid-cols-2 gap-20 my-7 md:px-30 md:py-10">
             {/* image */}
             <motion.div
               initial={{opacity:0, y:-30}}
             whileInView={{opacity:1,y:0}}
             transition={{duration:.5, ease:easeIn}}
             className='min-h-[500px] '>
               <img src="/aboutimg.jpg" alt="about Image" className='w-full h-full rounded-2xl object-cover' />
               </motion.div>

            {/* content */}
            <motion.div 
              initial={{opacity:0, x:30}}
             whileInView={{opacity:1,x:0}}
             transition={{duration:.5, ease:easeIn}}
             className="flex flex-col justify-center">
              <p className='font-semibold text-justify my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam molestias dicta non? Dolorem, vitae cupiditate aliquid autem officiis a itaque, consequuntur quibusdam voluptatum, quaerat ipsa optio eum id porro necessitatibus.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque aliquid, molestias eius suscipit aspernatur numquam porro ab nesciunt ad deleniti quasi voluptates repellat fugiat tempora doloribus soluta architecto quis. </p>
                <p className='font-semibold text-justify my-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam molestias dicta non? Dolorem, vitae cupiditate aliquid autem officiis a itaque, consequuntur quibusdam voluptatum, quaerat ipsa optio eum id porro necessitatibus.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque aliquid, molestias eius suscipit aspernatur numquam porro ab nesciunt ad deleniti quasi voluptates repellat fugiat tempora doloribus soluta architecto quis. </p>

              <div>
                <button className='px-4 py-2 bg-black rounded-2xl text-green-400 border-2 border-transparent hover:border-2 hover:border-black hover:bg-green-400 hover:text-black font-bold'><Link to={'/contact'}>Contact Info</Link></button>
              </div>

            </motion.div>
          </div>


        </div>



      </>
      <Footer />

    </>
  )
}

export default AboutUs