import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import { LoginLogo } from "../heroicons.jsx/icons";
const Navbar = () => {
const { loginWithRedirect, logout , isAuthenticated, isLoading , user } = useAuth0();

console.log("user", user);
  return (
    <>
    <div className=" bg-red-500">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-10 h-10 text-white p-2 bg-red-500 rounded-full flex items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
            <Link to={"/"}>
            <span className="ml-3 text-xl text-white">CrezTracking.com</span>
            </Link>
            
          </div>
          
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            
            <Link to={"trending"}>
            <p className="mr-5 hover:text-gray-900 text-white inline-flex items-center" >
              Trending
            </p>
            </Link>
            <Link to={"contact"}>
            <p className="mr-5 hover:text-gray-900 text-white inline-flex items-center" >
              Contact
            </p>
            </Link>
            
          </nav>
          {isLoading ? (
  <p>Loading...</p>
) : isAuthenticated ? (
  <button
    onClick={logout}
    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
  >
    Logout
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="w-4 h-4 ml-1"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </button>
) : (
  <button
    onClick={loginWithRedirect}
    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
  >
    LOGİN
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="w-4 h-4 ml-1"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </button>
)}
{isLoading ? (
  <p>Login...</p>
) : isAuthenticated ? (
  <Link to="/profile">
    <LoginLogo  />
  </Link>
) : null}
        </div>
      </header>
    </div>
    </>
  );
};

export default Navbar;
