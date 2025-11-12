import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { updateAdminProfile } from '../../service/allAPI';
import BASEURL from '../../service/serverURL';
import { useContext } from 'react';
import { adminUpdateContext } from '../../context/ResponseContextApi';


function AdminSettings() {
  const [preview, setPreview] = useState("");
  const [existingProfile, setExistingProfile] = useState("");
  const {adminEditresponse,setAdmineditResponse} = useContext(adminUpdateContext)
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
  });

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("users"));
    if (userData) {
      setExistingProfile(userData.profile);
      setAdminDetails({ ...adminDetails, username: userData.username });
    }
  }, [adminEditresponse]);

  // Reset form
  const handleReset = () => {
    setAdminDetails({ username: "", password: "", cPassword: "", profile: "" });
    setPreview("");
  };

  // Upload preview
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminDetails({ ...adminDetails, profile: file });
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  // Update profile
  const handleUpdate = async () => {
    const { username, password, cPassword, profile } = adminDetails;

    if (!username || !password || !cPassword) {
      toast.info("Please fill all required fields!");
      return;
    }

    if (password !== cPassword) {
      toast.warning("Passwords do not match!");
      handleReset();
      return;
    }

    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("password", password);
    reqBody.append("bio", "");
    reqBody.append("role", "admin");

    if (preview) {
      reqBody.append("profile", profile);
    } else {
      reqBody.append("profile", existingProfile);
    }

    try {
      const result = await updateAdminProfile(reqBody, reqHeader);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem("users", JSON.stringify(result.data));
        setAdmineditResponse(result.data)
        handleReset();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-5">
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        <div className="col-span-4 md:px-20 flex items-center justify-center bg-green-100 min-h-screen">
          <div className="md:mx-10 md:mt-10">
            <h1 className='text-4xl text-green-500 mb-10 font-semibold text-center'>
              Admin Settings
            </h1>

            <div className='flex md:flex-row flex-col p-3 gap-10'>
              
              <div className='text-justify'>
                <p>
                 The Admin Settings section is the central hub of control and configuration for the entire blogging platform. It empowers administrators with complete oversight of user activity, blog management, content moderation, and system-level preferences. Acting as the digital command center, it ensures that the platform operates smoothly, securely, and efficiently. Through Admin Settings, authorized personnel can fine-tune the user experience, enforce content quality standards, and maintain the integrity of the blogging environment.
                </p>
                 <p className='my-3'>
                At its core, the Admin Settings module provides an intuitive interface that allows administrators to access all key management tools in one place. It eliminates the need for manual database modifications or code-level changes by offering a structured dashboard for performing critical actions such as approving blog submissions, managing user permissions, and updating website configurations. The main goal is to simplify administrative workflows and improve platform governance while maintaining flexibility and transparency.
                </p>
              </div>

              {/* update form */}
              <div className='bg-green-800 md:px-10 md:py-5 p-3 rounded'>
                <div className='flex items-center relative flex-col'>
                  <label htmlFor="adminpic">
                    <img
                      className='border rounded-full'
                      src={
                        preview
                          ? preview
                          : existingProfile
                            ? `${BASEURL}/uploads/${existingProfile}`
                            : "https://tse1.mm.bing.net/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?pid=Api&P=0&h=180"
                      }
                      alt='admin'
                      style={{ width: '100px', height: '100px' }}
                    />
                    <FontAwesomeIcon icon={faPen} className='bg-yellow-400 p-1 text-white rounded absolute bottom-0 right-30 md:right-19' />
                  </label>
                  <input type="file" onChange={handleUploadImage} id='adminpic' className='hidden' />
                </div>

                <form className='my-3'>
                  <input
                    value={adminDetails.username}
                    onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })}
                    type="text"
                    placeholder='Username'
                    className='px-3 py-2 my-2 w-full bg-white rounded'
                  />
                  <input
                    value={adminDetails.password}
                    onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                    type="password"
                    placeholder='Password'
                    className='px-3 py-2 my-2 w-full bg-white rounded'
                  />
                  <input
                    value={adminDetails.cPassword}
                    onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })}
                    type="password"
                    placeholder='Confirm Password'
                    className='px-3 py-2 my-2 w-full bg-white rounded'
                  />
                </form>

                <div className='flex justify-between my-5'>
                  <button onClick={handleReset} className='px-8 mx-2 py-2 bg-yellow-400 text-white rounded'>
                    Reset
                  </button>
                  <button onClick={handleUpdate} className='px-8 py-2 bg-green-600 text-white rounded'>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default AdminSettings;
