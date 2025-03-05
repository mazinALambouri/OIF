import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';

const Sponsors = () => {
  const [topRowSponsors, setTopRowSponsors] = useState([]);
  const [bottomRowSponsors, setBottomRowSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default styling for sponsors
  const defaultStyling = {
    "CNN": { height: "h-20", width: "w-40" },
    "Advantage": { height: "h-32", width: "w-56" },
    "Sohar": { height: "h-32", width: "w-56" },
    "Tourism": { height: "h-32", width: "w-56" },
    "Commerce": { height: "h-48", width: "w-80", extraClasses: "-mt-4" }
  };

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        
        // Fetch sponsors from Supabase
        const { data, error } = await supabase
          .from('sponsors')
          .select('id, name, img_sponsor')
          .order('id');
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Sponsors data from Supabase:", data);
          
          // Process the data
          const processedData = data.map(sponsor => {
            console.log(`Processing sponsor: ${sponsor.name}, Image URL: ${sponsor.img_sponsor}`);
            
            // Determine which image to use
            let imageSource;
            if (sponsor.img_sponsor && sponsor.img_sponsor.trim() !== '') {
              // Remove the @ symbol if it exists at the beginning of the URL
              imageSource = sponsor.img_sponsor.startsWith('@') 
                ? sponsor.img_sponsor.substring(1).trim() 
                : sponsor.img_sponsor.trim();
              console.log(`Using Supabase image URL for ${sponsor.name}: ${imageSource}`);
            } else {
              imageSource = null;
              console.log(`No image available for ${sponsor.name}`);
            }
            
            return {
              id: sponsor.id,
              name: sponsor.name,
              image: imageSource,
              // Apply default styling based on name or use generic styling
              ...defaultStyling[sponsor.name] || { height: "h-32", width: "w-56" }
            };
          });
          
          console.log("Processed sponsor data:", processedData);
          
          // Split sponsors into top and bottom rows (first 3 in top, rest in bottom)
          setTopRowSponsors(processedData.slice(0, 3));
          setBottomRowSponsors(processedData.slice(3));
        } else {
          console.log("No data returned from Supabase");
          setError("No sponsors data found");
          setTopRowSponsors([]);
          setBottomRowSponsors([]);
        }
      } catch (err) {
        console.error('Error fetching sponsors:', err);
        setError(err.message);
        setTopRowSponsors([]);
        setBottomRowSponsors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

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

        {/* Loading state */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading sponsors...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">Error loading sponsors: {error}</p>
          </div>
        )}

        {/* Sponsors Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
            {/* First row sponsors */}
            {topRowSponsors.map((sponsor, index) => {
              console.log(`Rendering top row sponsor: ${sponsor.name}, Image:`, sponsor.image);
              return (
                <div key={sponsor.id || index} className="sponsor-card">
                  {sponsor.image && (
                    <img 
                      src={sponsor.image}
                      alt={sponsor.name}
                      className={`${sponsor.height} ${sponsor.width} object-contain filter grayscale hover:grayscale-0 transition-all duration-300 ${sponsor.extraClasses || ''}`}
                      onError={(e) => {
                        console.error(`Error loading image for ${sponsor.name}:`, e);
                        // Try without the @ symbol if it failed
                        if (typeof sponsor.image === 'string' && sponsor.image.includes('@')) {
                          e.target.src = sponsor.image.replace('@', '');
                        } else {
                          // Fallback to a placeholder if image fails to load
                          e.target.src = 'https://via.placeholder.com/150?text=' + sponsor.name;
                        }
                      }}
                    />
                  )}
                  {!sponsor.image && (
                    <div className={`${sponsor.height} ${sponsor.width} flex items-center justify-center bg-gray-100`}>
                      <span className="text-gray-500">{sponsor.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Second row sponsors (centered) */}
            <div className="col-span-3 flex justify-center gap-12">
              {bottomRowSponsors.map((sponsor, index) => {
                console.log(`Rendering bottom row sponsor: ${sponsor.name}, Image:`, sponsor.image);
                return (
                  <div key={sponsor.id || index} className="sponsor-card">
                    {sponsor.image && (
                      <img 
                        src={sponsor.image}
                        alt={sponsor.name}
                        className={`${sponsor.height} ${sponsor.width} object-contain filter grayscale hover:grayscale-0 transition-all duration-300 ${sponsor.extraClasses || ''}`}
                        onError={(e) => {
                          console.error(`Error loading image for ${sponsor.name}:`, e);
                          // Try without the @ symbol if it failed
                          if (typeof sponsor.image === 'string' && sponsor.image.includes('@')) {
                            e.target.src = sponsor.image.replace('@', '');
                          } else {
                            // Fallback to a placeholder if image fails to load
                            e.target.src = 'https://via.placeholder.com/150?text=' + sponsor.name;
                          }
                        }}
                      />
                    )}
                    {!sponsor.image && (
                      <div className={`${sponsor.height} ${sponsor.width} flex items-center justify-center bg-gray-100`}>
                        <span className="text-gray-500">{sponsor.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sponsors; 