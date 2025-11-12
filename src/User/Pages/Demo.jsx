import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { motion, easeIn } from 'framer-motion'

function Demo() {
  return (
    <>
      <Header />

      <div className="bg-gradient-to-b from-green-50 to-white md:px-24 px-5 md:py-16 py-10">
      
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeIn }}
          className="text-4xl font-extrabold text-center text-green-800 mb-3"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto text-gray-700 mb-12"
        >
          Have something to share, a collaboration idea, or feedback on our blogs?  
          We’d love to hear from you! Drop us a message — your voice helps shape <b>FeatureTalks</b>.
        </motion.p>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-md rounded-2xl p-8 border border-green-100"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
              Send a Message
            </h2>

            <form>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-3 mb-4 border border-green-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold w-full py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                Send Message <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </motion.div>

          {/* Social and Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center md:pl-10"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Connect with FeatureTalks
            </h2>
            <p className="text-gray-700 mb-8">
              Stay connected and follow our conversations online! Whether it's sharing your thoughts,
              joining discussions, or exploring ideas — we’re active across platforms.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="bg-green-700 text-white p-3 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-700">FeatureTalks@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="bg-green-700 text-white p-3 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Twitter (X)</h4>
                  <p className="text-gray-700">@FeatureTalks</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="bg-green-700 text-white p-3 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Instagram</h4>
                  <p className="text-gray-700">@Feature_Talks</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Demo
