import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 6 }} />}
      <h3>{movie.title} ({movie.year || '—'})</h3>
      <p>{movie.description}</p>
      {movie.screenshots && movie.screenshots.length > 0 && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginTop: 8 }}>
          {movie.screenshots.map((s,i) => <img key={i} src={s} alt={`ss-${i}`} style={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 4 }} />)}
        </div>
      )}
    </div>
  );
}
