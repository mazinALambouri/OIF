import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiClock, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { supabase } from '../supabaseClient';

const AttendanceRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch attendance records with profile information
        const { data, error } = await supabase
          .from('attendance')
          .select(`
            *,
            profiles!attendance_id_fkey (
              full_name,
              org,
              position,
              username
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setRecords(data);
          setFilteredRecords(data);
        }
      } catch (err) {
        console.error('Error fetching attendance records:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const filtered = records.filter(record => {
      const searchLower = searchQuery.toLowerCase();
      return (
        record.profiles?.full_name?.toLowerCase().includes(searchLower) ||
        record.profiles?.org?.toLowerCase().includes(searchLower) ||
        record.day?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredRecords(filtered);
  }, [searchQuery, records]);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#492E8B] mx-auto"></div>
          <p className="mt-4 text-[#666666]">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiXCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-[20px] font-bold text-[#333333] mb-2">Error Loading Records</h3>
          <p className="text-[#666666]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft className="w-6 h-6 text-[#492E8B]" />
            </button>
            <h1 className="flex-1 text-center text-[20px] font-bold text-[#333333]">
              Attendance Records
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" />
            <input
              type="text"
              placeholder="Search by name, organization, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-[12px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#492E8B] focus:border-transparent"
            />
          </div>

          {/* Records List */}
          <AnimatePresence>
            {filteredRecords.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <FiSearch className="w-16 h-16 text-[#666666] mx-auto mb-4" />
                <h3 className="text-[20px] font-bold text-[#333333] mb-2">No records found</h3>
                <p className="text-[#666666]">
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'No attendance records available'}
                </p>
              </motion.div>
            ) : (
              filteredRecords.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[16px] shadow-sm p-4 mb-4"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center ${
                          record.attend ? 'bg-[#4CAF50]' : 'bg-[#FF5252]'
                        }`}
                      >
                        {record.attend ? (
                          <FiCheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <FiXCircle className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#333333]">
                          {record.profiles?.full_name || 'Unknown User'}
                        </h3>
                        <p className="text-[13px] text-[#666666]">
                          {record.profiles?.position || 'No Position'} • {record.profiles?.org || 'No Organization'}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full flex items-center space-x-1 ${
                        record.attend ? 'bg-[#4CAF50]' : 'bg-[#FF5252]'
                      }`}
                    >
                      {record.attend ? (
                        <FiCheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <FiXCircle className="w-4 h-4 text-white" />
                      )}
                      <span className="text-[13px] font-semibold text-white">
                        {record.attend ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-[#F0F2F5] mb-3"></div>

                  {/* Time Information */}
                  <div className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-4 h-4 text-[#666666]" />
                      <span className="text-[13px] text-[#666666]">
                        {formatTime(record.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="w-4 h-4 text-[#666666]" />
                      <span className="text-[13px] text-[#666666]">
                        {formatDate(record.day)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecords; 