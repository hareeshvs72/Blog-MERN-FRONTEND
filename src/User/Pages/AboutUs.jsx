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
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: easeIn }}
              className='text-3xl font-bold  my-3'>
              About Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .5, ease: easeIn }}

              className='font-semibold text-justify'>Welcome to Future Talks, a modern and inspiring blogging platform created to empower voices, share ideas, and spark meaningful conversations about the world we live in — and the one we’re building for the future.
              Our mission at Future Talks is to connect people through stories, knowledge, and perspectives that matter. We believe that every opinion, innovation, and creative thought contributes to shaping tomorrow.</motion.p>

          </div>

          <div className="md:grid grid-cols-2 gap-20 my-7 md:px-30 md:py-10">
            {/* image */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: easeIn }}
              className='min-h-[500px] '>
              <img src="/aboutimg.jpg" alt="about Image" className='w-full h-full rounded-2xl object-cover' />
            </motion.div>

            {/* content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .5, ease: easeIn }}
              className="flex flex-col justify-center">
              <p className='font-semibold text-justify my-3'>Whether you’re a passionate writer, an emerging creator, or a curious reader, our platform provides a space where your ideas can shine.

                Powered by the MERN stack (MongoDB, Express, React, and Node.js), Future Talks combines technology and creativity to deliver a seamless, secure, and lightning-fast blogging experience. From writing and publishing to engaging with readers, every feature is designed to make content creation simple, enjoyable, and impactful. </p>
              <p className='font-semibold text-justify my-3'>But Future Talks is more than just a blogging platform — it’s a growing community of thinkers, dreamers, and doers. We celebrate diversity in thoughts and encourage open discussions that lead to learning and innovation. Here, every story matters, and every perspective is valued.

                Our goal is to bridge ideas across generations and industries — from technology and lifestyle to culture and innovation — inspiring people to share their experiences and shape a smarter, more connected world.

                Join Future Talks today and become part of a community that believes in the power of conversation. Together, we’ll explore ideas, spark change, and create a future worth talking about.. </p>

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