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

  return (
    <nav className="fixed z-50 w-full bg-white/55 backdrop-blur-xl shadow-sm">
      <div className="px-6 mx-auto max-w-6xl">
        <div className="flex items-center justify-between py-2 sm:py-4">
          {/* Left side: Logo */}
          <div className="flex-shrink-0 pl-2">
            <Link to="/" className="scroll-smooth" aria-label="Logo">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
          </div>
          
          {/* Center: Navigation links */}
          <div className="flex-grow flex justify-center">
            {/* Desktop nav links */}
            <ul className="hidden lg:flex space-x-8">
              <li>
                {location.pathname === "/" ? (
                  <a 
                    href="#home" 
                    onClick={(e) => scrollToSection('home', e)} 
                    className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'home' ? 'text-primary font-bold' : ''}`}
                  >
                    HOME
                  </a>
                ) : (
                  <Link 
                    to="/"
                    className="nav-link transition-colors duration-300 hover:text-primary"
                  >
                    HOME
                  </Link>
                )}
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection('about', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'about' ? 'text-primary font-bold' : ''}`}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a 
                  href="#schedule" 
                  onClick={(e) => scrollToSection('schedule', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'schedule' ? 'text-primary font-bold' : ''}`}
                >
                  SCHEDULE
                </a>
              </li>
              <li>
                <a 
                  href="#speakers" 
                  onClick={(e) => scrollToSection('speakers', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'speakers' ? 'text-primary font-bold' : ''}`}
                >
                  SPEAKERS
                </a>
              </li>
              <li>
                <a 
                  href="#sponsors" 
                  onClick={(e) => scrollToSection('sponsors', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'sponsors' ? 'text-primary font-bold' : ''}`}
                >
                  SPONSORS
                </a>
              </li>
            </ul>
          </div>
          
          {/* Right side: Mobile menu button */}
          <div className="flex-shrink-0">
            {/* Mobile menu toggle */}
            <button 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu" 
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
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
            {location.pathname === "/" ? (
              <a 
                href="#home" 
                onClick={(e) => scrollToSection('home', e)} 
                className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'home' ? 'text-primary font-bold' : ''}`}
              >
                HOME
              </a>
            ) : (
              <Link 
                to="/"
                className="nav-link block transition-colors duration-300 hover:text-primary"
              >
                HOME
              </Link>
            )}
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection('about', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'about' ? 'text-primary font-bold' : ''}`}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a 
              href="#schedule" 
              onClick={(e) => scrollToSection('schedule', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'schedule' ? 'text-primary font-bold' : ''}`}
            >
              SCHEDULE
            </a>
          </li>
          <li>
            <a 
              href="#speakers" 
              onClick={(e) => scrollToSection('speakers', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'speakers' ? 'text-primary font-bold' : ''}`}
            >
              SPEAKERS
            </a>
          </li>
          <li>
            <a 
              href="#sponsors" 
              onClick={(e) => scrollToSection('sponsors', e)} 
              className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'sponsors' ? 'text-primary font-bold' : ''}`}
            >
              SPONSORS
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 