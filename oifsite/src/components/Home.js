import React, { useState, useEffect } from 'react';

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

  return (
    <section id="home" className="relative">
      <div className="relative h-screen -mt-16">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105" 
          aria-hidden="true" 
          loading="lazy"
        >
          <source src="/img/ANKAA.mp4" type="video/mp4" />
          <img 
            src="/img/back.png" 
            alt="Background fallback" 
            className="w-full h-full object-cover" 
            loading="lazy" 
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/80 via-transparent to-emerald-950/60 backdrop-blur-[2px] z-10"></div>

        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-white md:text-6xl xl:text-7xl tracking-tight">
                <span className="block bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  OMAN INVESTMENT FORUM 2025
                </span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90 font-light">
                Your gateway to unlimited investment opportunities in Oman.
              </p>

              {/* Countdown Timer */}
              <div className="mt-12">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto px-2 sm:px-0">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4">
                    <div className="text-2xl sm:text-4xl font-bold text-white countdown-number">{timeLeft.days}</div>
                    <div className="text-white/80 text-[10px] sm:text-sm">Days</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4">
                    <div className="text-2xl sm:text-4xl font-bold text-white countdown-number">{timeLeft.hours}</div>
                    <div className="text-white/80 text-[10px] sm:text-sm">Hrs</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4">
                    <div className="text-2xl sm:text-4xl font-bold text-white countdown-number">{timeLeft.minutes}</div>
                    <div className="text-white/80 text-[10px] sm:text-sm">Min</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-2 sm:p-4">
                    <div className="text-2xl sm:text-4xl font-bold text-white countdown-number">{timeLeft.seconds}</div>
                    <div className="text-white/80 text-[10px] sm:text-sm">Sec</div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8">
                <a href="#about" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home; 