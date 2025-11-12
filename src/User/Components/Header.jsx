import {faFacebook,faInstagram,faXTwitter,} from "@fortawesome/free-brands-svg-icons";
import { faUser, faAddressCard,faHome,faPowerOff, faBars,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASEURL from "../../service/serverURL";

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [token, setToken] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [userDp, setUserDp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const user = JSON.parse(sessionStorage.getItem("users"));
      setUserDp(user?.profile || "");
    }
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setToken("");
    setDropDown(false);
    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="shadow-sm relative z-50"
    >
      {/* Top Bar - Social Links */}
      <div className="w-full py-1 md:px-10 px-4 flex justify-end text-green-400 items-center bg-black/90">
        <a
          href="#"
          aria-label="Facebook"
          className="mx-2 text-xl hover:text-green-300 transition-colors"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="mx-2 text-xl hover:text-green-300 transition-colors"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="#"
          aria-label="Twitter X"
          className="mx-2 text-xl hover:text-green-300 transition-colors"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
      </div>

      {/* Main Header */}
      <div className="bg-green-400 flex justify-between items-center px-4 md:px-10 py-2 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Future Talks Logo"
            className="w-20 h-14 object-contain"
          />
          <span className="font-extrabold text-xl hidden sm:block">
            Future Talks
          </span>
        </Link>

        {/* Navbar toggle button (mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setNavOpen(!navOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Navbar Links */}
        <nav
          className={`${
            navOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-black text-green-400 py-4 items-center space-y-2"
              : "hidden md:flex md:flex-row md:items-center md:space-x-6"
          } transition-all duration-300`}
        >
          <Link
            to="/"
            onClick={() => setNavOpen(false)}
            className="font-bold hover:bg-black hover:text-green-400 px-4 py-2 rounded-full transition-all"
          >
            Home
          </Link>
          <Link
            to="/blog"
            onClick={() => setNavOpen(false)}
            className="font-bold hover:bg-black hover:text-green-400 px-4 py-2 rounded-full transition-all"
          >
            Blog
          </Link>
          <Link
            to="/aboutus"
            onClick={() => setNavOpen(false)}
            className="font-bold hover:bg-black hover:text-green-400 px-4 py-2 rounded-full transition-all"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setNavOpen(false)}
            className="font-bold hover:bg-black hover:text-green-400 px-4 py-2 rounded-full transition-all"
          >
            Contact
          </Link>
        </nav>

        {/* Login / User Profile */}
        <div className="hidden md:flex items-center">
          {!token ? (
            <Link
              to="/login"
              className="bg-black text-green-400 font-semibold px-4 py-2 rounded-lg border-2 border-transparent hover:bg-green-400 hover:text-black hover:border-black transition-all"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={
                  userDp === ""
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
                    : userDp.startsWith("https://lh3.googleusercontent.com/")
                    ? userDp
                    : `${BASEURL}/uploads/${userDp}`
                }
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-black cursor-pointer hover:scale-105 transition-all"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg ring-1 ring-black/10 py-2 z-50">
                  <Link
                    to="/profilecard"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-100"
                    onClick={() => setDropDown(false)}
                  >
                    <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/create"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-100"
                    onClick={() => setDropDown(false)}
                  >
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-100"
                  >
                    <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
