import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const LiveStream = () => {
  const [streamData, setStreamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchStreamData();
    // Set visible after component mounts to trigger animations
    setIsVisible(true);
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

  // If no stream data or no valid URL, don't render anything
  if (!streamData || !streamData.youtube_url) {
    return null;
  }

  const videoId = getYoutubeVideoId(streamData.youtube_url);
  
  // If no valid video ID, don't render anything
  if (!videoId) {
    return null;
  }

  // Page entrance animation
  const pageEntrance = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        when: "beforeChildren"
      }
    }
  };

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
  
  // Animation for the background elements
  const bgAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2 }
    }
  };
  
  // Animation for the video container
  const videoContainerAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: 0.8
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.section 
        id="livestream" 
        className="py-24 bg-gradient-to-br from-slate-50 via-secondary/20 to-primary/10 relative overflow-hidden"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={pageEntrance}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          variants={bgAnimation}
        >
          <motion.div 
            className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-0 -right-40 w-80 h-80 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 10,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute -bottom-40 left-20 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.6, 0.2] 
            }}
            transition={{ 
              duration: 12,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
        </motion.div>

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
            </motion.div>

            <motion.div 
              variants={videoContainerAnimation}
              className="relative"
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl transform rotate-1 opacity-70"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 0.7, rotate: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              ></motion.div>
              <motion.div 
                className="relative overflow-hidden rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 70,
                  damping: 15,
                  delay: 1.3
                }}
              >
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default LiveStream; 