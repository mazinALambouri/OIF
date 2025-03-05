import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section id="speakers" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-manrope text-5xl text-center font-bold text-gray-900">Our Speakers</h2>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading speakers...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading speakers: {error}</p>
          </div>
        )}

        {/* Speakers Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
            {speakers.map((speaker, index) => (
              <div key={speaker.id || index} className="group text-center transform transition duration-500 hover:scale-105">
                <div className="relative mb-4 sm:mb-6">
                  {speaker.gender === 'FALSE' ? (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 border-4 border-transparent transition-all duration-500 group-hover:border-indigo-600 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 sm:h-24 sm:w-24">
                        <defs>
                          <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="url(#femaleGradient)"/>
                        <path d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="url(#femaleGradient)"/>
                      </svg>
                    </div>
                  ) : speaker.gender === 'TRUE' ? (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 border-4 border-transparent transition-all duration-500 group-hover:border-indigo-600 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 sm:h-24 sm:w-24">
                        <defs>
                          <linearGradient id="maleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="url(#maleGradient)"/>
                        <path d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="url(#maleGradient)"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-gray-100 to-slate-200 border-4 border-transparent transition-all duration-500 group-hover:border-indigo-600 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 sm:h-24 sm:w-24">
                        <defs>
                          <linearGradient id="neutralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#64748B" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#475569" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="url(#neutralGradient)"/>
                        <path d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="url(#neutralGradient)"/>
                      </svg>
                    </div>
                  )}
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 group-hover:text-indigo-600">
                  {speaker.name}
                </h4>
                <span className="text-gray-500 transition-all duration-500 group-hover:text-gray-900">
                  {speaker.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Speakers; 