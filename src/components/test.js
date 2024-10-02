import React, { useState, useEffect } from 'react';
import './SchedulesWidget.css';

const SchedulesWidget = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [activeDay, setActiveDay] = useState('mon'); // Changed to lowercase for consistency
  const [loading, setLoading] = useState(true); // Added loading state
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  useEffect(() => {
    // Fetch API data for airing schedule
    const url = 'https://consumetapi-eight.vercel.app/meta/anilist/airing-schedule';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data);
        setLoading(false); // Set loading to false after fetching
      })
      .catch((error) => {
        console.error('Error fetching schedule:', error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  return (
    <div className="schedules-widget">
      <div className="widget-header">
        <h2>Estimated Schedule</h2>
        <span className="header-arrow">></span>
      </div>
      <div className="days-nav">
        {days.map((day) => (
          <div
            key={day}
            className={`day-item ${activeDay === day ? 'active' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            {day.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="schedule-list">
        {loading ? ( // Conditional rendering for loading
          <p>Loading...</p>
        ) : (
          scheduleData[activeDay]?.map((item) => (
            <div key={item.id} className="schedule-item">
              <div className="time">{item.time}</div>
              <div className="details">
                <img className="thumbnail" src={item.image} alt={item.title} />
                <div className="title">{item.title}</div>
              </div>
              <div className="episode-box">
                <a href={`/episode/${item.id}`} className="episode-link">
                  Ep {item.episode}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchedulesWidget;
