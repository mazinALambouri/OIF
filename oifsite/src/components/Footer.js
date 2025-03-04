import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo3.png';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Logo & Ministry */}
        <div className="mb-12 flex justify-center">
          <img 
            src={logo}
            alt="Invest Oman Logo" 
            className="w-96 md:w-[500px] lg:w-[600px] object-contain hover:scale-105 transition-transform duration-300 filter brightness-0 invert"
          />
        </div>
        {/* Links section */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 border-t border-[#3CC4DD]/20 pt-12">
          {/* Start Investing */}
          <div>
            <h4 className="font-bold mb-4 text-[#3CC4DD]">Start Investing</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a onClick={() => scrollToSection('investments')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">Investments</a></li>
              <li><a onClick={() => scrollToSection('opportunities')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">Opportunities</a></li>
              <li><a onClick={() => scrollToSection('sectors')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">Sectors</a></li>
            </ul>
          </div>
          {/* Resources & Tools */}
          <div>
            <h4 className="font-bold mb-4 text-[#3CC4DD]">Resources</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a onClick={() => scrollToSection('investor-guide')} className="hover:text-[#492E8B] transition-colors duration-300 cursor-pointer">Investor Guide</a></li>
              <li><a onClick={() => scrollToSection('business-simulator')} className="hover:text-[#492E8B] transition-colors duration-300 cursor-pointer">Business Simulator</a></li>
              <li><a onClick={() => scrollToSection('licenses')} className="hover:text-[#492E8B] transition-colors duration-300 cursor-pointer">Licenses</a></li>
            </ul>
          </div>
          {/* Discover */}
          <div>
            <h4 className="font-bold mb-4 text-[#3CC4DD]">Discover</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a onClick={() => scrollToSection('why-oman')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">Why Oman?</a></li>
              <li><a onClick={() => scrollToSection('incentives')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">Incentives</a></li>
              <li><a onClick={() => scrollToSection('reports')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">Reports & Publications</a></li>
              <li><a onClick={() => scrollToSection('news')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">News</a></li>
            </ul>
          </div>
          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-4 text-[#3CC4DD]">Connect</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a onClick={() => scrollToSection('business-platform')} className="hover:text-[#492E8B] transition-colors duration-300 cursor-pointer">Business Platform</a></li>
              <li><a onClick={() => scrollToSection('industrial-zones')} className="hover:text-[#492E8B] transition-colors duration-300 cursor-pointer">Industrial Zones</a></li>
              <li><a onClick={() => scrollToSection('free-zones')} className="hover:text-[#492E8B] transition-colors duration-300 cursor-pointer">Free Zones</a></li>
            </ul>
          </div>
          {/* About & Social */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-4 text-[#3CC4DD]">About</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a onClick={() => scrollToSection('about')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">About Us</a></li>
              <li><a onClick={() => scrollToSection('help')} className="hover:text-[#3CC4DD] transition-colors duration-300 cursor-pointer">How Can We Help?</a></li>
            </ul>
            {/* Social Media */}
            <h4 className="font-bold mb-4 mt-8 text-[#3CC4DD]">Follow Us</h4>
            <div className="flex space-x-6">
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
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-12 border-t border-[#3CC4DD]/20 pt-8 text-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[#3CC4DD] mb-4 sm:mb-0">&copy; 2025 Invest Oman, All Rights Reserved</p>
            <div className="flex items-center space-x-6">
              <Link to="/whistleblowing" className="text-[#3CC4DD] hover:text-[#3CC4DD] transition-colors duration-300">Whistleblowing Policy</Link>
              <span className="text-[#3CC4DD]/50">|</span>
              <Link to="/terms" className="text-[#3CC4DD] hover:text-[#3CC4DD] transition-colors duration-300">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 