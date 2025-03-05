import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import { motion } from 'framer-motion';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('day1');
  const [scheduleData, setScheduleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        
        // Fetch schedule from Supabase
        const { data, error } = await supabase
          .from('schedule')
          .select('id, created_at, day_label, time, title, description, location')
          .order('id');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Schedule data from Supabase:", data);
          
          // Process the data and group by day_label
          const groupedByDay = data.reduce((acc, event) => {
            const dayKey = event.day_label || 'day1'; // Default to day1 if no day_label
            
            if (!acc[dayKey]) {
              acc[dayKey] = {
                title: `Day ${dayKey.replace('day', '')}`,
                date: new Date(event.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }),
                events: []
              };
            }
            
            acc[dayKey].events.push({
              time: event.time,
              title: event.title,
              description: event.description,
              location: event.location
            });
            
            return acc;
          }, {});
          
          console.log("Processed schedule data:", groupedByDay);
          setScheduleData(groupedByDay);
          
          // Extract day keys for tabs
          const dayKeys = Object.keys(groupedByDay);
          setDays(dayKeys);
          
          // Set active tab to first day if available
          if (dayKeys.length > 0 && !dayKeys.includes(activeTab)) {
            setActiveTab(dayKeys[0]);
          }
        } else {
          console.log("No schedule data returned from Supabase");
          setError("No schedule data found");
          setScheduleData({});
          setDays([]);
        }
      } catch (err) {
        console.error('Error fetching schedule:', err);
        setError(err.message);
        setScheduleData({});
        setDays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [activeTab]);

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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <section id="schedule" className="py-20 relative bg-gradient-to-b from-white to-indigo-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-20 w-80 h-80 bg-indigo-200/40 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 bottom-20 w-80 h-80 bg-purple-200/40 rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 w-60 h-60 bg-pink-200/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm tracking-wider mb-2">PROGRAM</span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mt-2 mb-4" style={{ WebkitBackgroundClip: 'text', backgroundSize: '100% 100%', paddingBottom: '0.1em' }}>Featured Agenda & Highlights</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6 max-w-2xl mx-auto">Explore the key highlights and sessions of each day</p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-block h-12 w-12 relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-indigo-200"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">Loading schedule...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div 
            className="text-center py-12 bg-red-50 rounded-xl shadow-sm border border-red-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">Error: {error}</p>
          </motion.div>
        )}

        {!loading && !error && days.length > 0 && (
          <>
            {/* Tab Navigation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {days.map((day, index) => (
                <motion.button
                  key={day}
                  onClick={() => setActiveTab(day)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm
                    ${activeTab === day 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Day {index + 1}
                </motion.button>
              ))}
            </motion.div>

            {/* Tab Contents */}
            <div className="tab-contents relative">
              {Object.entries(scheduleData).map(([day, data]) => (
                <div
                  key={day}
                  className={`transition-all duration-500 ${activeTab === day ? 'block' : 'hidden'}`}
                >
                  <motion.div 
                    className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-8 border-b border-gray-100 pb-6">
                      <h3 className="text-2xl font-bold text-indigo-600">{data.title}</h3>
                      <p className="text-gray-600 flex items-center mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {data.date}
                      </p>
                    </div>
                    
                    <motion.div 
                      className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {data.events.map((event, index) => (
                        <motion.div 
                          key={index}
                          className="schedule-item bg-gradient-to-br from-white to-indigo-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg border border-indigo-100/50 relative overflow-hidden group"
                          variants={itemVariants}
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 rounded-bl-full opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                          
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          
                          <p className="text-indigo-600 font-semibold text-sm bg-indigo-50 inline-block px-3 py-1 rounded-full">{event.time}</p>
                          <h4 className="text-xl font-bold mt-3 text-gray-800">{event.title}</h4>
                          <p className="text-gray-600 mt-3 text-sm leading-relaxed">{event.description}</p>
                          
                          {event.location && (
                            <div className="mt-4 pt-4 border-t border-indigo-100">
                              <p className="text-gray-500 text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && !error && days.length === 0 && (
          <motion.div 
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium">No schedule data available yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Schedule; 