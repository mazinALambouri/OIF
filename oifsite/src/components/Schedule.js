import React, { useState } from 'react';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('day1');

  const scheduleData = {
    day1: {
      title: "Opening Day",
      date: "December 10, 2024",
      events: [
        {
          time: "09:00 - 10:30",
          title: "Opening Ceremony",
          description: "Welcome address and keynote speech"
        },
        {
          time: "11:00 - 12:30",
          title: "Future of Space",
          description: "Panel discussion with industry leaders"
        },
        {
          time: "14:00 - 16:00",
          title: "Innovation Showcase",
          description: "Exhibition of latest technologies"
        }
      ]
    },
    day2: {
      title: "Main Event Day",
      date: "December 11, 2024",
      events: [
        {
          time: "09:00 - 11:00",
          title: "Investment Forum",
          description: "Presentations and networking"
        },
        {
          time: "11:30 - 13:00",
          title: "Space Exploration",
          description: "Technical sessions and workshops"
        },
        {
          time: "14:30 - 16:30",
          title: "Startup Pitches",
          description: "Emerging companies showcase"
        }
      ]
    },
    day3: {
      title: "Closing Day",
      date: "December 12, 2024",
      events: [
        {
          time: "09:00 - 10:30",
          title: "Future Trends",
          description: "Industry insights and forecasts"
        },
        {
          time: "11:00 - 13:00",
          title: "Partnership Summit",
          description: "Collaboration opportunities"
        },
        {
          time: "14:00 - 16:00",
          title: "Closing Ceremony",
          description: "Awards and final remarks"
        }
      ]
    }
  };

  return (
    <section id="schedule" className="py-16 relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-20 top-20 w-72 h-72 bg-indigo-200 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Program</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Featured Agenda & Highlights</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-700 mt-6">Explore the key highlights of each day</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 mb-8 px-2 sm:px-4">
          {['day1', 'day2', 'day3'].map((day, index) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm w-full sm:w-auto
                ${activeTab === day 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-lg transform hover:-translate-y-1'
                }`}
            >
              Day {index + 1}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="tab-contents relative">
          {Object.entries(scheduleData).map(([day, data]) => (
            <div
              key={day}
              className={`transition-all duration-500 ${activeTab === day ? 'block' : 'hidden'}`}
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-4 sm:p-8 hover:shadow-2xl transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-indigo-600">{data.title}</h3>
                  <p className="text-gray-600">{data.date}</p>
                </div>
                <div className="grid gap-3 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {data.events.map((event, index) => (
                    <div 
                      key={index}
                      className="schedule-item bg-indigo-50 rounded-lg p-3 sm:p-6 transition transform hover:scale-105 hover:shadow-md"
                    >
                      <p className="text-indigo-600 font-semibold text-sm">{event.time}</p>
                      <h4 className="text-lg font-bold mt-2">{event.title}</h4>
                      <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule; 