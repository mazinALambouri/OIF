import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient.js';

const Card = ({ title, description, onClick }) => {
  return (
    <motion.div 
      className="relative group cursor-pointer"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-all duration-300"></div>
      <div className="relative bg-white backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-700 mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-base line-clamp-3">
          {description}
        </p>
        <div className="mt-4 text-primary text-sm font-medium flex items-center">
          View details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const WhyOman = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Function to open sector details modal
  const openSectorDetails = (sector) => {
    setSelectedSector(sector);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Function to close sector details modal
  const closeSectorDetails = () => {
    setSelectedSector(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setLoading(true);
        
        // Fetch sectors from Supabase
        const { data, error } = await supabase
          .from('sectors')
          .select('name, description')
          .order('name');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Sectors data from Supabase:", data);
          setSectors(data);
        } else {
          console.log("No sectors data returned from Supabase");
          setError("No sectors data found");
          setSectors([]);
        }
      } catch (err) {
        console.error('Error fetching sectors:', err);
        setError(err.message);
        setSectors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  // Fallback features in case of error or empty data
  const fallbackFeatures = [
    {
      id: 1,
      name: "Strategic Location",
      description: "Strategic position at the crossroads of global trade routes, connecting Asia, Europe, and Africa."
    },
    {
      id: 2,
      name: "Business-Friendly Policies",
      description: "Ease of doing business and attractive incentives for international investors."
    },
    {
      id: 3,
      name: "Diverse Investment Sectors",
      description: "Opportunities in energy, tourism, manufacturing, tech, and more."
    }
  ];

  return (
    <section id="why-oman" className="py-24 bg-gradient-to-b from-white via-secondary/20 to-primary/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-2 px-6 rounded-full bg-secondary/30 text-primary font-semibold text-lg tracking-wider mb-4">INVESTMENT DESTINATION</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              WHY OMAN?
              </span>
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto">
            Discover the unique advantages of investing and doing business in the heart of the Middle East
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-4">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Loading investment sectors...</p>
          </motion.div>
        )}

        {/* Error state */}
        {error && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-red-100"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Error loading sectors: {error}</p>
            <p className="text-gray-600 mt-2">Showing fallback content instead</p>
          </motion.div>
        )}

        {/* Cards Grid - Show sectors from Supabase or fallback content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(!loading && sectors.length > 0) ? (
            sectors.map((sector, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  title={sector.name}
                  description={sector.description}
                  onClick={() => openSectorDetails(sector)}
                />
              </motion.div>
            ))
          ) : (!loading && error) ? (
            // Show fallback content if there's an error
            fallbackFeatures.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card
                  title={feature.name}
                  description={feature.description}
                  onClick={() => openSectorDetails(feature)}
                />
              </motion.div>
            ))
          ) : null}
        </motion.div>

        {/* Empty state */}
        {!loading && !error && sectors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No investment sectors available yet. Check back soon!</p>
          </motion.div>
        )}
        
        {/* Sector Details Modal */}
        <AnimatePresence>
          {selectedSector && (
            <>
              {/* Backdrop */}
              <motion.div 
                className="fixed inset-0 bg-black/60 z-40"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeSectorDetails}
              />
              
              {/* Modal */}
              <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div 
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden relative flex flex-col"
                >
                  {/* Close button */}
                  <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-50"
                    onClick={closeSectorDetails}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Decorative header - fixed part */}
                  <div className="flex-shrink-0">
                    <div className="h-16 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-t-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    </div>
                    <div className="h-8"></div> {/* Space for the icon that overlaps */}
                  </div>
                  
                  {/* Icon overlapping header and content */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white z-10">
                    <div className="text-2xl text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Scrollable content area */}
                  <div className="flex-grow overflow-y-auto p-5 pt-8">
                    {/* Sector Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-3">
                      {selectedSector.name}
                    </h3>
                    
                    {/* Sector Description */}
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Overview
                      </h4>
                      <div className="prose prose-sm text-gray-600">
                        <p>{selectedSector.description}</p>
                      </div>
                    </div>
                    
                    {/* Footer action button */}
                    <div className="mt-6 text-center">
                      <button 
                        onClick={closeSectorDetails}
                        className="px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-medium text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WhyOman; 