import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-03-27T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
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

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative h-screen -mt-16">
        {/* Background Image (replacing video) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop"
            alt="Oman Investment Professional" 
            className="w-full h-full object-cover scale-105 filter brightness-[0.85]" 
            loading="lazy" 
          />
          {/* Note: Replace with "/img/oman-investment-professional.jpg" after saving the image to public/img/ */}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9DD4CA]/90 via-black/40 to-[#4C078C]/70 backdrop-blur-[1px] z-10" style={{background: 'linear-gradient(95deg, rgba(76, 7, 140, 0.9), rgba(157, 212, 202, 0.7))'}}></div>
        
        {/* Animated Particles (optional visual element) */}
        <div className="absolute inset-0 z-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#4C078C]/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-[#9DD4CA]/20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-2/3 left-1/2 w-24 h-24 rounded-full bg-[#4C078C]/20 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div 
              className="space-y-10"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              {/* Main Heading */}
              <motion.div variants={fadeIn} className="text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium mb-6">
                  March 27, 2025
                </span>
                <h1 className="text-5xl font-bold text-white md:text-7xl xl:text-8xl tracking-tight leading-none">
                  <span className="block bg-gradient-to-r from-white via-[#D6F0EB] to-[#C9B8E0] bg-clip-text text-transparent pb-2">
                    OMAN INVESTMENT
                  </span>
                  <span className="block bg-gradient-to-r from-[#C9B8E0] via-[#D6F0EB] to-white bg-clip-text text-transparent">
                    FORUM 2025
                  </span>
                </h1>
                <motion.p 
                  variants={fadeIn}
                  className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl text-[#E8F5F2] font-light leading-relaxed"
                >
                  Your gateway to unlimited investment opportunities in Oman.
                </motion.p>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div variants={fadeIn} className="mt-16">
                <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Minutes' },
                    { value: timeLeft.seconds, label: 'Seconds' }
                  ].map((item, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4C078C]/30 to-[#9DD4CA]/30 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                      <div className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 overflow-hidden group-hover:bg-white/15 transition-all duration-300">
                        <div className="text-3xl sm:text-5xl font-bold text-[#E8F5F2] countdown-number">{item.value}</div>
                        <div className="text-[#D6F0EB]/90 text-xs sm:text-base font-medium mt-1">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div variants={fadeIn} className="mt-12 text-center">
                
               
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-[#D6F0EB]/80 text-sm mb-2">Scroll Down</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#D6F0EB]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home; 