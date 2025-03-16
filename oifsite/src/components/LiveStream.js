import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaYoutube, FaVideo } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LiveStream = () => {
  const [streamData, setStreamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreamData();
  }, []);

  const fetchStreamData = async () => {
    try {
      const { data, error } = await supabase
        .from('livestream')
        .select('*')
        .single();

      if (error) throw error;
      setStreamData(data);
    } catch (error) {
      console.error('Error fetching stream data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    // Regular expression to extract YouTube video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) {
    return null; // Don't show anything while loading
  }

  // If no stream data or stream is not live, don't render anything
  if (!streamData || !streamData.is_live) {
    return null;
  }

  const videoId = getYoutubeVideoId(streamData.youtube_url);
  
  // If no valid video ID, don't render anything
  if (!videoId) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="livestream" className="py-24 bg-gradient-to-br from-slate-50 via-secondary/20 to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <span className="inline-block py-2 px-6 bg-secondary/30 text-primary rounded-full text-lg font-semibold tracking-wider mb-4">LIVE NOW</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Livestream
                </span>
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl transform rotate-1 opacity-70"></div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Join us live as we explore the latest insights and opportunities in Oman's investment landscape.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStream; 