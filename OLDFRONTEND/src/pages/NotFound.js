
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral text-accent">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Página no encontrada</h2>
        <p className="text-lg mb-8">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
        <Link 
          to="/" 
          className="inline-block font-bold py-2 px-6 rounded-full shadow transition-colors duration-300 bg-secondary text-accent hover:bg-yellow-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
