import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import { motion } from 'framer-motion';

const About = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        
        // Fetch overview data from Supabase
        const { data, error } = await supabase
          .from('overview')
          .select('id, main_title, sub_title, start_date, end_date, location, attendance_info, created_at')
          .order('id')
          .limit(1);
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Overview data from Supabase:", data);
          setOverviewData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching overview data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  // Format date range for display
  const formatDateRange = () => {
    if (!overviewData || !overviewData.start_date || !overviewData.end_date) return "TBD";
    
    const startDate = new Date(overviewData.start_date);
    const endDate = new Date(overviewData.end_date);
    
    // If same month and year
    if (startDate.getMonth() === endDate.getMonth() && 
        startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}-${endDate.getDate()}, ${endDate.getFullYear()}`;
    }
    
    // Different months or years
    return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${endDate.getFullYear()}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-secondary/20 to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 relative">
              <div className="w-16 h-16 rounded-full border-4 border-secondary/30 border-t-primary animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white"></div>
              </div>
            </div>
            <p className="mt-4 text-primary font-medium">Loading forum information...</p>
          </div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-red-50 rounded-2xl shadow-lg border border-red-100"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Error loading forum information. Please try again later.</p>
          </motion.div>
        )}

        {!loading && !error && overviewData && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-secondary/30 text-primary rounded-full text-sm font-medium tracking-wider mb-3">WELCOME</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                    {overviewData.main_title || "About the Forum"}
                  </span>
                  {/* Shadow text to help with rendering */}
                
                </span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <motion.div 
                variants={containerVariants}
                className="space-y-6"
              >
                
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-secondary/20 hover:shadow-secondary/30 transition-all duration-300"
                >
                  {overviewData.location && (
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-800 font-medium">{overviewData.location}</span>
                    </div>
                  )}
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Join us for insightful discussions, networking opportunities, and firsthand exposure to Oman's most promising investment prospects.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 gap-6"
                >
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-secondary/20 to-white rounded-2xl p-6 shadow-xl border border-secondary/20 transition-all duration-300"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                      {overviewData.attendance_info ? overviewData.attendance_info.split('+')[0] : "500"}+
                    </div>
                    <div className="text-gray-600 font-medium mt-2">Global Attendees</div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-primary/10 to-white rounded-2xl p-6 shadow-xl border border-primary/10 transition-all duration-300"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">50+</div>
                    <div className="text-gray-600 font-medium mt-2">Expert Speakers</div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-70"></div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <img 
                    src={require("../assets/img/stregis.png")} 
                    alt="Oman Investment Forum" 
                    className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="absolute bottom-0 left-0 right-0 p-8"
                  >
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDateRange()}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Shaping the Future of Investment
                    </h3>
                  </motion.div>
                </motion.div>
                
                
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About; 