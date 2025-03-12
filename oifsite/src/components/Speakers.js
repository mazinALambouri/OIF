import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import { motion } from 'framer-motion';

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true);
        
        // Fetch speakers from Supabase
        const { data, error } = await supabase
          .from('speakers')
          .select('id, name, position, company, gender, img')
          .order('id');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Speakers data from Supabase:", data);
          
          // Process the data
          const processedData = data.map(speaker => {
            return {
              id: speaker.id,
              name: speaker.name,
              role: speaker.position + (speaker.company ? ` at ${speaker.company}` : ''),
              gender: speaker.gender,
              img: speaker.img, // Store the img field from the database
              // Use a default image based on gender if img is not available
              fallbackImage: speaker.gender === 'female' 
                ? "https://pagedone.io/asset/uploads/1696238396.png" 
                : speaker.gender === 'male'
                  ? "https://pagedone.io/asset/uploads/1696238374.png"
                  : "https://pagedone.io/asset/uploads/1696238446.png"
            };
          });
          
          setSpeakers(processedData);
        } else {
          console.log("No data returned from Supabase");
          setError("No speakers data found");
          setSpeakers([]);
        }
      } catch (err) {
        console.error('Error fetching speakers:', err);
        setError(err.message);
        setSpeakers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  // Use all speakers directly instead of filtering
  const filteredSpeakers = speakers;

  return (
    <section id="speakers" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-2 px-6 rounded-full bg-secondary/30 text-primary font-semibold text-lg tracking-wider mb-4">Our Speakers</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Speakers
              </span>
              {/* Shadow text to help with rendering */}
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto">Connect with industry leaders and visionaries who are shaping the future of investment in Oman.</p>
        </motion.div>
        {/* Loading state */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <svg className="animate-spin h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-600">Loading speakers...</p>
          </motion.div>
        )}

        {/* Error state */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-red-50 rounded-lg"
          >
            <p className="text-red-600">Error loading speakers: {error}</p>
          </motion.div>
        )}

        {/* Speakers Grid - Simplified */}
        {!loading && !error && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
          >
            {filteredSpeakers.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="col-span-full text-center py-12"
              >
                <p className="text-gray-600">No speakers found.</p>
              </motion.div>
            ) : (
              filteredSpeakers.map((speaker, index) => (
                <motion.div 
                  key={speaker.id || index} 
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                    {speaker.img ? (
                      <img 
                        src={speaker.img}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Gender-specific icon fallbacks
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        {speaker.gender === 'female' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-pink-400">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12 18.75a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M9.75 12a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                          </svg>
                        ) : speaker.gender === 'male' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-blue-400">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25z" clipRule="evenodd" />
                            <path d="M16.5 12a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V15h-1.5a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 01.75-.75z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-gray-400">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <h4 className="text-base font-semibold text-gray-900 text-center">
                    {speaker.name}
                  </h4>
                  <p className="text-sm text-gray-600 text-center mt-1">
                    {speaker.role}
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Speakers; 