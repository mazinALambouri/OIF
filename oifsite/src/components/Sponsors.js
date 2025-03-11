import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import { motion } from 'framer-motion';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default styling for sponsors
  const defaultStyling = {
    "CNN": { height: "h-20", width: "w-40" },
    "Advantage": { height: "h-32", width: "w-56" },
    "Sohar": { height: "h-32", width: "w-56" },
    "Tourism": { height: "h-32", width: "w-56" },
    "Commerce": { height: "h-48", width: "w-80", extraClasses: "-mt-4" }
  };

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
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        
        // Fetch sponsors from Supabase
        const { data, error } = await supabase
          .from('sponsors')
          .select('id, name, img_sponsor')
          .order('id');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Sponsors data from Supabase:", data);
          
          // Process the data
          const processedData = data.map(sponsor => {
            console.log(`Processing sponsor: ${sponsor.name}, Image URL: ${sponsor.img_sponsor}`);
            
            // Determine which image to use
            let imageSource;
            if (sponsor.img_sponsor && sponsor.img_sponsor.trim() !== '') {
              // Remove the @ symbol if it exists at the beginning of the URL
              imageSource = sponsor.img_sponsor.startsWith('@') 
                ? sponsor.img_sponsor.substring(1).trim() 
                : sponsor.img_sponsor.trim();
              console.log(`Using Supabase image URL for ${sponsor.name}: ${imageSource}`);
            } else {
              imageSource = null;
              console.log(`No image available for ${sponsor.name}`);
            }
            
            return {
              id: sponsor.id,
              name: sponsor.name,
              image: imageSource,
              // Apply default styling based on name or use generic styling
              ...defaultStyling[sponsor.name] || { height: "h-32", width: "w-56" }
            };
          });
          
          console.log("Processed sponsor data:", processedData);
          setSponsors(processedData);
        } else {
          console.log("No data returned from Supabase");
          setError("No sponsors data found");
          setSponsors([]);
        }
      } catch (err) {
        console.error('Error fetching sponsors:', err);
        setError(err.message);
        setSponsors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <section id="sponsors" className="py-24 bg-gradient-to-b from-white via-secondary/20 to-primary/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
      
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/30 text-primary font-medium text-sm tracking-wider mb-2">Partners</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Our Sponsors
              </span>
              {/* Shadow text to help with rendering */}
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto">   Proudly supported by industry leaders who share our vision for innovation and technological advancement.</p>
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
            <p className="text-gray-600 font-medium">Loading our amazing sponsors...</p>
          </motion.div>
        )}

        {/* Error state */}
        {error && (
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
            <p className="text-red-600 font-medium">Error loading sponsors: {error}</p>
          </motion.div>
        )}

        {/* Sponsors Grid */}
        {!loading && !error && sponsors.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sponsors.map((sponsor, index) => (
              <motion.div 
                key={sponsor.id || index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-all duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-center h-40">
                    {sponsor.image ? (
                      <img 
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-32 max-w-full object-contain transition-all duration-500 group-hover:scale-105 filter grayscale hover:grayscale-0"
                        onError={(e) => {
                          console.error(`Error loading image for ${sponsor.name}:`, e);
                          // Try without the @ symbol if it failed
                          if (typeof sponsor.image === 'string' && sponsor.image.includes('@')) {
                            e.target.src = sponsor.image.replace('@', '');
                          } else {
                            // Fallback to a placeholder if image fails to load
                            e.target.src = 'https://via.placeholder.com/150?text=' + sponsor.name;
                          }
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-100 rounded-lg p-6 w-full h-full">
                        <span className="text-gray-500 font-medium text-lg">{sponsor.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-700 font-medium">{sponsor.name}</h3>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && !error && sponsors.length === 0 && (
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
            <p className="text-gray-600 font-medium">No sponsors available yet. Check back soon!</p>
          </motion.div>
        )}

        {/* Call to action for potential sponsors */}
       
      </div>
    </section>
  );
};

export default Sponsors; 