import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/AOF1.png';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [appStoreLinks, setAppStoreLinks] = useState({ apple: null, google: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const form = useRef();
  
  // Interest popup state
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestFormData, setInterestFormData] = useState({
    name: '',
    email: ''
  });
  const [interestFormSubmitting, setInterestFormSubmitting] = useState(false);
  const [interestFormSubmitted, setInterestFormSubmitted] = useState(false);
  const [interestFormError, setInterestFormError] = useState(null);

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
    
    // Map EmailJS field names to our state properties
    let stateKey;
    if (name === 'from_name') {
      stateKey = 'name';
    } else if (name === 'reply_to') {
      stateKey = 'email';
    } else {
      stateKey = name;
    }
    
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));
  };
  
  const handleInterestInputChange = (e) => {
    const { name, value } = e.target;
    setInterestFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    try {
      // Use EmailJS to send the email
      const serviceId = 'service_t2nzyna';
      const templateId = 'template_4ie4lue';
      const publicKey = 'vAdPXkWlaHzaiu3gW';
      
      const templateParams = {
        from_name: formData.name,
        email: formData.email,
        reply_to: formData.email,
        to_email: 'advantageoman@investoman.om',
        message: formData.message,
        to_name: 'Invest Oman Team'
      };
      
      await emailjs.send(
        serviceId, 
        templateId, 
        templateParams,
        publicKey
      );
      
<<<<<<< HEAD
=======
      console.log('Email sent successfully:', result.text);
      
>>>>>>> bac51a8c123a191687edc6dcc613302b27ec0110
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormError(`Failed to send message: ${error.message || 'Unknown error'}`);
    } finally {
      setFormSubmitting(false);
    }
  };
  
  const handleInterestSubmit = async (e) => {
    e.preventDefault();
    setInterestFormSubmitting(true);
    setInterestFormError(null);
    
    try {
      // Save to Supabase IntersteadWith table
      const { error } = await supabase
        .from('IntersteadWith')
        .insert([
          { 
            name: interestFormData.name,
            email: interestFormData.email
          }
        ]);
      
      if (error) throw error;
      
      // Reset form and show success message
      setInterestFormData({
        name: '',
        email: ''
      });
      setInterestFormSubmitted(true);
      
      // Hide popup after 2 seconds
      setTimeout(() => {
        setInterestFormSubmitted(false);
        setShowInterestModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving interest:', error);
      setInterestFormError('Failed to save your information. Please try again later.');
    } finally {
      setInterestFormSubmitting(false);
    }
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
            <div className="mb-8 flex flex-col items-center w-full">
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
            
            {/* Interest Button */}
            <div className="mb-8 flex flex-col items-center w-full">
              <button
                onClick={() => setShowInterestModal(true)}
                className="py-3 px-6 rounded-full bg-primary text-white font-medium shadow-md hover:shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Register to Watch Live on April 27
              </button>
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
              
              {formSubmitted && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </div>
              )}
              
              {formError && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                  <p className="font-medium">Error: {formError}</p>
                </div>
              )}
              
              <form ref={form} onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
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
                  <input type="hidden" name="reply_to" value={formData.email} />
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
      
      {/* Interest Modal Popup */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowInterestModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Register Your Interest</h3>
            
            {interestFormSubmitted ? (
              <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                <p className="font-medium">Thank you for your interest!</p>
                <p className="text-sm">We've received your information.</p>
              </div>
            ) : (
              <>
                {interestFormError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                    <p className="font-medium">Error: {interestFormError}</p>
                  </div>
                )}
                
                <form onSubmit={handleInterestSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="interest-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="interest-name"
                      name="name"
                      value={interestFormData.name}
                      onChange={handleInterestInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interest-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="interest-email"
                      name="email"
                      value={interestFormData.email}
                      onChange={handleInterestInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={interestFormSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    {interestFormSubmitting ? (
                      <span className="inline-block h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer; 