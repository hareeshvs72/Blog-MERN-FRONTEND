import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { updateAdminProfile } from '../../service/allAPI';
import BASEURL from '../../service/serverURL';
import { adminUpdateContext } from '../../context/ResponseContextApi';

function AdminSettings() {
  const [preview, setPreview] = useState("");
  const [existingProfile, setExistingProfile] = useState("");
  const { adminEditresponse, setAdmineditResponse } = useContext(adminUpdateContext);
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

  const handleReset = () => {
    setAdminDetails({ username: "", password: "", cPassword: "", profile: "" });
    setPreview("");
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminDetails({ ...adminDetails, profile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

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

    if (preview) reqBody.append("profile", profile);
    else reqBody.append("profile", existingProfile);

    try {
      const result = await updateAdminProfile(reqBody, reqHeader);
      if (result.status === 200) {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem("users", JSON.stringify(result.data));
        setAdmineditResponse(result.data);
        handleReset();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
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

        <div className="col-span-4 flex items-center justify-center bg-green-100 min-h-screen p-5 md:p-10">
          <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 md:p-10">

            <h1 className="text-center text-4xl font-bold text-green-600 mb-10">
              Admin Settings
            </h1>

            <div className="md:flex gap-10">

              {/* Left Section */}
              <div className="md:w-1/2 text-gray-700">
                <h2 className="text-xl font-semibold mb-3 text-green-700">About Admin Panel</h2>
                <p className="text-justify leading-relaxed">
                  The Admin Settings allows administrators to manage platform preferences,
                  profile details, and system-level configurations. This central panel
                  keeps your dashboard organized, secure, and fully customizable.
                </p>

                <p className="mt-4 text-justify leading-relaxed">
                  Modify your profile, update your login details, and maintain control
                  of your dashboard seamlessly using the secure admin interface.
                </p>
              </div>

              {/* Right Section — Form */}
              <div className="md:w-1/2 bg-green-800 text-white rounded-2xl p-6 shadow-lg">

                {/* Profile Photo */}
                <div className="relative flex justify-center mb-6">
                  <label htmlFor="adminpic" className="cursor-pointer relative">
                    <img
                    src={existingProfile ? preview || `${BASEURL}/uploads/${existingProfile}` : "https://tse1.mm.bing.net/th/id/OIP.w-f-qDRUjGt9e_SuPTcfcgHaHw?pid=Api&P=0&h=180" }
                    
                      alt="admin"
                      className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      className="absolute bottom-1 right-1 bg-yellow-400 text-white p-2 rounded-full text-sm shadow"
                    />
                  </label>
                  <input type="file" onChange={handleUploadImage} id="adminpic" className="hidden" />
                </div>

                {/* Form */}
                <form className="space-y-4">
                  <input
                    value={adminDetails.username}
                    onChange={(e) =>
                      setAdminDetails({ ...adminDetails, username: e.target.value })
                    }
                    type="text"
                    placeholder="Username"
                    className="w-full px-3 py-2 rounded bg-white text-black"
                  />
                  <input
                    value={adminDetails.password}
                    onChange={(e) =>
                      setAdminDetails({ ...adminDetails, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 rounded bg-white text-black"
                  />
                  <input
                    value={adminDetails.cPassword}
                    onChange={(e) =>
                      setAdminDetails({ ...adminDetails, cPassword: e.target.value })
                    }
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 rounded bg-white text-black"
                  />
                </form>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-yellow-400 text-white font-bold rounded-lg shadow hover:bg-yellow-500"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700"
                  >
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
