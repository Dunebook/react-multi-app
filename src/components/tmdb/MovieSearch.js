import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const API_KEY = '32ed0bb43667fb02f2de66cc160d8947';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-10">Movie Database</h1>
        <div className="relative mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for movies..."
            className="w-full p-4 pl-12 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200 shadow-md"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          />
          <FaSearch className="absolute top-3 left-4 text-gray-400" size={20} />
          <button
            onClick={handleSearch}
            className="absolute top-3 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
          >
            <FaSearch />
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-10">
            <h2 className="text-4xl font-bold text-white mb-4">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="relative">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg mb-2" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-lg">
                    <h3 className="text-lg text-white font-bold">{movie.title}</h3>
                    <p className="text-gray-400">{movie.release_date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-white mb-4">Top Rated Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topRatedMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="relative">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg mb-2" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-lg">
                  <h3 className="text-lg text-white font-bold">{movie.title}</h3>
                  <p className="text-gray-400">{movie.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSearch;
