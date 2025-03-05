import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/Oman.png';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSubmenu = (e) => {
    e.preventDefault();
    setIsMobileSubmenuOpen(!isMobileSubmenuOpen);
  };

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    // Close mobile menu if it's open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Listen for scroll events to update active section based on viewport
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'schedule', 'speakers', 'sponsors'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the viewport (with some buffer for better UX)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isAttendancePage = location.pathname.startsWith('/attendance');

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
                <Link 
                  to="/"
                  className={`nav-link transition-colors duration-300 hover:text-blue-600 ${location.pathname === '/' ? 'text-blue-600 font-bold' : ''}`}
                >
                  HOME
                </Link>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection('about', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-blue-600 ${activeSection === 'about' ? 'text-blue-600 font-bold' : ''}`}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a 
                  href="#schedule" 
                  onClick={(e) => scrollToSection('schedule', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-blue-600 ${activeSection === 'schedule' ? 'text-blue-600 font-bold' : ''}`}
                >
                  SCHEDULE
                </a>
              </li>
              <li>
                <a 
                  href="#speakers" 
                  onClick={(e) => scrollToSection('speakers', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-blue-600 ${activeSection === 'speakers' ? 'text-blue-600 font-bold' : ''}`}
                >
                  SPEAKERS
                </a>
              </li>
              <li>
                <a 
                  href="#sponsors" 
                  onClick={(e) => scrollToSection('sponsors', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-blue-600 ${activeSection === 'sponsors' ? 'text-blue-600 font-bold' : ''}`}
                >
                  SPONSORS
                </a>
              </li>
              <li className="relative group">
                <button
                  className={`nav-link transition-colors duration-300 hover:text-blue-600 ${isAttendancePage ? 'text-blue-600 font-bold' : ''}`}
                >
                  ATTENDANCE
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link
                    to="/attendance"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Attendance
                  </Link>
                  <Link
                    to="/attendance/records"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Records
                  </Link>
                  <Link
                    to="/attendance/scan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Scan QR
                  </Link>
                </div>
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
            <Link 
              to="/"
              className={`nav-link block transition-colors duration-300 hover:text-blue-600 ${location.pathname === '/' ? 'text-blue-600 font-bold' : ''}`}
            >
              HOME
            </Link>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection('about', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-blue-600 ${activeSection === 'about' ? 'text-blue-600 font-bold' : ''}`}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a 
              href="#schedule" 
              onClick={(e) => scrollToSection('schedule', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-blue-600 ${activeSection === 'schedule' ? 'text-blue-600 font-bold' : ''}`}
            >
              SCHEDULE
            </a>
          </li>
          <li>
            <a 
              href="#speakers" 
              onClick={(e) => scrollToSection('speakers', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-blue-600 ${activeSection === 'speakers' ? 'text-blue-600 font-bold' : ''}`}
            >
              SPEAKERS
            </a>
          </li>
          <li>
            <a 
              href="#sponsors" 
              onClick={(e) => scrollToSection('sponsors', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-blue-600 ${activeSection === 'sponsors' ? 'text-blue-600 font-bold' : ''}`}
            >
              SPONSORS
            </a>
          </li>
          <li>
            <button
              onClick={toggleMobileSubmenu}
              className={`nav-link block w-full text-left transition-colors duration-300 hover:text-blue-600 ${isAttendancePage ? 'text-blue-600 font-bold' : ''}`}
            >
              ATTENDANCE
            </button>
            <div className={`pl-4 mt-2 space-y-2 ${isMobileSubmenuOpen ? 'block' : 'hidden'}`}>
              <Link
                to="/attendance"
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Attendance
              </Link>
              <Link
                to="/attendance/records"
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Records
              </Link>
              <Link
                to="/attendance/scan"
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Scan QR
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 