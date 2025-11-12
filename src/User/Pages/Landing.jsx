import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { easeInOut, motion } from 'framer-motion'
import { displayLatestBlogInHomeApi } from '../../service/allAPI'
import BASEURL from '../../service/serverURL'
import { SearchContext } from '../../../ContextApi/CreateContext'

function Landing() {
  const [latestBlogs, setLatestBlogs] = useState([])
  const { setSearchKey, searchKey } = useContext(SearchContext)
  const navigate = useNavigate()

  useEffect(() => {
    displayLatestBlogs()
  }, [])
// display latest blogss
  const displayLatestBlogs = async () => {
    try {
      const result = await displayLatestBlogInHomeApi()
      if (result.status === 200) setLatestBlogs(result.data)
    } catch (error) {
      console.log(error)
    }
  }
// search navigate
  const handleSearchIcon = () => {
    navigate('/blog')
  }

  return (
    <>
      <Header />

      {/* ---------------- Hero Section ---------------- */}
      <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
        {/* Background Image */}
        <img
          src="/hero.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeInOut }}
            className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Empowering Voices. Inspiring Futures.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeInOut }}
            className="text-gray-200 max-w-2xl text-lg md:text-xl mb-8"
          >
            Welcome to <span className="text-green-400 font-bold">Future Talks</span> — where creativity meets
            conversation. Discover inspiring blogs, innovative ideas, and future-focused stories.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeInOut }}
            className="relative w-full max-w-md"
          >
            <input
              onKeyDown={(e) => e.key === "Enter" && handleSearchIcon()}
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
              type="text"
              placeholder="Search inspiring blogs..."
              className="w-full h-14 px-6 pr-12 text-white bg-black/70 border border-green-500 rounded-full outline-none placeholder-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <FontAwesomeIcon
              onClick={handleSearchIcon}
              icon={faMagnifyingGlass}
              className="text-green-400 cursor-pointer absolute top-1/2 right-6 -translate-y-1/2 text-xl hover:text-green-300 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* ---------------- Latest Blogs Section ---------------- */}
      <section className="bg-green-50 py-16 px-6 md:px-20">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeInOut }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Latest from Future Talks
          </motion.h2>
          <p className="text-gray-600 mt-3 text-lg">
            Explore trending stories, deep insights, and future-driven ideas.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
          {latestBlogs?.length > 0 ? (
            latestBlogs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeInOut }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow overflow-hidden border border-gray-100 flex flex-col"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={`${BASEURL}/uploads/${item?.thumbnail}`}
                    alt="Thumbnail"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2 line-clamp-1">
                      {item?.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                      {item?.description.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/${item?._id}/view`}
                      className="text-green-600 font-semibold hover:underline"
                    >
                      Read More
                    </Link>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {item?.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600 text-lg">
              No recent blogs available.
            </p>
          )}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-14">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/blog')}
            className="px-8 py-3 bg-black text-green-400 font-semibold rounded-full border-2 border-transparent hover:border-black hover:bg-green-400 hover:text-black transition-all duration-300"
          >
            Explore More
          </motion.button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Landing
