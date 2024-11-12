import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, handleSignIn, handleSignOut } = useContext(UserContext);

  return (
    <nav className={`flex flex-wrap items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-200'}`}>
      <Link to="/" className="flex items-center">
        <h1 className={`text-xl sm:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Trendify
        </h1>
        <span className={`hidden sm:inline ml-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          - Daily Tech & AI News Platform
        </span>
      </Link>

      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <Link to="/subscription">
          <button className={`bg-green-500 text-white px-3 py-2 rounded-lg text-sm sm:text-lg`}>
            {user && user.isSubscribed ? "You are Subscribed" : "Subscribe"}
          </button>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm sm:text-base">{user.displayName}</span>
            <button
              onClick={handleSignOut}
              className={`bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-lg`}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className={`bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-lg`}
          >
            Sign In
          </button>
        )}

        <button
          id="theme-toggle"
          type="button"
          onClick={toggleDarkMode}
          className={`text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-2.5`}
        >
          <svg
            id="theme-toggle-dark-icon"
            className={`w-5 h-5 ${darkMode ? 'block' : 'hidden'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            className={`w-5 h-5 ${darkMode ? 'hidden' : 'block'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
