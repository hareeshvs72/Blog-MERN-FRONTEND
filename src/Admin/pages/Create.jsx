import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

function Create() {
  return (
    <>
      <AdminHeader />

      <>
        <div className="md:grid grid-cols-5">
          <div className="col-span-1 relative z-10">
            <AdminSidebar />
          </div>
          <div className="col-span-4 bg-green-100 min-h-screen">
            <div className='md:mx-40 p-3 gap-2 md:mt-10'>
              <div className='bg-white p-3 md:px-10 rounded-2xl  shadow-2xl '>
                <form >
                  {/* upload thubnail */}
                  <div className='inline-flex flex-col items-center justify-center'>
                    <input type="file" className='hidden' id='thubnail' />
                    <h3 className='font-bold my-3' >Upload Thumbnail</h3>
                    <label htmlFor="thubnail" className='border-2 bg-green-400 px-6 py-5 block rounded-2xl cursor-pointer'>
                      <FontAwesomeIcon icon={faCloudArrowUp} className='text-5xl' />
                      <p className='text-center'>Upload</p>
                    </label>
                  </div>

                  {/* title */}

                  <div className='my-3 md:w-[500px]'>
                    <label htmlFor="title" className='font-semibold'>Blog Title</label>
                    <input
                      id='title'
                      type="text"
                      placeholder="Name"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    />
                    {/* sub Title */}
                  </div>
                  <div className='my-3 md:w-[500px]'>
                    <label htmlFor="subtitle" className='font-semibold'>Blog Title</label>
                    <input
                      id='subtitle'
                      type="text"
                      placeholder="Name"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    />
                  </div>
                  {/* blog description */}
                  <div className='my-3 md:w-[500px]'>
                    <label htmlFor="BlogDescription" className='font-semibold'>Blog Description</label>
                    <textarea
                      id='BlogDescription'
                      placeholder="Message"
                      className="my-2 w-full h-32 px-3 py-2 bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900"
                    ></textarea>
                  </div>
                  <div className='my-3 flex flex-col md:w-[200px]'>
                    <label htmlFor="category">Blog Category</label>
                    <select name="" id="" className='px-3 py-2 my-2 w-full bg-white rounded border-3 border-green-400 focus:outline-2 focus:border-0  focus:outline-green-900'>
                      <option value="">Select Category</option>
                      <option value="">Sports</option>
                      <option value="">Life Style</option>
                    </select>
                  </div>
                  <button className="  flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 md:w-[500px] rounded hover:border-2 hover:border-green-400 hover:bg-black border-2 border-transparent hover:text-green-400">
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>



    </>
  )
}

export default Create