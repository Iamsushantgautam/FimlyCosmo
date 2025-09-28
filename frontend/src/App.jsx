import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link> {" | "} <Link to="/admin">Admin</Link>
      </nav>
 {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-20 px-4" style={{ marginBottom: 20,alignItems: 'center' }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FilmyCosmo  </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Explore the latest movies, discover trending films, and enjoy a curated selection
          of posters and screenshots from your favorite movies.
        </p>
      </section>

    <section className="p-4">
      <Outlet />
    </section>  



 {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
        &copy; {new Date().getFullYear()} FilmyCosmo. All rights reserved.
      </footer>


    </div>
  );
}
