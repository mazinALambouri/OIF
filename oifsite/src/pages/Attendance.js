import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrReader } from 'react-qr-reader';

const Attendance = () => {
  const [scanResult, setScanResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result?.text);
      // Here you would typically send this data to your backend
      console.log('QR Code scanned:', result.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Attendance Management
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage attendance and scan QR codes
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Actions Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              <div className="mt-4 space-y-4">
                <button
                  onClick={() => setShowScanner(!showScanner)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showScanner ? 'Close Scanner' : 'Scan QR Code'}
                </button>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View Attendance Records
                </button>
              </div>
            </div>
          </motion.div>

          {/* QR Scanner Card */}
          {showScanner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">QR Scanner</h3>
                <div className="mt-4">
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onResult={handleScan}
                    style={{ width: '100%' }}
                  />
                </div>
                {scanResult && (
                  <div className="mt-4 p-4 bg-green-50 rounded-md">
                    <p className="text-sm text-green-800">Scanned: {scanResult}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Recent Activity Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <div className="mt-4 space-y-4">
                <div className="text-sm text-gray-500">
                  <p>Last scan: {scanResult ? new Date().toLocaleString() : 'No recent scans'}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Total attendance today: 0</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Attendance; 