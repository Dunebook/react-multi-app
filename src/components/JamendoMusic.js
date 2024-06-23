import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_KEY = 'add key here';

function JamendoMusic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fetch top tracks on component mount
    fetchTopTracks();
  }, []);

  const fetchTopTracks = async () => {
    try {
      const response = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
        params: {
          client_id: API_KEY,
          format: 'json',
          limit: 10,
          order: 'popularity_week',
        },
      });
      setTracks(response.data.results);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
        params: {
          client_id: API_KEY,
          format: 'json',
          limit: 10,
          search: searchTerm,
        },
      });
      setTracks(response.data.results);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === selectedTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setSelectedTrack(tracks[nextIndex]);
    setIsPlaying(false);
  };

  const handlePreviousTrack = () => {
    const currentIndex = tracks.findIndex(track => track.id === selectedTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setSelectedTrack(tracks[prevIndex]);
    setIsPlaying(false);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-white">
      <div className="max-w-md mx-auto mb-4 bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for music..."
          className="w-full p-2 rounded border border-gray-300 text-gray-700"
        />
        <button onClick={handleSearch} className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Search
        </button>
      </div>
      {selectedTrack && (
        <div className="mb-8 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg text-center">
          <h2 className="text-2xl mb-4">{selectedTrack.name} by {selectedTrack.artist_name}</h2>
          <div className="flex justify-center items-center space-x-4">
            {selectedTrack.album_image && <img src={selectedTrack.album_image} alt={selectedTrack.name} className="w-24 h-24 rounded-lg" />}
            <div className="flex space-x-4">
              <button onClick={handlePreviousTrack} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                Previous
              </button>
              <button onClick={handlePlayPause} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleNextTrack} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                Next
              </button>
            </div>
          </div>
          <audio id="audio-player" ref={audioRef} controls src={selectedTrack.audio} className="w-full mt-2 hidden"></audio>
        </div>
      )}
      <ul className="mt-4 space-y-4">
        {tracks.map((track) => (
          <li key={track.id} onClick={() => setSelectedTrack(track)} className="cursor-pointer p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg hover:bg-opacity-30 transition-colors">
            <div className="flex items-center space-x-4">
              {track.album_image && <img src={track.album_image} alt={track.name} className="w-16 h-16 rounded-lg" />}
              <div>
                <h3 className="text-xl">{track.name}</h3>
                <p className="text-gray-300">{track.artist_name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JamendoMusic;
