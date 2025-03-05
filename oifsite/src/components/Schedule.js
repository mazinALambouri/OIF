import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';

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

  return (
    <section id="schedule" className="py-16 relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-20 top-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Program</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Featured Agenda & Highlights</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6">Explore the key highlights of each day</p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading schedule...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {!loading && !error && days.length > 0 && (
          <>
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-2 sm:px-4">
              {days.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setActiveTab(day)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm w-full sm:w-auto
                    ${activeTab === day 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg transform hover:-translate-y-1'
                    }`}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="tab-contents relative">
              {Object.entries(scheduleData).map(([day, data]) => (
                <div
                  key={day}
                  className={`transition-all duration-500 ${activeTab === day ? 'block' : 'hidden'}`}
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-4 sm:p-8 hover:shadow-2xl transition-all duration-300">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-indigo-600">{data.title}</h3>
                      <p className="text-gray-600">{data.date}</p>
                    </div>
                    <div className="grid gap-3 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {data.events.map((event, index) => (
                        <div 
                          key={index}
                          className="schedule-item bg-indigo-50 rounded-lg p-3 sm:p-6 transition transform hover:scale-105 hover:shadow-md"
                        >
                          <p className="text-indigo-600 font-semibold text-sm">{event.time}</p>
                          <h4 className="text-lg font-bold mt-2">{event.title}</h4>
                          <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                          {event.location && (
                            <p className="text-gray-500 mt-2 text-xs flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {event.location}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && !error && days.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No schedule data available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule; 