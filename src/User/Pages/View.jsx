import React from 'react'
import Header from '../Components/Header'
import { faUser, faCalendar, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Components/Footer";
function View() {
  return (
    
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
        {/* Blog Container */}
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Thumbnail */}
          <div className="w-full h-72">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
              alt="Blog Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="p-8">
            {/* Category */}
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase mb-3">
              Travel
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Exploring the Hidden Gems of Bali
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-lg mb-6">
              Discover breathtaking beaches, lush jungles, and cultural wonders.
            </p>

            {/* Author & Date */}
            <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> By Hareesh VS
              </span>
              <span className="flex items-center">
                <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Oct 25, 2025
              </span>
              <span className="flex items-center">
                <FontAwesomeIcon icon={faCommentDots} className="mr-2" /> 12 Comments
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
              Bali, often called the Island of the Gods, offers travelers an experience like no other. 
              From its scenic rice terraces to ancient temples, the island is full of surprises at every turn.
              <br /><br />
              Whether you’re seeking peace in Ubud’s serene forests or adventure in Nusa Penida’s cliffs, 
              Bali’s charm is irresistible. In this blog, we explore some of the most underrated yet 
              breathtaking destinations that define the soul of this tropical paradise.
            </p>

            <hr className="my-8" />

            {/* Comment Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

              {/* Comment Input */}
              <div className="flex items-start space-x-3 mb-6">
                <img
                  src="https://i.pravatar.cc/50?img=5"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Write a comment..."
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  ></textarea>
                  <button
                    type="button"
                    className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Post Comment
                  </button>
                </div>
              </div>

              {/* Existing Comments */}
              <div className="space-y-5">
                {/* Comment 1 */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://i.pravatar.cc/50?img=8"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg w-full">
                    <h4 className="font-semibold text-gray-800">John Doe</h4>
                    <p className="text-gray-700 text-sm">
                      Absolutely love this article! Bali has been on my bucket list for years.
                    </p>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                </div>

                {/* Comment 2 */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://i.pravatar.cc/50?img=12"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-lg w-full">
                    <h4 className="font-semibold text-gray-800">Priya Sharma</h4>
                    <p className="text-gray-700 text-sm">
                      Great read! The photos are beautiful. Can’t wait to visit soon 🌴
                    </p>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default View
