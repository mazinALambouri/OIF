import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient.js';

const Card = ({ title, description }) => {
  return (
    <motion.div 
      className="relative group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-all duration-300"></div>
      <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-700 mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const WhyOman = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setLoading(true);
        
        // Fetch sectors from Supabase
        const { data, error } = await supabase
          .from('sectors')
          .select('id, name, description')
          .order('id');
          
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
          <span className="inline-block py-2 px-6 rounded-full bg-secondary/30 text-primary font-semibold text-lg tracking-wider mb-4">Investment Destination</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Why Oman?
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
      </div>
    </section>
  );
};

export default WhyOman; 