import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/img/Oman.png';
import { supabase } from '../supabaseClient';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  
  // External contact URL
  const contactUrl = "https://investoman.om/investor-info-form";

  // Function to handle guide download
  const handleDownloadGuide = async () => {
    try {
      // Fetch the latest guide from Supabase
      const { data, error } = await supabase
        .from('downloadguide')
        .select('file_url')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('Error fetching guide:', error);
        alert('Failed to fetch the guide. Please try again later.');
        return;
      }
      
      if (data && data.file_url) {
        window.location.href = data.file_url;
      } else {
        alert('No guide available for download at this time.');
      }
    } catch (error) {
      console.error('Error downloading guide:', error);
      alert('Failed to download the guide. Please try again later.');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Get navbar height to offset scroll position
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Scroll to element with offset for navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
      const currentScrollY = window.pageYOffset;
      
      setLastScrollY(currentScrollY);
      
      // Find the active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the viewport (with some buffer for better UX)
          if (rect.top <= 100 && rect.bottom >= 100) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection, lastScrollY]);

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      className="fixed z-50 w-full bg-white/55 backdrop-blur-xl shadow-sm"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="px-6 mx-auto max-w-6xl">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Left side: Logo */}
          <motion.div 
            className="flex-shrink-0 pl-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="scroll-smooth" aria-label="Logo">
              <motion.img 
                src={logo} 
                alt="Logo" 
                className="h-8" 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Link>
          </motion.div>
          
          {/* Center: Navigation links */}
          <div className="flex-grow flex justify-center">
            {/* Desktop nav links */}
            <motion.ul className="hidden lg:flex space-x-8 items-center" variants={navVariants}>
              <motion.li variants={linkVariants}>
                {location.pathname === "/" ? (
                  <motion.a 
                    href="#home" 
                    onClick={(e) => scrollToSection('home', e)} 
                    className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'home' ? 'text-primary font-bold' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    HOME
                    {activeSection === 'home' && (
                      <motion.div 
                        className="h-0.5 bg-primary rounded-full mt-1"
                        layoutId="activeSection"
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 30,
                          duration: 0.3
                        }}
                      />
                    )}
                  </motion.a>
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/"
                      className="nav-link transition-colors duration-300 hover:text-primary"
                    >
                      HOME
                    </Link>
                  </motion.div>
                )}
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.a 
                  href="#about" 
                  onClick={(e) => scrollToSection('about', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'about' ? 'text-primary font-bold' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ABOUT
                  {activeSection === 'about' && (
                    <motion.div 
                      className="h-0.5 bg-primary rounded-full mt-1"
                      layoutId="activeSection"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                </motion.a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.a 
                  href="#schedule" 
                  onClick={(e) => scrollToSection('schedule', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'schedule' ? 'text-primary font-bold' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SCHEDULE
                  {activeSection === 'schedule' && (
                    <motion.div 
                      className="h-0.5 bg-primary rounded-full mt-1"
                      layoutId="activeSection"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                </motion.a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.a 
                  href="#speakers" 
                  onClick={(e) => scrollToSection('speakers', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'speakers' ? 'text-primary font-bold' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SPEAKERS
                  {activeSection === 'speakers' && (
                    <motion.div 
                      className="h-0.5 bg-primary rounded-full mt-1"
                      layoutId="activeSection"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                </motion.a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <motion.a 
                  href="#sponsors" 
                  onClick={(e) => scrollToSection('sponsors', e)} 
                  className={`nav-link transition-colors duration-300 hover:text-primary ${activeSection === 'sponsors' ? 'text-primary font-bold' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  PARTNERS
                  {activeSection === 'sponsors' && (
                    <motion.div 
                      className="h-0.5 bg-primary rounded-full mt-1"
                      layoutId="activeSection"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                </motion.a>
              </motion.li>
              <div className="flex items-center space-x-3 -mt-1">
                <motion.li variants={linkVariants} className="flex items-center">
                  <motion.a 
                    href={contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-gradient-to-r from-[#8FD2C7] to-[#492E8B] text-white rounded-full transition-all duration-300 "
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(73, 46, 139, 0.2)",
                      y: -3,
                      color: "#ffffff",
                      textShadow: "0px 0px 8px rgba(255,255,255,0.3)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                    whileTap={{ scale: 0.92, y: 0 }}
                  >
                    READY TO INVEST ?
                  </motion.a>
                </motion.li>
                <motion.li variants={linkVariants} className="flex items-center">
                  <motion.button 
                    onClick={handleDownloadGuide}
                    aria-label="Investor Guide"
                    className="px-4 py-1.5 bg-[#492E8B] text-white rounded-full transition-all duration-300 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(73, 46, 139, 0.2)",
                      y: -3,
                      color: "#ffffff",
                      textShadow: "0px 0px 8px rgba(255,255,255,0.3)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }}
                    whileTap={{ scale: 0.92, y: 0 }}
                  >
                    INVESTOR GUIDE
                  </motion.button>
                </motion.li>
              </div>
            </motion.ul>
          </div>
          
          {/* Right side: Mobile menu button */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile menu toggle */}
            <motion.button 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu" 
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden bg-white shadow-md"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.ul className="flex flex-col space-y-4 p-4 items-center">
              <motion.li variants={mobileLinkVariants}>
                {location.pathname === "/" ? (
                  <motion.a 
                    href="#home" 
                    onClick={(e) => scrollToSection('home', e)} 
                    className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'home' ? 'text-primary font-bold' : ''} text-center`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    HOME
                  </motion.a>
                ) : (
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-center"
                  >
                    <Link 
                      to="/"
                      className="nav-link block transition-colors duration-300 hover:text-primary"
                    >
                      HOME
                    </Link>
                  </motion.div>
                )}
              </motion.li>
              <motion.li variants={mobileLinkVariants}>
                <motion.a 
                  href="#about" 
                  onClick={(e) => scrollToSection('about', e)} 
                  className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'about' ? 'text-primary font-bold' : ''} text-center`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ABOUT
                </motion.a>
              </motion.li>
              <motion.li variants={mobileLinkVariants}>
                <motion.a 
                  href="#schedule" 
                  onClick={(e) => scrollToSection('schedule', e)} 
                  className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'schedule' ? 'text-primary font-bold' : ''} text-center`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SCHEDULE
                </motion.a>
              </motion.li>
              <motion.li variants={mobileLinkVariants}>
                <motion.a 
                  href="#speakers" 
                  onClick={(e) => scrollToSection('speakers', e)} 
                  className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'speakers' ? 'text-primary font-bold' : ''} text-center`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SPEAKERS
                </motion.a>
              </motion.li>
              <motion.li variants={mobileLinkVariants}>
                <motion.a 
                  href="#sponsors" 
                  onClick={(e) => scrollToSection('sponsors', e)} 
                  className={`nav-link block transition-colors duration-300 hover:text-primary ${activeSection === 'sponsors' ? 'text-primary font-bold' : ''} text-center`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  PARTNERS
                </motion.a>
              </motion.li>
              <motion.li variants={mobileLinkVariants} className="flex justify-center">
                <a 
                  href={contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-1.5 bg-gradient-to-r from-[#8FD2C7] to-[#492E8B] text-white rounded-full 
                  transition-all duration-500 ease-out
                  hover:bg-gradient-to-l hover:from-[#8FD2C7] hover:to-[#492E8B] 
                  w-fit no-underline hover:no-underline 
                  shadow-[0_2px_8px_rgba(143,210,199,0.15)]
                  hover:shadow-[0_6px_20px_rgba(73,46,139,0.25)] 
                  hover:-translate-y-1 
                  hover:scale-105
                  active:scale-95 active:translate-y-0 active:shadow-[0_2px_8px_rgba(143,210,199,0.15)]
                  mx-auto"
                >
                  READY TO INVEST ?
                </a>
              </motion.li>
              <motion.li variants={mobileLinkVariants}>
                <button 
                  onClick={handleDownloadGuide}
                  aria-label="Investor Guide"
                  className="mt-2 px-4 py-1.5 bg-[#492E8B] text-white rounded-full 
                  transition-all duration-500 ease-out
                  hover:bg-[#3d2575]
                  w-fit no-underline hover:no-underline 
                  shadow-[0_2px_8px_rgba(73,46,139,0.15)]
                  hover:shadow-[0_6px_20px_rgba(73,46,139,0.25)] 
                  hover:-translate-y-1 
                  hover:scale-105
                  active:scale-95 active:translate-y-0 active:shadow-[0_2px_8px_rgba(73,46,139,0.15)]
                  flex items-center justify-center
                  mx-auto"
                >
                  INVESTOR GUIDE
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation; 