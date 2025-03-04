import React from 'react';

const Speakers = () => {
  const speakers = [
    {
      name: "Antonio Roberto",
      role: "Founder",
      image: "https://pagedone.io/asset/uploads/1696238374.png"
    },
    {
      name: "Patricia Angely",
      role: "Co-Founder",
      image: "https://pagedone.io/asset/uploads/1696238396.png"
    },
    {
      name: "Jerom Bell",
      role: "Chairman",
      image: "https://pagedone.io/asset/uploads/1696238411.png"
    },
    {
      name: "Yasmine Tano",
      role: "CEO",
      image: "https://pagedone.io/asset/uploads/1696238425.png"
    },
    {
      name: "Martin Darbys",
      role: "Product Manager",
      image: "https://pagedone.io/asset/uploads/1696238446.png"
    }
  ];

  return (
    <section id="speakers" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-manrope text-5xl text-center font-bold text-gray-900">Our Speakers</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8">
          {speakers.map((speaker, index) => (
            <div key={index} className="group text-center transform transition duration-500 hover:scale-105">
              <div className="relative mb-4 sm:mb-6">
                <img 
                  src={speaker.image}
                  alt={`${speaker.name} image`}
                  className="w-28 h-28 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-transparent transition-all duration-500 group-hover:border-indigo-600"
                />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 group-hover:text-indigo-600">
                {speaker.name}
              </h4>
              <span className="text-gray-500 transition-all duration-500 group-hover:text-gray-900">
                {speaker.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers; 