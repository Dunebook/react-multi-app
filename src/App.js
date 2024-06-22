import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import JokesApp from './components/JokesApp';
import JamendoMusic from './components/JamendoMusic';
import HomePage from './components/tmdb/HomePage';
import MovieDetail from './components/tmdb/MovieDetail';
import { FaSearch } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [searchTerm, setSearchTerm] = useState('');

  const apps = [
    { name: 'Weather App', description: 'Check the weather in any city.', link: '/weather', color: 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700' },
    { name: 'Jokes App', description: 'Get random jokes for a laugh.', link: '/jokes', color: 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700' },
    { name: 'Music player', description: 'Search and listen to music.', link: '/jamendo', color: 'bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700' },
    { name: 'Search Movies', description: 'Search for any movie.', link: '/homepage', color: 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700' },
  ];

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="container mx-auto text-center">
        <Link to="/" className="text-5xl font-bold text-white mb-10 block">Deven's Mini Apps</Link>
        <div className="relative mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for apps..."
            className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200 shadow-md"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          />
          <FaSearch className="absolute top-3 right-4 text-gray-400" size={20} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <Link to={app.link} key={app.name} className="card">
              <div className={`p-6 rounded-lg shadow-lg ${app.color} transition-all duration-300`}>
                <h2 className="text-2xl font-semibold text-white">{app.name}</h2>
                <p className="text-white mt-2">{app.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <Routes>
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/jokes" element={<JokesApp />} />
          <Route path="/jamendo" element={<JamendoMusic />} />
           <Route path="/homepage" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
 
        </Routes>
      </div>
    </div>
  );
}

export default App;
