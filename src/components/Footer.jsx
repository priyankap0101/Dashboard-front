// src/components/Footer.jsx
import React from "react";
import { FaShieldAlt, FaFileContract, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container flex flex-col items-center justify-center px-4 mx-auto">
        <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-200">
          &copy; {new Date().getFullYear()} Made With By 💌
        </p>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
          <a 
            href="#" 
            className="flex items-center transition text-violet-400 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400"
          >
            <FaShieldAlt className="mr-1" />
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="flex items-center transition text-violet-400 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400"
          >
            <FaFileContract className="mr-1" />
            Terms of Service
          </a>
          <a 
            href="mailto:contact@yourcompany.com" 
            className="flex items-center transition text-violet-400 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400"
          >
            <FaEnvelope className="mr-1" />
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
