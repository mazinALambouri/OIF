import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo3.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#B1DCD5] to-[#0AB0CE] bg-[length:200%_200%] bg-[position:0%_0%] text-gray-800 py-16 px-6 md:px-16 lg:px-32" style={{ backgroundImage: 'linear-gradient(5deg, #0AB0CE, #B1DCD5)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <img 
            src={logo}
            alt="Invest Oman Logo" 
            className="w-96 md:w-[500px] lg:w-[600px] object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Social Media */}
        <div className="flex justify-center space-x-6 mb-12">
          <a href="https://twitter.com/investinom" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black transition-colors duration-300">
            <i className="fab fa-x-twitter text-2xl"></i>
          </a>
          <a href="https://www.instagram.com/investinom" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#E4405F] transition-colors duration-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="https://om.linkedin.com/company/investinom" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#0A66C2] transition-colors duration-300">
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a href="https://www.youtube.com/@invest-oman" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#FF0000] transition-colors duration-300">
            <i className="fab fa-youtube text-2xl"></i>
          </a>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-[#3CC4DD]/20 pt-8 text-sm">
          <div className="flex flex-col justify-center items-center">
            <p className="text-black mb-4">&copy; 2025 Invest Oman, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 