import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { supabase } from '../supabaseClient';

const QRScanner = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleScan = async (result) => {
    if (result && scanning) {
      setScanning(false); // Prevent multiple scans
      setScanResult(result?.text);

      try {
        // Update attendance record
        const { data, error } = await supabase
          .from('attendance')
          .update({ attend: true })
          .eq('qr', result.text)
          .select()
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setSuccess(true);
          // Automatically navigate back after successful scan
          setTimeout(() => {
            navigate('/attendance/records');
          }, 2000);
        } else {
          setError('No matching QR code found');
          // Reset scanner after 3 seconds
          setTimeout(() => {
            setScanning(true);
            setError(null);
            setScanResult(null);
          }, 3000);
        }
      } catch (err) {
        console.error('Error updating attendance:', err);
        setError(err.message);
        // Reset scanner after 3 seconds
        setTimeout(() => {
          setScanning(true);
          setError(null);
          setScanResult(null);
        }, 3000);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error accessing camera');
  };

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
              Scan QR Code
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Scanner Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[16px] shadow-sm overflow-hidden"
          >
            {/* Status Messages */}
            {error && (
              <div className="p-4 bg-red-50 border-b border-red-100">
                <div className="flex items-center space-x-2">
                  <FiXCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border-b border-green-100">
                <div className="flex items-center space-x-2">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-green-600 text-sm font-medium">
                    Attendance marked successfully!
                  </p>
                </div>
              </div>
            )}

            {/* QR Scanner */}
            <div className="relative aspect-square">
              <QrReader
                onResult={handleScan}
                onError={handleError}
                constraints={{
                  facingMode: 'environment'
                }}
                className="w-full h-full"
              />
              
              {/* Scanner Overlay */}
              <div className="absolute inset-0 border-2 border-[#492E8B] opacity-50">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#492E8B]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#492E8B]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#492E8B]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#492E8B]"></div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 text-center">
              <p className="text-[#666666] text-sm">
                Position the QR code within the frame to scan
              </p>
            </div>
          </motion.div>

          {/* Scan Result */}
          {scanResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-white rounded-[16px] shadow-sm"
            >
              <h3 className="text-[16px] font-semibold text-[#333333] mb-2">
                Scan Result
              </h3>
              <p className="text-[13px] text-[#666666]">{scanResult}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner; 