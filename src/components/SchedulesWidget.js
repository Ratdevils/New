import React, { useState, useEffect } from 'react';
import './SchedulesWidget.css';

const SchedulesWidget = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [activeDay, setActiveDay] = useState('monday');
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  useEffect(() => {
    // Fetch API data for airing schedule
    const url = 'https://consumetapi-eight.vercel.app/meta/anilist/airing-schedule';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns data sorted by day
        setScheduleData(data);
      })
      .catch((error) => console.error('Error fetching schedule:', error));
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
        {scheduleData[activeDay]?.map((item) => (
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
        ))}
      </div>
    </div>
  );
};

export default SchedulesWidget;
