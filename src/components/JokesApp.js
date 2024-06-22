import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JokesApp() {
  const [joke, setJoke] = useState('');

  const fetchJoke = async () => {
    const url = 'https://v2.jokeapi.dev/joke/Any';
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.setup && data.delivery) {
        setJoke(`${data.setup} ... ${data.delivery}`);
      } else {
        setJoke(data.joke);
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Failed to fetch a joke!');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg">
      <h1 className="text-3xl text-white font-bold mb-4">Random Joke</h1>
      <p className="text-gray-200 mb-4">{joke}</p>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        onClick={fetchJoke}
      >
        Fetch Another Joke
      </button>
    </div>
  );
}

export default JokesApp;
