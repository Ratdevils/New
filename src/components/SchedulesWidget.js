import './SchedulesWidget.css'; // Adjust the path if necessary
import React, { useState, useEffect } from 'react';

const SchedulesWidget = () => {
  const [scheduleData, setScheduleData] = useState({});
  const [activeDay, setActiveDay] = useState('monday');

  useEffect(() => {
    // Fetch API data
    const url = 'https://consumetapi-eight.vercel.app/meta/anilist/airing-schedule';
    
    fetch(url)
      .then(response => response.json())
      .then(data => populateSchedule(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const populateSchedule = (episodes) => {
    const data = {};
    episodes.forEach(anime => {
      const airingTime = new Date(anime.airingAt * 1000);
      const dayName = airingTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      if (!data[dayName]) {
        data[dayName] = [];
      }

      data[dayName].push({
        id: anime.id,
        image: anime.image,
        title: anime.title.romaji,
        episode: anime.episode,
        time: airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        genres: anime.genres.join(', '),
      });
    });
    setScheduleData(data);
  };

  const showDay = (day) => {
    setActiveDay(day);
  };

  return (
    <div className="schedule-widget">
      <h2>Estimated Schedule</h2>
      <div className="tabs">
        <button onClick={() => showDay('monday')}>Mon</button>
        <button onClick={() => showDay('tuesday')}>Tue</button>
        <button onClick={() => showDay('wednesday')}>Wed</button>
        <button onClick={() => showDay('thursday')}>Thu</button>
        <button onClick={() => showDay('friday')}>Fri</button>
        <button onClick={() => showDay('saturday')}>Sat</button>
        <button onClick={() => showDay('sunday')}>Sun</button>
      </div>

      <div className="days-container">
        {Object.keys(scheduleData).map((day) => (
          <div
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            id={day}
            key={day}
            style={{ display: activeDay === day ? 'block' : 'none' }}
          >
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            <div className="episode-list">
              {scheduleData[day]?.map(anime => (
                <a href={`your-episode-url/${anime.id}`} className="episode-item" key={anime.id} target="_blank" rel="noopener noreferrer">
                  <img src={anime.image} alt={anime.title} />
                  <div className="episode-details">
                    <h4>{anime.title}</h4>
                    <p>Episode {anime.episode}</p>
                    <p>Airs at: {anime.time}</p>
                    <p>{anime.genres}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulesWidget;
