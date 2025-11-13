import React, { useContext, useEffect, useState } from 'react'
import UserSidebar from '../Components/UserSidebar'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify'
import { userProfileEditAPI } from '../../service/allAPI';
import BASEURL from '../../service/serverURL';
import { userUpdateContext } from '../../context/ResponseContextApi';

function ProfileEdit() {

    const { userEditresponse, setUserEditResponse } = useContext(userUpdateContext)

    const [userUpdate, setUserUpdate] = useState({
        username: "", password: "", cPassword: "",
        profile: "", banner: "", bio: "", insta: "",
        github: "", twitterx: "", linkedin: ""
    })

    const [token, setToken] = useState('')
    const [profilePreview, setProfilePreview] = useState("")
    const [bannerPreview, setBannerPreview] = useState("")
    const [existingBanner, setExistingBanner] = useState("")
    const [existingProfile, setExistingProfile] = useState("")
    const [updatedProfile, setUpdateProfile] = useState({})

    // user info for left card
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

            setUserUpdate({
                ...userUpdate,
                username: users.username,
                password: users.password,
                cPassword: users.password,
                bio: users.bio,
                insta: users.insta,
                github: users.github,
                twitterx: users.twitterx,
                linkedin: users.linkedin
            })

            setExistingBanner(users.banner)
            setExistingProfile(users.profile)

            // left-card details
            setUsername(users.username);
            setUsermail(users.email);
            setBanner(users.banner);
            setProfile(users.profile);
            setLinkedin(users.linkedin);
            setInsta(users.insta);
            setTwitterx(users.twitterx);
            setGithub(users.github);
            setBio(users.bio);
        }
    }, [updatedProfile])

    const handileReset = () => {
        setUserUpdate({
            username: "", password: "", cPassword: "",
            profile: "", banner: "", bio: "",
            insta: "", github: "", twitterx: "", linkedin: ""
        })
        setBannerPreview("")
        setProfilePreview("")
    }

    // banner
    const updatebanner = (e) => {
        setUserUpdate({ ...userUpdate, banner: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setBannerPreview(url)
    }

    // profile
    const updateProfile = (e) => {
        setUserUpdate({ ...userUpdate, profile: e.target.files[0] })
        const url = URL.createObjectURL(e.target.files[0])
        setProfilePreview(url)
    }

    // profile update
    const handileUpdate = async () => {
        const { username, password, cPassword, profile, banner, bio } = userUpdate

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
                if ((key === "profile" || key === "banner") && !userUpdate[key]) {
                    continue;
                }
                reqBody.append(key, userUpdate[key])
            }

            try {
                const result = await userProfileEditAPI(reqBody, reqHeader)
                if (result.status == 200) {
                    toast.success("Profile Update SucessFully")
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
            <div className="md:grid grid-cols-5 bg-green-50 min-h-screen">

                {/* SIDEBAR */}
                <div className="col-span-1 shadow-lg relative z-10 bg-white">
                    <UserSidebar />
                </div>

                {/* MAIN CONTENT */}
                <div className="col-span-4 p-5 md:p-10">

                    <div className="grid md:grid-cols-2 gap-10 items-start">

                        {/* ---------------- LEFT PREVIEW CARD ---------------- */}
                        <div>
                            <div className="max-w-sm mx-auto rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300">

                                <div className="relative h-32 w-full">
                                    <img
                                        src={
                                            banner == ""
                                                ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                                                : `${BASEURL}/uploads/${banner}`
                                        }
                                        className="w-full h-32 object-cover"
                                        alt="banner"
                                    />

                                    <img
                                        src={
                                            profile == ""
                                                ? "https://i.pravatar.cc/150"
                                                : `${BASEURL}/uploads/${profile}`
                                        }
                                        className="w-28 h-28 rounded-full border-4 border-white absolute left-1/2 -translate-x-1/2 top-16 object-cover"
                                        alt="profile"
                                    />
                                </div>

                                <div className="pt-16 pb-6 px-6 text-center">
                                    <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
                                    <p className="text-gray-500 text-sm mb-3">{usermail}</p>

                                    <p className="text-gray-700 text-sm mb-4">{bio}</p>

                                    {/* social icons */}
                                    <div className="flex justify-center space-x-5">
                                        <a href={twitterx || "#"} className="text-sky-500 hover:scale-110"><FontAwesomeIcon icon={faTwitter} /></a>
                                        <a href={insta || "#"} className="text-pink-600 hover:scale-110"><FontAwesomeIcon icon={faInstagram} /></a>
                                        <a href={linkedin || "#"} className="text-blue-700 hover:scale-110"><FontAwesomeIcon icon={faLinkedin} /></a>
                                        <a href={github || "#"} className="text-gray-800 hover:scale-110"><FontAwesomeIcon icon={faGithub} /></a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* ---------------- RIGHT EDIT FORM ---------------- */}
                        <div className="w-full bg-white rounded-2xl shadow-xl p-6">

                            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center ">Edit Profile</h2>

                            <form className="space-y-5">

                                {/* BANNER UPLOAD */}
                                <div className="relative h-40 w-full rounded-xl overflow-hidden">
                                    <img
                                        src={ existingBanner ? bannerPreview || `${BASEURL}/uploads/${existingBanner}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"}
                                        className="w-full h-full object-cover"
                                    />
                                    <input type="file" id="bannerUpload" onChange={e => updatebanner(e)} className="hidden" />

                                    <label
                                        htmlFor="bannerUpload"
                                        className="absolute bottom-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-700 cursor-pointer shadow-md"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </label>
                                </div>

                                {/* PROFILE UPLOAD */}
                                <div className="relative w-28 h-28 mx-auto -mt-10">
                                    <img
                                     src={ existingProfile ? profilePreview || `${BASEURL}/uploads/${existingProfile}` : "https://https://i.pravatar.cc/150"}
                                    
                                        className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                                    />
                                    <input onChange={(e) => updateProfile(e)} type="file" id="profileUpload" className="hidden" />
                                    <label
                                        htmlFor="profileUpload"
                                        className="absolute bottom-0 right-0 bg-white/80 p-2 rounded-full shadow cursor-pointer hover:bg-white"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </label>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="font-semibold">Username</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                        value={userUpdate.username}
                                        onChange={e => setUserUpdate({ ...userUpdate, username: e.target.value })}
                                    />
                                </div>

                                {/* PASSWORD + CPASSWORD */}
                                <div className="flex gap-3">
                                    <div className="w-1/2">
                                        <label className="font-semibold">Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                            value={userUpdate.password}
                                            onChange={e => setUserUpdate({ ...userUpdate, password: e.target.value })}
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <label className="font-semibold">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                                            value={userUpdate.cPassword}
                                            onChange={e => setUserUpdate({ ...userUpdate, cPassword: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* BIO */}
                                <div>
                                    <label className="font-semibold">Bio</label>
                                    <textarea
                                        className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-green-500"
                                        rows="3"
                                        value={userUpdate.bio}
                                        onChange={e => setUserUpdate({ ...userUpdate, bio: e.target.value })}
                                    ></textarea>
                                </div>

                                {/* SOCIAL LINKS */}
                                <div>
                                    <label className="font-semibold">Social Media</label>

                                    <div className="space-y-3 mt-2">

                                        <div className="flex gap-3">
                                            {/* GITHUB */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <FontAwesomeIcon icon={faGithub} />
                                                <input 
                                                placeholder='Github Link'
                                                    type="text"
                                                    className="w-full p-2 border rounded-lg"
                                                    value={userUpdate.github}
                                                    onChange={e => setUserUpdate({ ...userUpdate, github: e.target.value })}
                                                />
                                            </div>

                                            {/* TWITTER */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <FontAwesomeIcon icon={faTwitter} className="text-sky-500" />
                                                <input
                                                    placeholder='TwitterX Link'
                                                    type="text"
                                                    className="w-full p-2 border rounded-lg"
                                                    value={userUpdate.twitterx}
                                                    onChange={e => setUserUpdate({ ...userUpdate, twitterx: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">

                                            {/* INSTAGRAM */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <FontAwesomeIcon icon={faInstagram} className="text-pink-600" />
                                                <input
                                                    placeholder='Instagram Link'
                                                    type="text"
                                                    className="w-full p-2 border rounded-lg"
                                                    value={userUpdate.insta}
                                                    onChange={e => setUserUpdate({ ...userUpdate, insta: e.target.value })}
                                                />
                                            </div>

                                            {/* LINKEDIN */}
                                            <div className="flex items-center gap-3 flex-1">
                                                <FontAwesomeIcon icon={faLinkedin} className="text-blue-700" />
                                                <input
                                                    placeholder='LinkedIn Link'
                                                    type="text"
                                                    className="w-full p-2 border rounded-lg"
                                                    value={userUpdate.linkedin}
                                                    onChange={e => setUserUpdate({ ...userUpdate, linkedin: e.target.value })}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* SUBMIT */}
                                <button
                                    type="button"
                                    onClick={handileUpdate}
                                    className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-black hover:text-green-400 transition border-2 border-transparent hover:border-green-400"
                                >
                                    Save Changes
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
        </>
    )
}

export default ProfileEdit
