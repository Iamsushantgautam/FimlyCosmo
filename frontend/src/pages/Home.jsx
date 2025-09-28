import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API}/movies`).then(res => setMovies(res.data)).catch(console.error);
  }, []);

   return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Movies</h2>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))'
        }}
      >
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
