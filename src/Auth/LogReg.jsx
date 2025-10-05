
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function LogReg({ register }) {
  const [viewPasswordStatus, setViewPasswordStatus] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })
  return (
    <>
      {/* Background Image */}
      <div
        className="h-screen w-full bg-cover bg-center p-5 md:p-20"
        style={{ backgroundImage: "url('/bglogin.jpg')" }} // make sure bglogin.jpg is in /public
      >
        {/* Black overlay */}
        <div className="w-full h-full bg-black/50 flex  items-center justify-center">
          <div className="shadow-xl md:p-10 rounded-2xl w-full max-w-5xl">
            

            <div className="md:grid grid-cols-2 gap-5">
              {/* Left side image */}
              <div className="hidden md:block relative w-full h-full bg-cover object-cover rounded-lg" style={{background:'url("https://img.freepik.com/premium-photo/spring-grain-concept-agriculture-healthy-eating-organic-food-generative-ai_58409-32489.jpg")'}}>
                <img
                  src="/logo.png"
                  alt="logo"
                  className="absolute "
                />
              
              </div>

              {/* Right side form */}
              <div className="bg-black p-6 md:p-10 rounded-lg shadow-2xl flex flex-col">
                {/* Icon & title */}
                <div className="flex items-center justify-center flex-col">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="border border-white p-5 text-white text-2xl rounded-full"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <p className="font-bold text-white text-2xl my-2">
                    {register ? 'Register' : 'Login'}
                  </p>
                </div>

                {/* Form */}
                <form>
                  {register && (
                    <input
                      value={userDetails.username}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, username: e.target.value })
                      }
                      type="text"
                      placeholder="Username"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  )}

                  <input
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    type="email"
                    placeholder="Email Id"
                    className="px-3 py-2 my-2 w-full bg-white rounded border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />

                  {/* Password with eye toggle */}
                  <div className="relative">
                    <input
                      value={userDetails.password}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, password: e.target.value })
                      }
                      type={viewPasswordStatus ? 'text' : 'password'}
                      placeholder="Password"
                      className="px-3 py-2 my-2 w-full bg-white rounded border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <FontAwesomeIcon
                      onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
                      icon={viewPasswordStatus ? faEye : faEyeSlash}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 cursor-pointer"
                    />
                  </div>

                  {/* Password note & forgot link */}
                  <div className="flex justify-between mb-5">
                    <p className="text-sm text-red-400 tracking-tighter">
                      * Never share the password with others
                    </p>
                    <p className="underline text-sm text-white cursor-pointer">
                      Forget password
                    </p>
                  </div>

                  {/* Submit button */}
                  <button className="flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 w-full rounded border-2 border-transparent hover:border-green-400 hover:bg-black hover:text-green-400 transition">
                    {register ? 'Register' : 'Login'}
                  </button>

                  {/* Divider */}
                  <div className="text-center my-3 text-white">
                    ---------or------------
                  </div>

                  {/* Switch between login & register */}
                  {register ? (
                    <p className="text-white text-center text-sm">
                      Are you already a user?{' '}
                      <Link to="/login" className="underline text-yellow-400">
                        Login
                      </Link>
                    </p>
                  ) : (
                    <p className="text-white text-center text-sm">
                      Are you a new user?{' '}
                      <Link to="/register" className="underline text-yellow-400">
                        Register
                      </Link>
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogReg