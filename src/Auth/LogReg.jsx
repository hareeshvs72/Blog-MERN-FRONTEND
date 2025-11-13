import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { registerApi, loginApi, googleLoginApi } from '../service/allAPI'
import { jwtDecode } from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { autherisedContext } from '../context/AutherisedUserContext'

function LogReg({ register }) {

  const { authorisedUser, setAuthorisedUser, role } = useContext(autherisedContext)
  const navigate = useNavigate()

  const [viewPasswordStatus, setViewPasswordStatus] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  })

  // REGISTER
  const handileRegister = async () => {
    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info("Please fill the form Completely")
      return
    }

    try {
      const result = await registerApi(userDetails)
      if (result.status === 200) {
        toast.success("Register Successfully! Please Login")
        setAuthorisedUser(true)
        setUserDetails({ username: '', email: '', password: '' })
        navigate('/login')
      } else if (result.status === 409) {
        toast.warning(result.response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // LOGIN
  const handileLogin = async () => {
    const { email, password } = userDetails

    if (!email || !password) {
      toast.info("Please fill the form Completely")
      return
    }

    try {
      const result = await loginApi(userDetails)
      if (result.status === 200) {
        toast.success("Login Successfully!")
        sessionStorage.setItem("users", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        setAuthorisedUser(true)

        setTimeout(() => {
          result.data.user.role === 'admin'
            ? navigate('/admin-dashbord')
            : navigate('/')
        }, 2500)
      } else if (result.status === 401 || result.status === 404) {
        toast.warning(result.response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // GOOGLE LOGIN
  const handileGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)

    const result = await googleLoginApi({
      username: details.name,
      email: details.email,
      password: "gogleloginpswd",
      profile: details.picture,
    })

    if (result.status === 200) {
      toast.success("Login Successfully!")
      sessionStorage.setItem("users", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setAuthorisedUser(true)

      setTimeout(() => {
        result.data.user.role === 'admin'
          ? navigate('/admin-dashbord')
          : navigate('/')
      }, 2000)
    } else {
      toast.error("Something went wrong!")
    }
  }

  return (
    <>
      <div className="h-screen relative flex items-center justify-center bg-[url('/logbg.gif')] bg-cover">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative w-[380px] md:w-[420px] bg-white p-8 rounded-2xl shadow-xl">

          <h1 className="text-green-800 text-4xl text-center font-extrabold mb-5">
            {register ? "SignUp" : "SignIn"}
          </h1>

          {/* Username (only in register) */}
          {register && (
            <div className="relative mb-3">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700" />
              <input
                value={userDetails.username}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                type="text"
                placeholder="Username"
                className="pl-10 pr-3 py-2 w-full border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative mb-3">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700" />
            <input
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              type="email"
              placeholder="Email"
              className="pl-10 pr-3 py-2 w-full border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700" />

            <input
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              type={viewPasswordStatus ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10 py-2 w-full border-2 border-green-400 rounded-lg focus:ring-2 focus:ring-green-700 outline-none"
            />

            <FontAwesomeIcon
              icon={viewPasswordStatus ? faEye : faEyeSlash}
              onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 cursor-pointer"
            />
          </div>

          {/* Note + Forgot */}
          <div className="flex justify-between mb-4 text-sm">
            <p className="text-red-500">* Never share your password</p>
            <p className="text-green-800 underline cursor-pointer">Forget password</p>
          </div>

          {/* Submit Button */}
          {register ? (
            <button
              onClick={handileRegister}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-black hover:text-green-400 border-2 border-transparent hover:border-green-400 transition"
            >
              Register
            </button>
          ) : (
            <button
              onClick={handileLogin}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-black hover:text-green-400 border-2 border-transparent hover:border-green-400 transition"
            >
              Login
            </button>
          )}

          {/* Google Login */}
          {!register && (
            <div className="mt-5 text-center">
              <p className="text-black mb-2">------ Login With Others ------</p>
              <GoogleLogin
                width="100%"
                onSuccess={handileGoogleLogin}
                onError={() => console.log("Login Failed")}
              />
            </div>
          )}

          {/* Toggle Buttons */}
          <div className="flex gap-3 mt-6">
            <Link to="/login" className="w-1/2">
              <button className="w-full py-2 bg-black text-green-400 font-bold rounded-lg">
                SignIn
              </button>
            </Link>

            <Link to="/register" className="w-1/2">
              <button className="w-full py-2 bg-black text-green-400 font-bold rounded-lg">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  )
}

export default LogReg
