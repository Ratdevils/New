import React, { useEffect, useState } from 'react';
import './SchedulesWidget.css'; // Ensure the correct path

const SchedulesWidget = () => {
    const [episodes, setEpisodes] = useState([]);
    const [activeDay, setActiveDay] = useState('monday');

    useEffect(() => {
        const url = 'https://consumetapi-eight.vercel.app/meta/anilist/airing-schedule';

        fetch(url)
            .then(response => response.json())
            .then(data => setEpisodes(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const showDay = (day) => {
        setActiveDay(day);
    };

    const getEpisodesForDay = (day) => {
        const dayEpisodes = episodes.filter(anime => {
            const airingTime = new Date(anime.airingAt * 1000);
            return airingTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === day;
        });
        return dayEpisodes;
    };

    return (
        <div className="schedule-widget">
            <h2>Estimated Schedule</h2>
            <div className="tabs">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <button 
                        key={day} 
                        onClick={() => showDay(day)} 
                        className={activeDay === day ? 'active' : ''}
                    >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                    </button>
                ))}
            </div>
            <div className="days-container">
                <div className="day-tab" id="monday">
                    <h3>Monday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('monday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="day-tab" id="tuesday">
                    <h3>Tuesday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('tuesday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="day-tab" id="wednesday">
                    <h3>Wednesday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('wednesday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="day-tab" id="thursday">
                    <h3>Thursday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('thursday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="day-tab" id="friday">
                    <h3>Friday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('friday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="day-tab" id="saturday">
                    <h3>Saturday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('saturday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className="day-tab" id="sunday">
                    <h3>Sunday</h3>
                    <div className="episode-list">
                        {getEpisodesForDay('sunday').map(anime => {
                            const airingTime = new Date(anime.airingAt * 1000);
                            return (
                                <a 
                                    href={`your-episode-url/${anime.id}`} 
                                    className="episode-item" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    key={anime.id}
                                >
                                    <img src={anime.image} alt={anime.title.romaji} />
                                    <div className="episode-details">
                                        <h4>{anime.title.romaji}</h4>
                                        <p>Episode {anime.episode}</p>
                                        <p>Airs at: {airingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>{anime.genres.join(', ')}</p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulesWidget;
