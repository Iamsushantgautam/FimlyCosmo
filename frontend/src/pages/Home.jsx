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
    <div>
      <h2>All Movies</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
        {movies.map(m => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  );
}
