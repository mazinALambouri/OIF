import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';

const About = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);
        
        // Fetch overview data from Supabase
        const { data, error } = await supabase
          .from('overview')
          .select('id, main_title, sub_title, start_date, end_date, location, attendance_info, created_at')
          .order('id')
          .limit(1);
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Overview data from Supabase:", data);
          setOverviewData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching overview data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  // Format date range for display
  const formatDateRange = () => {
    if (!overviewData || !overviewData.start_date || !overviewData.end_date) return "TBD";
    
    const startDate = new Date(overviewData.start_date);
    const endDate = new Date(overviewData.end_date);
    
    // If same month and year
    if (startDate.getMonth() === endDate.getMonth() && 
        startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}-${endDate.getDate()}, ${endDate.getFullYear()}`;
    }
    
    // Different months or years
    return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${endDate.getFullYear()}`;
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white via-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-20 top-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading forum information...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600">Error loading forum information. Please try again later.</p>
          </div>
        )}

        {!loading && !error && overviewData && (
          <>
            <div className="text-center mb-8 sm:mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Discover</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
                {overviewData.main_title || "About the Forum"}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-center">
              <div className="space-y-4 sm:space-y-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-8 shadow-xl">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {overviewData.sub_title || "The Oman Investment Forum is a premier gathering of global investors, industry leaders, and policymakers."}
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-8 shadow-xl">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {overviewData.location && (
                      <span className="block mb-2">
                        <span className="font-semibold">Location:</span> {overviewData.location}
                      </span>
                    )}
                    Join us for insightful discussions, networking opportunities, and firsthand exposure to Oman's most promising investment prospects.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {overviewData.attendance_info ? overviewData.attendance_info.split('+')[0] : "500"}+
                    </div>
                    <div className="text-gray-600 text-xs sm:text-base font-medium mt-1 sm:mt-2">Global Attendees</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">50+</div>
                    <div className="text-gray-600 text-xs sm:text-base font-medium mt-1 sm:mt-2">Expert Speakers</div>
                  </div>
                </div>
              </div>
              <div className="relative group mt-6 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg sm:rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                <img 
                  src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2070&auto=format&fit=crop"
                  alt="Oman Investment Forum" 
                  className="relative rounded-lg sm:rounded-2xl shadow-2xl transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300 object-cover w-full h-[250px] sm:h-[400px] md:h-[500px]"
                />
                <div className="absolute -bottom-2 sm:-bottom-8 -right-2 sm:-right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-6 rounded-lg sm:rounded-2xl shadow-xl transform group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300">
                  <div className="text-lg sm:text-3xl font-bold">
                    {formatDateRange()}
                  </div>
                  <div className="text-white/90 text-xs sm:text-base">
                    {overviewData.end_date ? new Date(overviewData.end_date).getFullYear() : "2025"}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default About; 