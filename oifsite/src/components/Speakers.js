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
          .select('id, name, position, company, gender')
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
              // Use a default image based on gender or a generic avatar if gender is not specified
              image: speaker.gender === 'female' 
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
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/30 text-primary font-medium text-sm tracking-wider mb-2">Speakers</span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light mt-2 mb-4" style={{ WebkitBackgroundClip: 'text', backgroundSize: '100% 100%', paddingBottom: '0.1em' }}>Our Speakers</h2>
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
                    {speaker.image ? (
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12 text-gray-400">
                          <path fill="currentColor" d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"/>
                          <path fill="currentColor" d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"/>
                        </svg>
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