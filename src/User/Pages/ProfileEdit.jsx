import React, { useContext, useEffect, useState } from 'react'
import UserSidebar from '../Components/UserSidebar'
import { faPen, } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify'
import { userProfileEditAPI } from '../../service/allAPI';
import BASEURL from '../../service/serverURL';
import { userUpdateContext } from '../../context/ResponseContextApi';


function ProfileEdit() {
      const {userEditresponse,setUserEditResponse} = useContext(userUpdateContext)
    const [userUpdate, setUserUpdate] = useState({
        username: "", password: "", cPassword: "", profile: "", banner: "", bio: "", insta: "", github: "", twitterx: "", linkedin: ""
    })
    const [token, setToken] = useState('')
    const [profilePreview, setProfilePreview] = useState("")
    const [bannerPreview, setBannerPreview] = useState("")
    const [existingBanner, setExistingBanner] = useState("")
    const [existingProfile, setExistingProfile] = useState("")
    const [updatedProfile, setUpdateProfile] = useState({})

    //  const user details 

    const [username, setUsername] = useState("");
    const [usermail, setUsermail] = useState("");
    const [banner, setBanner] = useState("");
    const [profile, setProfile] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [insta, setInsta] = useState("");
    const [twitterx, setTwitterx] = useState("");
    const [github, setGithub] = useState("");
    const [bio, setBio] = useState("");
  
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const userToken = sessionStorage.getItem("token")
            setToken(userToken)
            const users = JSON.parse(sessionStorage.getItem("users"))
            setUserUpdate({ ...userUpdate, username: users.username, password: users.password, cPassword: users.password, bio: users.bio, insta: users.insta, github: users.github, twitterx: users.twitterx, linkedin: users.linkedin })
            setExistingBanner(users.banner)
            setExistingProfile(users.profile)

            // user details
            setUsername(users.username );
            setUsermail(users.email);
            setBanner(users.banner );
            setProfile(users.profile );
            setLinkedin(users.linkedin );
            setInsta(users.insta );
            setTwitterx(users.twitterx );
            setGithub(users.github );
            setBio(users.bio );

        }
    }, [updatedProfile])

    const handileReset = () => {
        setUserUpdate({ username: "", password: "", cPassword: "", profile: "", banner: "", bio: "", insta: "", github: "", twitterx: "", linkedin: "" })
        setBannerPreview("")
        setProfilePreview("")
    }

    // banner url
    const updatebanner = (e) => {
        console.log("inside update banner");
        setUserUpdate({ ...userUpdate, banner: e.target.files[0] })
        console.log(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setBannerPreview(url)

    }
    //  profile url
    const updateProfile = (e) => {
        console.log("inside update banner");
        setUserUpdate({ ...userUpdate, profile: e.target.files[0] })
        console.log(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setProfilePreview(url)
    }
    // profile update

    const handileUpdate = async () => {
        console.log("insdied handile update");

        const { username, password, cPassword, profile, banner, bio, insta, github, twitterx, linkedin } = userUpdate
        if (!username || !password || !cPassword || !bio) {
            toast.warning("please fill the box")
        }
        else if (password != cPassword) {
            toast.warning("Incorrect Password Please Check CareFully !!!")
        }
        else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData()
            for (let key in userUpdate) {
                if (key == "profile" || key == "banner") {
                    if (!userUpdate[key]) {
                        continue;
                    }
                }
                reqBody.append(key, userUpdate[key])

            }
            try {
                const result = await userProfileEditAPI(reqBody, reqHeader)
                if (result.status == 200) {
                    toast.success("Profile Update SucessFully")
                    console.log(result.data);
                    sessionStorage.setItem("users", JSON.stringify(result.data))
                    setUserEditResponse(result.data)
                    setUpdateProfile(result.data)
                    handileReset()
                }
            } catch (error) {
                console.log(error);

            }
        }

    }


    return (

        <>
            <div className="md:grid grid-cols-5">
                <div className="col-span-1 relative z-10">

                    <UserSidebar />
                </div>
                <div className="col-span-4 bg-green-100 min-h-screen">
                    <div className="md:grid grid-cols-2 py-10 px-20 flex items-center justify-center h-full">
                        {/* profile card  */}

                        <div>
                            <div className="max-w-sm mx-auto  rounded-2xl shadow-xl bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
                                {/* Banner Section */}
                                <div className="relative h-32 w-full">
                                    <img
                                        src={banner == "" ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60" : `${BASEURL}/uploads/${banner}`}
                                        alt="Banner"
                                        className="w-full h-32 object-cover"
                                    />


                                    {/* Profile Image */}
                                    <img
                                        src={profile == "" ? "https://i.pravatar.cc/150?img=3" : `${BASEURL}/uploads/${profile}` }
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 top-16"
                                    />
                                </div>

                                {/* User Info */}
                                <div className="pt-16 pb-6 px-6 text-center">
                                    <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
                                    <p className="text-sm text-gray-500 mb-3">{usermail}</p>
                                    <p className="text-gray-600 text-sm mb-6">
                                       {bio}
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex justify-center space-x-5">

                                        <a
                                            href={twitterx ==""? "https://twitter.com" : twitterx }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sky-500 hover:text-sky-700"
                                        >
                                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                                        </a>
                                        <a
                                            href={insta==""? "https://instagram.com" : insta}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-pink-600 hover:text-pink-800"
                                        >
                                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                                        </a>
                                        <a
                                            href={linkedin == "" ?  "https://linkedin.com" : linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-700 hover:text-blue-900"
                                        >
                                            <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                        </a>
                                        <a
                                            href={github == "" ? "https://github.com" : github }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-gray-700 hover:text-black"
                                        >
                                            <FontAwesomeIcon icon={faGithub} size="lg" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* profile edit  */}

                        <div>


                            <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Edit Profile
                                </h2>

                                <form className="space-y-5">


                                    {/* Profile Image Upload */}
                                    <div className="relative h-40 w-full">
                                        {/* Banner Image */}
                                        {existingBanner
                                            ?
                                            <img
                                                src={bannerPreview ? `${bannerPreview}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"}
                                                alt="Banner"
                                                className="w-full h-40 object-cover rounded-t-2xl"
                                            />
                                            :
                                            <img
                                                src={bannerPreview ? `${bannerPreview}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"}
                                                alt="Banner"
                                                className="w-full h-40 object-cover rounded-t-2xl"
                                            />

                                        }

                                        {/* Hidden File Input for Banner */}
                                        <input type="file" id="bannerUpload" onChange={(e) => updatebanner(e)} className="hidden" />

                                        {/* Edit Icon for Banner */}
                                        <label
                                            htmlFor="bannerUpload"
                                            className="absolute bottom-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 hover:text-black rounded-full p-2 shadow-md cursor-pointer transition"
                                            title="Change Banner"
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </label>

                                        {/* Profile Image */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 top-20">
                                            <div className="relative w-28 h-28">
                                                {existingProfile ?
                                                    <img
                                                        src={profilePreview ? profilePreview : "https://i.pravatar.cc/150?img=3"}
                                                        alt="Profile"
                                                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                                                    />
                                                    :
                                                    <img
                                                        src={profilePreview ? profilePreview : "https://i.pravatar.cc/150?img=3"}
                                                        alt="Profile"
                                                        className="w-28 h-28 rounded-full border-4 border-white object-cover"
                                                    />
                                                }

                                                {/* Hidden File Input for Profile */}
                                                <input onChange={(e) => updateProfile(e)} type="file" id="profileUpload" className="hidden" />

                                                {/* Edit Icon for Profile */}
                                                <label
                                                    htmlFor="profileUpload"
                                                    className="absolute bottom-0 right-0 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 hover:text-black rounded-full p-2 shadow-md cursor-pointer transition"
                                                    title="Change Profile Picture"
                                                >
                                                    <FontAwesomeIcon icon={faPen} size="sm" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div className='my-3'>
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                            value={userUpdate.username}
                                            onChange={e => setUserUpdate({ ...userUpdate, username: e.target.value })}
                                        />
                                    </div>

                                    {/* password and cpassword */}

                                    <div className='flex'>
                                        {/* Password */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                                value={userUpdate.password}
                                                onChange={e => setUserUpdate({ ...userUpdate, password: e.target.value })}
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div className='mx-3'>
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                                value={userUpdate.cPassword}
                                                onChange={e => setUserUpdate({ ...userUpdate, cPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Bio
                                        </label>
                                        <textarea
                                            placeholder="Write a short bio..."
                                            rows="3"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                                            value={userUpdate.bio}
                                            onChange={e => setUserUpdate({ ...userUpdate, bio: e.target.value })}
                                        ></textarea>
                                    </div>



                                    {/* Social Media Links */}
                                    <div >
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Social Media Links
                                        </label>

                                        <div className="space-y-3 flex flex-col">
                                            <div className='flex'>
                                                {/* github */}
                                                <div className="flex items-center space-x-3">
                                                    <FontAwesomeIcon icon={faGithub} className="text-gray-800" />
                                                    <input
                                                        type="url"
                                                        placeholder="Facebook profile link"
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                                        value={userUpdate.github}
                                                        onChange={e => setUserUpdate({ ...userUpdate, github: e.target.value })}
                                                    />
                                                </div>

                                                {/* Twitter */}
                                                <div className="flex mx-2 items-center space-x-3">
                                                    <FontAwesomeIcon icon={faTwitter} className="text-sky-500" />
                                                    <input
                                                        type="url"
                                                        placeholder="Twitter profile link"
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                                        value={userUpdate.twitterx}
                                                        onChange={e => setUserUpdate({ ...userUpdate, twitterx: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex'>
                                                {/* Instagram */}
                                                <div className="flex items-center space-x-3">
                                                    <FontAwesomeIcon icon={faInstagram} className="text-pink-500" />
                                                    <input
                                                        type="url"
                                                        placeholder="Instagram profile link"
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                                        value={userUpdate.insta}
                                                        onChange={e => setUserUpdate({ ...userUpdate, insta: e.target.value })}
                                                    />
                                                </div>

                                                {/* LinkedIn */}
                                                <div className="flex items-center mx-2 space-x-3">
                                                    <FontAwesomeIcon icon={faLinkedin} className="text-blue-700" />
                                                    <input
                                                        type="url"
                                                        placeholder="LinkedIn profile link"
                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                                        value={userUpdate.linkedin}
                                                        onChange={e => setUserUpdate({ ...userUpdate, linkedin: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        onClick={handileUpdate}
                                        className="w-full py-2 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                pauseOnHover
                theme="colored"

            />
        </>
    )
}

export default ProfileEdit