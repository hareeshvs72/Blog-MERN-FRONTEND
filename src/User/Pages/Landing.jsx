import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { easeIn, easeOut, motion } from 'framer-motion'
import { displayLatestBlogInHomeApi } from '../../service/allAPI'
import BASEURL from '../../service/serverURL'
import { SearchContext } from '../../../ContextApi/CreateContext'
import { autherisedContext } from '../../context/AutherisedUserContext'


function Landing() {
      // const { authorisedUser, setAuthorisedUser, role } = useContext(autherisedContext)
  
  const [latestBlogs, setLatestBlogs] = useState([])
  const { setSearchKey, searchKey } = useContext(SearchContext)
  const navigate = useNavigate("")
  console.log(latestBlogs);


  useEffect(() => {
 
      displayLatestBlogs()
     
  },[])

  const displayLatestBlogs = async () => {
    console.log("displayLatestBlogs");

   
    try {
      const result = await displayLatestBlogInHomeApi()
      console.log(result);
      if (result.status == 200) {
        setLatestBlogs(result.data)
      }
      else {
        console.log(result);

      }

    } catch (error) {
      console.log(error);

    }
  }

  const handileSearchIcon = () => {
    navigate('/blog')
  }
  return (
    <>
      <Header />
      <>
        {/* hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}

          className="w-full relative h-[400px]">
          {/* Background Image */}
          <img

            src="/hero.jpg"
            alt="hero image"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content on top */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, delay: .3 }}
              className="relative w-[300px]">
              <input
                onKeyDown={(e) => { e.key === "Enter" && handileSearchIcon() }}
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
                type="text"
                placeholder="Search Blogs"
                className="h-12 w-full border-2 px-4 pr-12 
                   bg-black/70 text-white outline-none 
                   border-green-500 rounded-full"
              />
              <button type='button'
                onClick={handileSearchIcon}>
                <FontAwesomeIcon

                  icon={faMagnifyingGlass}
                  className="text-white cursor-pointer absolute top-1/2 right-4 -translate-y-1/2"
                />
              </button>
            </motion.div>
          </div>
        </motion.div>

        <section className='bg-green-100'>
          <div className='md:px-20 md:py-10 p-5 '>
            <h1 className='font-bold text-3xl mb-5'>Recent Blogs</h1>
            <div className="md:grid grid-cols-4  gap-10 md:my-0 my-3">
              {/* card dupliacte */}


              {
                latestBlogs?.length > 0 ?
                  latestBlogs?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: .5 }}


                      className='p-2 rounded shadow hover:shadow-2xl md:h-[500px] h-[480px]  md:my-0 my-3'>
                      <div style={{ height: '200px' }}>
                        <img style={{ width: "100%", height: "100%", borderRadius: '5px' }} src={`${BASEURL}/uploads/${item?.thumbnail}`} alt="Thubnail" className='bg-cover' />
                      </div>
                      <div>
                        <div>
                          <h1 className='text-2xl text-green-800 font-bold my-2'>{item?.title}</h1>
                          <p className='font-semibold text-justify'>{item?.description.slice(0, 55)}</p>
                          <Link to={`/${item?._id}/view`} className='text-green-900 font-bold underline cursour-pointer inline-block my-3' >Read More</Link>
                        </div>
                        <button className='px-4 bg-black text-green-400 font-bold py-2 hover:bg-green-400 hover:text-black'>{item?.category}</button>
                      </div>
                    </motion.div>
                  ))
                  :
                  <div>
                    <p>NO Latest Blog Avilable........</p>
                  </div>
              }



            </div>
            <div className='flex items-center justify-center my-3'>
              <button onClick={()=>navigate('/blog')} className='px-4 bg-black text-green-400 font-bold py-2 hover:bg-green-400 hover:text-black'>Explore More</button>
            </div>

          </div>
        </section>
      </>


      <Footer />


    </>
  )
}

export default Landing