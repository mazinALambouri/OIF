import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient.js';
import { motion, AnimatePresence } from 'framer-motion';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('day1');
  const [scheduleData, setScheduleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        
        // Fetch schedule from Supabase
        const { data, error } = await supabase
          .from('schedule')
          .select('id, created_at, day_label, time, title, description')
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
              id: event.id,
              time: event.time,
              title: event.title,
              description: event.description
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

  useEffect(() => {
    // Add custom scrollbar styles and CSS variables
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --color-primary-rgb: 79, 70, 229;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleEventExpansion = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08
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

  // Format time to be more readable
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    // Simple formatting - can be enhanced based on your time format
    return timeString;
  };

  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white/80"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -right-20 top-20 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 bottom-20 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/2 top-1/3 w-60 h-60 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-secondary/5 rounded-full filter blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-2 px-6 rounded-full bg-secondary/20 text-primary font-semibold text-sm tracking-wider mb-4 uppercase">FORUM SCHEDULE</span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              FEATURED AGENDA & HIGHLIGHTS
              </span>
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">Explore the key highlights and sessions of each day</p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-block h-12 w-12 relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-secondary/30"></div>
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
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
            {/* Improved Day Tabs */}
            <div className="mb-12">
              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 z-0"></div>
                
                {/* Tabs container */}
                <div className="relative z-10 flex flex-wrap justify-center gap-2">
                  {days.map((day, index) => (
                    <motion.button
                      key={day}
                      onClick={() => setActiveTab(day)}
                      className={`relative px-8 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
                        activeTab === day 
                          ? 'text-white' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-white/60'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Active background */}
                      {activeTab === day && (
                        <motion.div 
                          className="absolute inset-0 bg-primary rounded-xl z-0"
                          layoutId="activeDayTab"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      
                      {/* Day label with icon */}
                      <div className="relative z-10 flex items-center justify-center">
                        <span className={`mr-2 ${activeTab === day ? 'text-white' : 'text-primary'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <span>Day {index + 1}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="tab-contents relative" ref={containerRef}>
              {Object.entries(scheduleData).map(([day, data]) => (
                <AnimatePresence key={day} mode="wait">
                  {activeTab === day && (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="transition-all duration-500"
                    >
                      {/* Day Header */}
                      <motion.div 
                        className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 pb-6 border-b border-gray-200"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div>
                          <motion.h3 
                            className="text-3xl font-bold text-gray-800 flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">{data.title}</span>
                            <motion.span 
                              className="ml-3 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                            >
                              {data.events.length} Events
                            </motion.span>
                          </motion.h3>
                          <motion.p 
                            className="text-gray-500 flex items-center mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            
                          </motion.p>
                        </div>
                      </motion.div>
                      
                      {/* Modern Timeline Layout */}
                      <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        {/* Stylish Timeline Line with Glow */}
                        <motion.div 
                          className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40 z-0 rounded-full after:absolute after:inset-0 after:blur-[2px] after:bg-primary/30 after:rounded-full"
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        >
                          {/* Decorative elements along the timeline */}
                          <div className="absolute inset-0 bg-[length:100%_10px] bg-[linear-gradient(to_bottom,transparent_5px,rgba(255,255,255,0.3)_6px,transparent_6px)]"></div>
                        </motion.div>
                        
                        {/* Scrollable Timeline Container */}
                        <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                          <motion.div 
                            className="grid grid-cols-1 gap-5"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {data.events.map((event, index) => (
                              <motion.div 
                                key={event.id}
                                className="relative pl-16 md:pl-20"
                                variants={itemVariants}
                              >
                                {/* Modern Timeline Node */}
                                <div className="absolute left-4 md:left-6 top-6 z-10">
                                  {/* Horizontal connector line */}
                                  <div className="absolute w-4 h-[2px] bg-primary/60 right-full top-1/2 -translate-y-1/2">
                                    <motion.div 
                                      className="absolute inset-0 bg-primary/80"
                                      initial={{ scaleX: 0 }}
                                      animate={{ scaleX: 1 }}
                                      transition={{ duration: 0.5, delay: index * 0.1 }}
                                    />
                                  </div>
                                  
                                  {/* Stylish node with animation */}
                                  <motion.div 
                                    className="w-6 h-6 rounded-full bg-white shadow-[0_0_0_4px_rgba(var(--color-primary-rgb),0.2)] flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ 
                                      scale: 1,
                                      boxShadow: [
                                        "0 0 0 4px rgba(var(--color-primary-rgb),0.2)",
                                        "0 0 0 6px rgba(var(--color-primary-rgb),0.15)",
                                        "0 0 0 4px rgba(var(--color-primary-rgb),0.2)"
                                      ]
                                    }}
                                    transition={{ 
                                      scale: {
                                        type: "spring", 
                                        stiffness: 260, 
                                        damping: 20,
                                        delay: index * 0.1 + 0.2
                                      },
                                      boxShadow: {
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: index * 0.1 + 1
                                      }
                                    }}
                                  >
                                    <motion.div 
                                      className="w-3 h-3 rounded-full bg-primary"
                                      animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.8, 1]
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: index * 0.1 + 1.5
                                      }}
                                    />
                                  </motion.div>
                                </div>
                                
                                {/* Modern Minimalist Event Card */}
                                <motion.div 
                                  className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-primary border-t-0 border-r-0 border-b-0 flex flex-col ${
                                    expandedEvent === event.id ? 'bg-gray-50' : ''
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.15 + 0.3,
                                    ease: "easeOut" 
                                  }}
                                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                >
                                  <div className="p-4 flex-grow flex flex-col">
                                    {/* Header with Time and Title */}
                                    <div className="flex flex-col space-y-1 mb-2">
                                      {/* Time Display */}
                                      <div className="text-primary text-sm font-medium flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatTime(event.time)}
                                      </div>
                                      
                                      {/* Title */}
                                      <h4 className="text-base font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                                        {event.title}
                                      </h4>
                                    </div>
                                    
                                    {/* Description with clean styling */}
                                    <div className="mt-1 flex-grow">
                                      <motion.div
                                        initial={false}
                                        animate={{ 
                                          height: expandedEvent === event.id ? 'auto' : '1.5rem',
                                          opacity: 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                      >
                                        <p className="text-gray-500 text-xs leading-relaxed">
                                          {event.description}
                                        </p>
                                      </motion.div>
                                    </div>
                                    
                                    {/* Minimal Expand/Collapse Button */}
                                    <div className="mt-2 flex justify-end">
                                      <motion.button 
                                        onClick={() => toggleEventExpansion(event.id)}
                                        className="text-xs font-medium text-primary hover:text-primary-dark"
                                        whileTap={{ scale: 0.97 }}
                                      >
                                        {expandedEvent === event.id ? 'Show less' : 'Read more'}
                                      </motion.button>
                                    </div>
                                  </div>
                                </motion.div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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