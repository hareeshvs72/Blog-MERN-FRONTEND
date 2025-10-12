import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { easeIn, motion } from 'framer-motion'
easeIn
function Contact() {
  return (
    <>
      <Header />
      <>

        <div className='md:px-20 md:py-10 p-5 bg-green-100'>
          <div className='flex items-center w-full flex-col'>
            <motion.h1 
                 initial={{opacity:0}}
             whileInView={{opacity:1}}
             transition={{duration:.5, ease:easeIn}}
            className='text-3xl font-bold  my-3'>
              Contact Us
            </motion.h1>

            <motion.p
                 initial={{opacity:0, x:-30}}
             whileInView={{opacity:1,x:0}}
             transition={{duration:.5, ease:easeIn}}
            className='font-semibold text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, tempora quibusdam culpa adipisci incidunt et numquam blanditiis corrupti eaque sed nulla consectetur facilis neque voluptate magni reprehenderit, quo aliquid molestias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum praesentium libero porro earum quia, fuga perspiciatis laboriosam eius. Neque accusantium exercitationem atque enim excepturi error? Harum quod id delectus necessitatibus.</motion.p>

          </div>

          <div className="md:grid grid-cols-2 gap-20 my-7 md:px-30 md:py-10">
            {/* form */}
            <motion.div
                initial={{opacity:0, x:-30}}
             animate={{opacity:1,x:0}}
             transition={{duration:.5, ease:easeIn}}
             className="bg-black w-full p-4  rounded  h-full">
              <form action="">
                <h1 className="text-center text-green-400 font-bold my-3">Send Me Message</h1>
                <input
                  type="text"
                  placeholder="Name"
                  className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                />
                <input
                  type="email"
                  placeholder="Email Id"
                  className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                />
                <textarea
                  placeholder="Message"
                  className="my-2 w-full h-32 px-3 py-2 bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                ></textarea>
                <button className="flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 w-full rounded hover:border-2 hover:border-green-400 hover:bg-black border-2 border-transparent hover:text-green-400">
                  Send <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </motion.div>

            {/* social media links */}
            <div className="md:mt-0 my-2 md:h-full h-96 flex items-center justify-center">
              <div  >
                <motion.div 
                   initial={{opacity:0, y:-30}}
             animate={{opacity:1,y:0}}
             transition={{duration:.5, ease:easeIn}}
                className='flex  cursor-pointer my-5'>
                  <FontAwesomeIcon icon={faEnvelope} className='bg-black text-green-400 rounded-full p-3 hover:bg-green-400 hover:text-black hover:border-2 border-black ' style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                  <div className='mx-4'>
                    <h3 className='font-bold'>Email</h3>
                    <p>FeatureTalks@gmail.com</p>
                  </div>

                </motion.div>
                <motion.div 
                     initial={{opacity:0, y:-30}}
             animate={{opacity:1,y:0}}
             transition={{duration:.6, ease:easeIn}}
                className='flex cursor-pointer my-5'>
                  <FontAwesomeIcon icon={faXTwitter} className='bg-black text-green-400 rounded-full p-3 hover:bg-green-400 hover:text-black hover:border-2 border-black ' style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                  <div className='mx-4'>
                    <h3 className='font-bold'>Twitter X</h3>
                    <p>@FeatureTalks</p>
                  </div>

                </motion.div>
                <motion.div 
                     initial={{opacity:0, y:-30}}
             animate={{opacity:1,y:0}}
             transition={{duration:.7, ease:easeIn}}
                className='flex cursor-pointer my-5'>
                  <FontAwesomeIcon icon={faInstagram} className='bg-black text-green-400 rounded-full p-3 hover:bg-green-400 hover:text-black hover:border-2 border-black ' style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                  <div className='mx-4'>
                    <h3 className='font-bold'>InstaGram</h3>
                    <p>@Feature_Talks</p>
                  </div>

                </motion.div>



              </div>

            </div>
          </div>


        </div>



      </>
      <Footer />

    </>
  )
}

export default Contact