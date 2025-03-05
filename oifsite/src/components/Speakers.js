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
    <section id="speakers" className="py-24 bg-gradient-to-b from-white to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium tracking-wider mb-3">
            MEET OUR EXPERTS
          </span>
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-6 pb-1 leading-tight">
            Our Speakers
          </h3>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Connect with industry leaders and visionaries who are shaping the future of investment in Oman.
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-600 font-medium">Loading speakers...</p>
          </motion.div>
        )}

        {/* Error state */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-red-50 rounded-xl"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Error loading speakers: {error}</p>
          </motion.div>
        )}

        {/* Speakers Grid */}
        {!loading && !error && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {filteredSpeakers.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No speakers found in this category.</p>
              </motion.div>
            ) : (
              filteredSpeakers.map((speaker, index) => (
                <motion.div 
                  key={speaker.id || index} 
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div className="bg-white backdrop-blur-sm bg-opacity-80 rounded-2xl p-7 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100/20 overflow-hidden relative">
                    {/* Modern glass morphism accent */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
                    
                    <div className="relative mb-6">
                      {/* Modern avatar with subtle effects */}
                      <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl opacity-10 blur-xl transform -rotate-6"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-2xl opacity-10 blur-xl transform rotate-6"></div>
                        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 shadow-lg flex items-center justify-center overflow-hidden z-10">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 sm:h-18 sm:w-18 text-indigo-700">
                            <path fill="currentColor" d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"/>
                            <path fill="currentColor" d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <h4 className="text-xl font-bold text-gray-800 mb-2 capitalize group-hover:text-indigo-600 transition-colors duration-300">
                        {speaker.name}
                      </h4>
                      <div className="h-0.5 w-10 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-3 group-hover:w-20 transition-all duration-300 rounded-full"></div>
                      <p className="text-gray-600 text-sm font-medium">
                        {speaker.role}
                      </p>
                    </div>
                    
                    {/* Modern floating social media icons */}
                    <div className="flex justify-center mt-6 space-x-3">
                      <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm border border-gray-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm border border-gray-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-sm border border-gray-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
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