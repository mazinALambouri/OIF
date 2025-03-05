import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo3.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <img 
            src={logo}
            alt="Invest Oman Logo" 
            className="w-96 md:w-[500px] lg:w-[600px] object-contain hover:scale-105 transition-transform duration-300 filter brightness-0 invert"
          />
        </div>
        
        {/* Social Media */}
        <div className="flex justify-center space-x-6 mb-12">
          <a href="#" className="text-gray-400 hover:text-[#3CC4DD] transition-colors duration-300">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#492E8B] transition-colors duration-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#3CC4DD] transition-colors duration-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#492E8B] transition-colors duration-300">
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#3CC4DD] transition-colors duration-300">
            <i className="fab fa-youtube text-2xl"></i>
          </a>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-[#3CC4DD]/20 pt-8 text-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[#ffffff] mb-4 sm:mb-0">&copy; 2025 Invest Oman, All Rights Reserved</p>
            <div className="flex items-center space-x-6">
              <Link to="/whistleblowing" className="text-[#ffffff] hover:text-[#3CC4DD] transition-colors duration-300">Whistleblowing Policy</Link>
              <span className="text-[#3CC4DD]/50">|</span>
              <Link to="/terms" className="text-[#ffffff] hover:text-[#3CC4DD] transition-colors duration-300">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 