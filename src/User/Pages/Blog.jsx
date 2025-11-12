import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { displayBlogApi } from '../../service/allAPI'
import BASEURL from '../../service/serverURL'
import { SearchContext } from '../../../ContextApi/CreateContext'

function Blog() {
  const [token, setToken] = useState("")
  const [blogs, setBlogs] = useState([])
  const [category, setCategory] = useState([])
  const [tempBlogs, setTempBlogs] = useState([])
  const [allCategorsListStyle, setAllCategoryListStyle] = useState("All")
  const { searchKey, setSearchKey } = useContext(SearchContext)

  const isActive = "font-bold bg-green-400 text-black px-4 rounded-full py-1 m-1 shadow-md"
  const inActive = "font-bold bg-black text-green-400 px-4 rounded-full py-1 m-1 border border-transparent hover:border-black hover:bg-green-400 hover:text-black transition-all"

  // useEffect for token and blog display
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      DisplaylogAPi(token)
    }
  }, [token, searchKey])

  // category
  useEffect(() => {
    if (blogs.length > 0) {
      const tempCategory = tempBlogs.map(items => items.category);
      const nonDupCategory = [...new Set(tempCategory)]
      setCategory(nonDupCategory);
    }
  }, [blogs])

  // display  All Blog api
  const DisplaylogAPi = async (token) => {
    console.log("inside DisplaylogAPi");

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await displayBlogApi(searchKey, reqHeader)
      if (result.status === 200) {
        console.log(result.data);
        setTempBlogs(result.data)
        setBlogs(result.data)
      }
      else {
        console.log(result.response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // category filter
  const handileCategory = (categoryarg) => {
    if (categoryarg === "All") {
      setBlogs(tempBlogs)
      setSearchKey("")
    } else {
      const filter = tempBlogs.filter((item) => item.category === categoryarg)
      console.log(filter);
      setBlogs(filter)
    }
  }

  console.log(blogs);

  return (
    <>
      <Header />

      {token ? (
        <>
          <div className='md:px-20 md:py-10 p-5 bg-green-50 min-h-screen'>
            <div className='flex items-center w-full flex-col text-center'>
              <h1 className='text-4xl font-extrabold my-4 text-gray-900'>All Blogs</h1>

              <div className="relative w-[90%] md:w-[350px] mb-6">
                <input
                  type="text"
                  placeholder="Search Blogs"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="h-12 w-full border border-green-500 px-4 pr-12 
                            bg-black/70 text-white rounded-full outline-none 
                            focus:ring-2 focus:ring-green-400 transition-all"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-green-400 cursor-pointer absolute top-1/2 right-5 -translate-y-1/2 text-lg"
                />
              </div>
            </div>

            {/* category buttons */}
            <div className='my-4 flex flex-wrap justify-center w-full'>
              <button onClick={() => { handileCategory("All"); setAllCategoryListStyle("All") }}
                className={allCategorsListStyle === "All" ? isActive : inActive}>
                All
              </button>
              {
                category.length > 0 &&
                category.map((item, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() => { handileCategory(item); setAllCategoryListStyle(item) }}
                    className={allCategorsListStyle === item ? isActive : inActive}>
                    {item}
                  </button>
                ))
              }
            </div>

            {/* blog Duplicate */}
            <div className={`${blogs?.length > 0 ? "grid md:grid-cols-3 lg:grid-cols-4 gap-8" : ""} my-3`}>
              {blogs?.length > 0 ? (
                blogs.map((items, index) => (
                  <div key={index} className='bg-white p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300'>
                    <div className='h-48 w-full overflow-hidden rounded-lg mb-3'>
                      <img
                        src={`${BASEURL}/uploads/${items?.thumbnail}`}
                        alt="Thumbnail"
                        className='w-full h-full object-cover hover:scale-110 transition-transform duration-500'
                      />
                    </div>

                    <div>
                      <h1 className='text-xl font-bold text-green-700 line-clamp-1'>{items?.title}</h1>
                      <h2 className='text-sm text-gray-500 mb-2 line-clamp-1'>{items?.subTitle}</h2>
                      <p className='text-gray-700 text-sm font-medium mb-3 line-clamp-3'>
                        {items?.description}
                      </p>
                     <div className=' flex justify-between items-center'>
                        <Link
                          to={`/${items?._id}/view`}
                          className='text-green-700 font-semibold hover:underline inline-block mb-3'>
                          Read More
                        </Link>
                        <button className='px-4 py-1 bg-black text-green-400 font-semibold rounded-full hover:bg-green-400 hover:text-black transition-all'>
                          {items?.category}
                        </button>
                     </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='w-full flex justify-center items-center h-[300px]'>
                  <img className='w-24 h-24 object-contain' src="/loader.gif" alt="loader" />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center flex-col '>
          <img src="/blogLogin.gif" alt="login gif" />
          <p className='my-5 font-semibold text-xl'>Please <Link to={'/login'} className='text-green-400' >Login</Link> To See More</p>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Blog
