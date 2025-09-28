import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadForm from '../components/UploadForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const handleUploaded = (newMovie) => {
    setMovies(prev => [newMovie, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!token) return alert('Not authorized');
    if (!window.confirm('Delete movie?')) return;
    try {
      await axios.delete(`${API}/movies/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setMovies(prev => prev.filter(m => m._id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  return (
    <div>
      <h2>Admin</h2>

      {!token ? (
        <div style={{ display: 'flex', gap: 40 }}>
          <div>
            <h3>Login</h3>
            <LoginForm onLogin={handleLogin} />
          </div>
          <div>
            <h3>Register</h3>
            <RegisterForm onRegister={handleLogin} />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 12 }}>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <UploadForm token={token} onUploaded={handleUploaded} />

          <h3 style={{ marginTop: 20 }}>Movies</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
            {movies.map(m => (
              <div key={m._id} style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
                {m.posterUrl && <img src={m.posterUrl} style={{ width: '100%', height: 180, objectFit: 'cover' }} alt={m.title} />}
                <strong>{m.title}</strong>
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => handleDelete(m._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
