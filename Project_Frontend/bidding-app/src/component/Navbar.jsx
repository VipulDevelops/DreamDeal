import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SignUp from "../page/SignUp";

export default function TempNavbar(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loginData = props.loginData;
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  function handleClick() {
    alert("Hello");
  }

  return (
    <>
      {/* component */}
      <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          {/* Logo */}
          <motion.div
            className="text-indigo-500 md:order-1"
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Heroicon - Chip Outline */}
            <a href="/dashBoard">
              {!loginData && <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
                }
            </a>
          </motion.div>
          {!loginData && <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <motion.ul
              className="flex font-semibold justify-between"
              whileHover={{ scale: 1.1 }}
            >
              {/* Nav links */}
              <Link to="/" className="md:px-4 md:py-2 focus:text-indigo-500">
                Home
              </Link>
             
              <Link
                to="/about"
                className=" focus:text-indigo-500 md:px-4 md:py-2 hover:text-indigo-400"
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className=" focus:text-indigo-500 md:px-4 md:py-2 hover:text-indigo-400"
              >
                Contact Us
              </Link>
              <Link
                to="/products"
                className=" focus:text-indigo-500 md:px-4 md:py-2 hover:text-indigo-400"
              >
                ProductList
              </Link>

              {/* User avatar */}
            </motion.ul>
          </div>}

          {loginData &&<div className="order-2 md:order-3">
            <Link to="/signup">
              <motion.button
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
                initial={{ x: 325 }}
                animate={{ x: 50 }}
                transition={{ delay: 0.5 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sign up</span>
              </motion.button>
            </Link>
          </div>
          }
        </div> 
      </nav>
    </>
  );
}
