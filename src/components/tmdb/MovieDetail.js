import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_KEY = '32ed0bb43667fb02f2de66cc160d8947';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-lg mb-4 sm:mb-0 sm:mr-4" />
        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
          <p className="mb-4">{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
