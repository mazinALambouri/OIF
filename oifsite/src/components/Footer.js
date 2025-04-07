import React, { useState, useEffect } from 'react';
import logo from '../assets/img/AOF1.png';
import { supabase } from '../supabaseClient';

const Footer = () => {
  const [appStoreLinks, setAppStoreLinks] = useState({ apple: null, google: null });

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

        {/* App Store Links */}
        <div className="flex flex-col justify-center items-center mb-8">
          <h3 className="text-center text-gray-900 font-bold text-xl mb-3">
            Download Our App
          </h3>
          <p className="text-center text-gray-800 max-w-md mx-auto leading-relaxed">
            Access live sessions, participate in real-time engagement, and stay connected throughout the event.
          </p>
        </div>
        <div className="flex justify-center items-center space-x-6 mb-12">
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