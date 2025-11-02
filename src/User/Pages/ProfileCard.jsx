import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../service/serverURL";



function ProfileCard() {
    const navigate = useNavigate('')
    const [token, setToken] = useState("")
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
            setToken(sessionStorage.getItem("token"))
            const users = JSON.parse(sessionStorage.getItem("users"))


            // user details
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
    }, [token])
    console.log(banner);

    return (
        <div className=" h-32 w-full  bg-[url('https://i.pinimg.com/originals/02/87/d3/0287d3ba8b3330fca99f69e2001d3168.gif')] bg-cover bg-center w-full h-screen flex items-center justify-center flex-col md:px-0 px-3">
            <div className="max-w-sm mx-auto  rounded-2xl shadow-xl bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative">
                {/* Banner Section */}
                <div className="relative h-32 w-full">
                    <img
                        src={banner ? `${BASEURL}/uploads/${banner}` : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"}
                        alt="Banner"
                        className="w-full h-32 object-cover"
                    />

                    {/* Edit Icon on Banner */}
                    <button
                        onClick={() => navigate('/profile-edit')}
                        className="absolute cursor-pointer bottom-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 hover:text-black rounded-full p-2 shadow-md transition"
                        title="Edit Profile Banner"
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>

                    {/* Profile Image */}
                    <img
                        src={profile ? `${BASEURL}/uploads/${profile}` : "https://i.pravatar.cc/150?img=3"}
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
             <button onClick={() => navigate('/')} className="w-[380px] rounded-2xl my-3 py-3 bg-blue-600 font-bold hover:bg-black hover:text-blue-600 cursor-pointer">Go Back</button>
        </div>
    );
}

export default ProfileCard
