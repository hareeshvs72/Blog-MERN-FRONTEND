import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { easeIn, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-green-300 to-green-500 text-black relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeIn }}
          className="container mx-auto px-6 md:px-16 py-12 grid md:grid-cols-3 gap-10 items-start"
        >
          {/* ---------- Left Section ---------- */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo.png"
                alt="Future Talks Logo"
                className="w-20 h-14 object-contain"
              />
            </div>
            <h1 className="font-extrabold text-2xl mb-2">
              "Ideas That Shape Tomorrow!"
            </h1>
            <p className="text-gray-800 text-sm leading-relaxed max-w-sm">
              Future Talks is a modern blogging platform empowering thinkers and creators
              to share ideas, inspire change, and connect the world through meaningful conversations.
            </p>
          </div>

          {/* ---------- Middle Section (Quick Links) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeIn }}
            className="flex flex-col items-start md:items-center"
          >
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3 text-lg font-semibold">
              <Link
                to="/"
                className="hover:text-green-800 hover:translate-x-1 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="hover:text-green-800 hover:translate-x-1 transition-all duration-300"
              >
                Blog
              </Link>
              <Link
                to="/aboutus"
                className="hover:text-green-800 hover:translate-x-1 transition-all duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-green-800 hover:translate-x-1 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* ---------- Right Section (Contact + Newsletter) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeIn }}
            className="space-y-5"
          >
            <h3 className="font-bold text-xl mb-3">Stay Connected</h3>

            {/* Email */}
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="bg-black text-green-400 p-3 rounded-full hover:bg-green-400 hover:text-black transition-all"
              />
              <div>
                <p className="font-semibold text-sm">Email</p>
                <p className="text-gray-800 text-sm">FutureTalks@gmail.com</p>
              </div>
            </div>

            {/* Twitter */}
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faXTwitter}
                className="bg-black text-green-400 p-3 rounded-full hover:bg-green-400 hover:text-black transition-all"
              />
              <div>
                <p className="font-semibold text-sm">Twitter X</p>
                <p className="text-gray-800 text-sm">@FutureTalks</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-l-lg text-black placeholder-gray-700 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="bg-black text-green-400 px-4 py-2 rounded-r-lg hover:bg-green-400 hover:text-black transition-all duration-300">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- Bottom Bar ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-black py-4 text-center"
        >
          <p className="text-green-400 text-sm font-semibold">
            © {new Date().getFullYear()} Future Talks — Designed by Hareesh Vs
          </p>
        </motion.div>
      </footer>
    </>
  )
}

export default Footer
