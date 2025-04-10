import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient.js';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [eventPassed, setEventPassed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);

    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-04-27T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      // Check if it's been 4 days since the event
      const fourDaysAfterEvent = targetDate + (4 * 24 * 60 * 60 * 1000);
      if (now >= fourDaysAfterEvent) {
        setEventPassed(true);
      }

      if (difference <= 0) {
        setCountdownFinished(true);
        return {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        };
      }

      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0')
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Scale in animation for background image
  const scaleIn = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { 
      scale: 1.05, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      } 
    }
  };

  // Slide up animation for content
  const slideUp = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.3
      } 
    }
  };

  // Split title into two parts if it exists, otherwise use default text
  const getFormattedTitle = () => {
    return {
      firstPart: "ADVANTAGE  OMAN ",
      secondPart: " FORUM  2025"
    };
  };

  const title = getFormattedTitle();

  return (
    <AnimatePresence>
      <motion.section
        id="home"
        className="relative overflow-hidden"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={pageEntrance}
      >
        <div className="relative h-screen -mt-16">
          {/* Background Image with animation */}
          <motion.div 
            className="absolute inset-0 w-full h-full z-0"
            variants={scaleIn}
          >
            <img 
              src={require("../assets/img/stregis.png")} 
              alt="Oman Investment Professional" 
              className="w-full h-full object-cover scale-105 filter brightness-[0.85]" 
              loading="lazy" 
            />
          </motion.div>

          {/* Gradient Overlay with animation */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-[#9DD4CA]/90 via-black/40 to-[#4C078C]/70 backdrop-blur-[1px] z-10" 
            style={{background: 'linear-gradient(95deg, rgba(76, 7, 140, 0.9), rgba(157, 212, 202, 0.7))'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          ></motion.div>
          
          {/* Animated Particles with enhanced animation */}
          <motion.div 
            className="absolute inset-0 z-10 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.div 
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#4C078C]/20 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-[#9DD4CA]/20 blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2] 
              }}
              transition={{ 
                duration: 5,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div 
              className="absolute top-2/3 left-1/2 w-24 h-24 rounded-full bg-[#4C078C]/20 blur-3xl"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.6, 0.2] 
              }}
              transition={{ 
                duration: 6,
                delay: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="relative z-20 flex items-center justify-center h-full"
            variants={slideUp}
          >
            <div className="mx-auto max-w-7xl px-6">
              <motion.div 
                className="space-y-10"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                {/* Main Heading */}
                <motion.div variants={fadeIn} className="text-center">
                  <motion.span 
                    className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    April 27, 2025
                  </motion.span>
                  <h1 className="text-5xl font-bold text-white md:text-7xl xl:text-8xl tracking-tight leading-none">
                    <motion.span 
                      className="block bg-gradient-to-r from-white via-[#D6F0EB] to-[#C9B8E0] bg-clip-text text-transparent pb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 1 }}
                    >
                      {title.firstPart}
                    </motion.span>
                    <motion.span 
                      className="block bg-gradient-to-r from-[#C9B8E0] via-[#D6F0EB] to-white bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 1.3 }}
                    >
                      {title.secondPart}
                    </motion.span>
                  </h1>
                  <motion.p 
                    variants={fadeIn}
                    className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-[#E8F5F2] font-light leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.6 }}
                  >
                    Shaping the Future of Investment
                  </motion.p>
                </motion.div>

                {/* Countdown Timer - Only show if countdown is not finished and event hasn't passed 4 days */}
                {!countdownFinished && !eventPassed && (
                  <motion.div 
                    variants={fadeIn} 
                    className="mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.9 }}
                  >
                    <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
                      {[
                        { value: timeLeft.days, label: 'Days' },
                        { value: timeLeft.hours, label: 'Hours' },
                        { value: timeLeft.minutes, label: 'Minutes' },
                        { value: timeLeft.seconds, label: 'Seconds' }
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="relative group"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 2 + (index * 0.2) }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#4C078C]/30 to-[#9DD4CA]/30 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                          <div className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 overflow-hidden group-hover:bg-white/15 transition-all duration-300">
                            <div className="text-3xl sm:text-5xl font-bold text-[#E8F5F2] countdown-number">{item.value}</div>
                            <div className="text-[#D6F0EB]/90 text-xs sm:text-base font-medium mt-1">{item.label}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Event Started Message - Show when countdown is finished but only until 4 days after event */}
                {countdownFinished && !eventPassed && (
                  <motion.div 
                    variants={fadeIn} 
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.9 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto">
                      <h2 className="text-3xl font-bold text-[#E8F5F2]">The Event Has Started!</h2>
                      <p className="text-[#D6F0EB]/90 text-xl mt-3">
                        Join us at the Oman Investment Forum 2025 for exciting opportunities and networking.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Call to Action */}
                <motion.div 
                  variants={fadeIn} 
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                >
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Home; 