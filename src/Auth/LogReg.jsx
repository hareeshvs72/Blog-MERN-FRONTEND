
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
  //  register steps
  const handileRegister = async () => {
    console.log('Inside handileRegister ');
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info("Please fill the form Completely");
    }
    else {
      // toast.success("proceed to api call")
      try {
        const result = await registerApi(userDetails)
        console.log(result);

        if (result.status == 200) {
          toast.success("Register SucessFully !!! Please Login")
          setAuthorisedUser(true)
          setUserDetails({ username: '', email: '', password: '' })
          navigate('/login')
        }
        else if (result.status == 409) {
          toast.warning(result.response.data)
          setUserDetails({ username: '', email: '', password: '' })
          navigate('/login')
        }
        else {
          console.log(result);
          setUserDetails({ username: '', email: '', password: '' })

        }
      } catch (err) {
        console.log(err);

      }
    }

  }
  const handileLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("Please fill the form Completely");
    }
    else {
      // toast.success("proceed to api call")
      try {
        const result = await loginApi(userDetails)
        console.log(result);

        if (result.status == 200) {
          toast.success("Login Sucessfully !!!")
          sessionStorage.setItem("users", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setAuthorisedUser(true)
          setTimeout(() => {
            if (result.data.user.role == 'admin') {
              navigate('/admin-dashbord')
            }
            else {
              navigate('/')
            }
          }, 2500)
        }
        else if (result.status == 401) {
          toast.warning(result.response.data)
          setUserDetails({ username: '', email: '', password: '' })


        }
        else if (result.status == 404) {
          toast.warning(result.response.data)
          setUserDetails({ username: '', email: '', password: '' })

        }
        else {
          toast.error("something Went Wrong !!!")
          setUserDetails({ username: '', email: '', password: '' })
        }
      } catch (err) {
        console.log(err);

      }
    }
  }
  const handileGoogleLogin = async (credentialResponse) => {
    console.log('inside handileGoogle Login');
    const credential = credentialResponse.credential
    const details = jwtDecode(credential)
    console.log(details);
    const result = await googleLoginApi({ username: details.name, email: details.email, password: "gogleloginpswd", profile: details.picture, })
    console.log(result);

    if (result.status == 200) {
      toast.success("Login Sucessfully !!!")
      sessionStorage.setItem("users", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setAuthorisedUser(true)
      setTimeout(() => {
        if (result.data.user.role == 'admin') {
          navigate('/admin-dashbord')
        }
        else {
          navigate('/')
        }
      }, 2500)
    }
    else {
      toast.error("something Went Wrong !!!")
    }



  }

  return (
    <>
      {/* Background Image */}

      {/* new login */}
      <div className='h-screen relative z-20  flex-col w-full flex items-center justify-center bg-[url(/logbg.gif)] bg-cover '>
      <div className='absolute -z-10 h-screen bg-black/70 w-full'></div>

        <div className='rounded-2xl w-[400px] p-5 bg-white' >
          {/* login */}
          <div>
            <h1 className='text-green-800 text-4xl text-center font-bold my-8'>{register? "SignUp" : "SignIn"}</h1>
          </div>
          {/* register click username box show */}
            {register && (
                  <div className='relative'>
                      <input
                        value={userDetails.username}
                        onChange={(e) =>
                          setUserDetails({ ...userDetails, username: e.target.value })
                        }
                        type="text"
                        placeholder="Username"
                        className="px-10 py-2 my-2 w-full bg-white rounded border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                      />
                       <FontAwesomeIcon className='absolute inset-0 top-5.5 font-bold left-3' icon={faUser} />
                  </div>
                  )}
                  {/* email */}
          <div className='relative'>
            <input
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              type="email"
              placeholder="Email Id"
              className="px-10 py-2    my-2 w-full bg-white rounded border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <FontAwesomeIcon className='absolute inset-0 top-5.5 font-bold left-3' icon={faEnvelope} />
          </div>
          {/* Password with eye toggle */}
          <div className="relative">
            <input
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              type={viewPasswordStatus ? 'text' : 'password'}
              placeholder="Password"
              className="px-10 py-2 z-20 my-2 w-full bg-white rounded border-2 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <FontAwesomeIcon
              onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
              icon={viewPasswordStatus ? faEye : faEyeSlash}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 cursor-pointer"
            />
            <FontAwesomeIcon className='absolute inset-0 top-5.5 font-bold left-3' icon={faLock} />
          </div>
          {/* Password note & forgot link */}
          <div className="flex justify-between mb-5">
            <p className="text-sm text-red-400 tracking-tighter">
              * Never share the password with others
            </p>
            <p className="underline  text-sm text-green-800 cursor-pointer">
              Forget password
            </p>
          </div>
          {/* Submit button */}
          {register ?
            <button type='button' onClick={handileRegister} className="flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 w-full rounded border-2 border-transparent hover:border-green-400 hover:bg-black hover:text-green-400 transition">
              Register
            </button>
            :
            <button type='button' onClick={handileLogin} className="flex items-center justify-center gap-2 text-black font-bold px-3 py-2 my-2 bg-green-400 w-full rounded border-2 border-transparent hover:border-green-400 hover:bg-black hover:text-green-400 transition">
              Login
            </button>
          }

          {/* Divider */}
          <div className='text-center my-3 text-white'>
            {!register &&
              <div className='flex w-full flex-col items-center justify-center'>
                <p className='text-black my-3'>    ------------ <span className='font-bold'> Login</span> With  Others ------------</p>
               <GoogleLogin 
               width='100%'
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handileGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />

              </div>
            }
          </div>
          {/* switch button */}
            <div className='flex  my-3 justify-center items-center'>
               <Link className='mx-1 w-full' to={'/login'}>
               <button className='w-full mx-2 bg-black text-green-400 py-3 font-bold'>SignIn</button>
               </Link>
                <Link className='mx-1 w-full' to={'/register'}>
               <button className='w-full mx-2 bg-black text-green-400 py-3 font-bold'>SignUp</button>
                </Link>
            </div>

             
        </div>

      </div>


      {/* create new design */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"

      />
    </>
  )
}

export default LogReg