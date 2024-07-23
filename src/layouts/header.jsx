import React, { useState, useEffect } from "react";
import logo from "../assets/braude_logo.png";
import { IonIcon } from "@ionic/react";
import {
  menuOutline,
  closeOutline,
  moonOutline,
  sunnyOutline,
} from "ionicons/icons";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const onToggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 mr-2"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <IonIcon
              icon={isMenuOpen ? closeOutline : menuOutline}
              style={{ fontSize: "24px" }}
            />
          </button>
          <img
            className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 mr-3"
            src={logo}
            alt="logo"
          />
          <span className="self-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold whitespace-nowrap dark:text-white">
            Braude Analyzer
          </span>
        </div>
        <div className="flex items-center md:order-2">
          <button
            onClick={onToggleDarkMode}
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 me-2"
            aria-label="Toggle dark mode"
          >
            <IonIcon
              icon={isDarkMode ? sunnyOutline : moonOutline}
              className="text-3xl"
              style={{ fontSize: "24px" }}
            />
          </button>
          <div
            className={`z-50 ${
              isUserDropdownOpen ? "block" : "hidden"
            } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-14`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="mobile-menu"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  location.pathname === "/home"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/uploadFile"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  location.pathname === "/uploadFile"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Upload File
              </Link>
            </li>
            <li>
              <Link
                to="/columnSelector"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  location.pathname === "/columnSelector"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Column Selector
              </Link>
            </li>
            <li>
              <Link
                to="/comparision"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  location.pathname === "/comparision"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Comparision
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  location.pathname === "/about"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                  location.pathname === "/contact"
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}