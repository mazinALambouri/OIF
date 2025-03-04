import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Oman.png';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSubmenu = (e) => {
    e.preventDefault();
    setIsMobileSubmenuOpen(!isMobileSubmenuOpen);
  };

  return (
    <nav className="fixed z-50 w-full bg-white/55 backdrop-blur-xl shadow-sm">
      <div className="px-6 mx-auto max-w-6xl">
        <div className="flex items-center justify-between py-2 sm:py-4">
          {/* Left side: Logo and desktop links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="scroll-smooth" aria-label="Logo">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
          </div>
          
          {/* Right side: Navigation links and mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* Desktop nav links */}
            <ul className="hidden lg:flex space-x-4">
              <li>
                <Link to="/" className="nav-link transition-colors duration-300 hover:text-blue-600">
                  HOME
                </Link>
              </li>
              <li className="relative group">
                <div className="flex items-center">
                  <Link to="/about" className="nav-link transition-colors duration-300 hover:text-blue-600">
                    ABOUT
                  </Link>
                  <div className="relative group/arrow ml-1">
                    <svg className="w-4 h-4 cursor-pointer hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/arrow:opacity-100 group-hover/arrow:visible transition-all duration-300 z-50">
                      <Link to="/schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Schedule</Link>
                      <Link to="/speakers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Speakers</Link>
                      <Link to="/sponsors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Sponsors</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/why-oman" className="nav-link transition-colors duration-300 hover:text-blue-600">
                  WHY OMAN
                </Link>
              </li>
            </ul>
            
            {/* Mobile menu toggle */}
            <button 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu" 
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : ''}`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`lg:hidden bg-white shadow-md ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <Link to="/" className="nav-link block transition-colors duration-300 hover:text-blue-600">
              HOME
            </Link>
          </li>
          <li className="space-y-2">
            <a href="#about" onClick={toggleMobileSubmenu} className="nav-link w-full flex items-center justify-between transition-colors duration-300 hover:text-blue-600">
              ABOUT
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <div className={`pl-4 space-y-2 ${isMobileSubmenuOpen ? '' : 'hidden'}`}>
              <Link to="/schedule" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Schedule</Link>
              <Link to="/speakers" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Speakers</Link>
              <Link to="/sponsors" className="block py-2 text-sm text-gray-700 hover:text-blue-600">Sponsors</Link>
            </div>
          </li>
          <li>
            <Link to="/why-oman" className="nav-link block transition-colors duration-300 hover:text-blue-600">
              WHY OMAN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 