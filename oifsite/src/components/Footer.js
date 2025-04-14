import React, { useState, useEffect } from 'react';
import logo from '../assets/img/AOF1.png';
import { supabase } from '../supabaseClient';

const Footer = () => {
  const [appStoreLinks, setAppStoreLinks] = useState({ apple: null, google: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    const fetchAppStoreLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('app_store_links')
          .select('platform, store_url')
          .order('platform');

        if (error) throw error;

        const links = data.reduce((acc, link) => {
          acc[link.platform] = link.store_url;
          return acc;
        }, {});

        setAppStoreLinks(links);
      } catch (error) {
        console.error('Error fetching app store links:', error);
      }
    };

    fetchAppStoreLinks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    const subject = `Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    window.location.href = `mailto:advantageoman@investoman.om?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Reset form after opening mail client
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormSubmitting(false);
    }, 500);
  };

  return (
    <footer className="bg-gradient-to-r from-[#B1DCD5] to-[#0AB0CE] bg-[length:200%_200%] bg-[position:0%_0%] text-gray-800 py-16 px-6 md:px-16 lg:px-32" style={{ backgroundImage: 'linear-gradient(5deg, #0AB0CE, #B1DCD5)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Two column layout - stacks on mobile, side by side on larger screens */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-12">
          {/* Left Column - Logo, Social, App Links */}
          <div className="lg:w-3/5 flex flex-col items-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img 
                src={logo}
                alt="Invest Oman Logo" 
                className="w-96 md:w-[500px] lg:w-[600px] object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Social Media */}
            <div className="mb-12 flex flex-col items-center w-full">
              <h3 className="text-gray-900 font-bold text-xl mb-5">Connect With Us</h3>
              <div className="flex justify-center gap-6">
                <a 
                  href="https://twitter.com/investinom" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-full bg-white/80 shadow-sm hover:shadow-md flex items-center justify-center text-gray-800 hover:text-black hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fab fa-x-twitter text-3xl"></i>
                </a>
                <a 
                  href="https://www.instagram.com/investinom" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-full bg-white/80 shadow-sm hover:shadow-md flex items-center justify-center text-gray-800 hover:text-[#E4405F] hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fab fa-instagram text-3xl"></i>
                </a>
                <a 
                  href="https://om.linkedin.com/company/investinom" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-full bg-white/80 shadow-sm hover:shadow-md flex items-center justify-center text-gray-800 hover:text-[#0A66C2] hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fab fa-linkedin text-3xl"></i>
                </a>
                <a 
                  href="https://www.youtube.com/@invest-oman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-full bg-white/80 shadow-sm hover:shadow-md flex items-center justify-center text-gray-800 hover:text-[#FF0000] hover:-translate-y-1 transition-all duration-300"
                >
                  <i className="fab fa-youtube text-3xl"></i>
                </a>
              </div>
            </div>
            
            {/* Empty flex spacer to push content to bottom */}
            <div className="flex-grow"></div>
            
            {/* App Store Links */}
            <div className="flex flex-col items-center mb-4 w-full">
              <h3 className="text-gray-900 font-bold text-xl mb-3 text-center">
                Download Our App
              </h3>
              <p className="text-gray-800 max-w-md leading-relaxed text-center">
                Access live sessions, participate in real-time engagement, and stay connected throughout the event.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-6 mb-0">
              {appStoreLinks.apple && (
                <a 
                  href={appStoreLinks.apple} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                    alt="Download on the App Store" 
                    className="h-12 md:h-14"
                  />
                </a>
              )}
              {appStoreLinks.google && (
                <a 
                  href={appStoreLinks.google} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play" 
                    className="h-16 md:h-20"
                  />
                </a>
              )}
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 h-full flex flex-col">
              <h3 className="text-gray-900 font-bold text-xl mb-4">
                Contact Us
              </h3>
              <p className="text-gray-700 mb-4">
                Have questions? Send us an inquiry and we'll get back to you shortly.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="flex-grow">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center mt-auto"
                >
                  {formSubmitting ? (
                    <span className="inline-block h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
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