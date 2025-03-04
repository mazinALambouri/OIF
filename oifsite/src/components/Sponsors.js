import React from 'react';
import cnnLogo from '../assets/img/CNN.png';
import omanLogo from '../assets/img/Oman.png';
import soharLogo from '../assets/img/sohar.png';
import tourismLogo from '../assets/img/tourism.png';
import commerceLogo from '../assets/img/commerce.png';

const Sponsors = () => {
  const topRowSponsors = [
    {
      name: "CNN",
      image: cnnLogo,
      height: "h-20",
      width: "w-40"
    },
    {
      name: "Advantage",
      image: omanLogo,
      height: "h-32",
      width: "w-56"
    },
    {
      name: "Sohar",
      image: soharLogo,
      height: "h-32",
      width: "w-56"
    }
  ];

  const bottomRowSponsors = [
    {
      name: "Tourism",
      image: tourismLogo,
      height: "h-32",
      width: "w-56"
    },
    {
      name: "Commerce",
      image: commerceLogo,
      height: "h-48",
      width: "w-80",
      extraClasses: "-mt-4"
    }
  ];

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Sponsors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proudly supported by industry leaders who share our vision for innovation and technological advancement
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
          {/* First row sponsors */}
          {topRowSponsors.map((sponsor, index) => (
            <div key={index} className="sponsor-card">
              <img 
                src={sponsor.image} 
                alt={sponsor.name}
                className={`${sponsor.height} ${sponsor.width} object-contain filter grayscale hover:grayscale-0 transition-all duration-300`}
              />
            </div>
          ))}
          
          {/* Second row sponsors (centered) */}
          <div className="col-span-3 flex justify-center gap-12">
            {bottomRowSponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-card">
                <img 
                  src={sponsor.image} 
                  alt={sponsor.name}
                  className={`${sponsor.height} ${sponsor.width} object-contain filter grayscale hover:grayscale-0 transition-all duration-300 ${sponsor.extraClasses || ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors; 