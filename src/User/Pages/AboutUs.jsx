import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { easeIn, motion } from 'framer-motion'

function AboutUs() {
  return (
    <>
      <Header />
      <div className="bg-green-50 min-h-screen py-10 px-5 md:px-20">
        {/* Title Section */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeIn }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            About Future Talks
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeIn }}
            className="max-w-3xl mx-auto text-gray-700 text-lg font-medium leading-relaxed"
          >
            Welcome to <span className="text-green-700 font-bold">Future Talks</span> — a platform built to empower voices,
            share ideas, and inspire conversations that shape the future. Our goal is to connect people through stories,
            creativity, and perspectives that matter.
          </motion.p>
        </div>

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easeIn }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="/aboutimg.jpg"
              alt="About Future Talks"
              className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easeIn }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              A Platform for Dreamers, Writers, and Innovators
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you’re a passionate writer, a curious reader, or a creator looking for an audience,
              <span className="font-semibold text-green-700"> Future Talks</span> provides the perfect space to share your voice.
              Built with the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js), our platform ensures a fast,
              secure, and smooth experience — so you can focus on what truly matters: your ideas.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              But we’re more than just a blogging site — we’re a <strong>community</strong> of thinkers, dreamers, and doers.
              We celebrate diversity of thought and encourage open discussions that inspire learning and innovation.
              Every story matters here, and every perspective adds to the conversation shaping our world.
            </p>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/contact"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="mt-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeIn }}
            className="text-3xl font-bold text-gray-900 mb-5"
          >
            Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: easeIn }}
            className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed"
          >
            At <span className="font-semibold text-green-700">Future Talks</span>, our mission is to bridge ideas across generations and industries.
            From technology and lifestyle to culture and innovation — we aim to inspire people to share their stories,
            spark meaningful discussions, and shape a smarter, more connected world together.
          </motion.p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs
