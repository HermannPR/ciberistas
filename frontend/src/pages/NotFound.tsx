
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Code2 } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-green-400/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }}></div>
      </div>

      <div className="text-center p-8 relative z-10 max-w-2xl mx-auto">
        {/* Error Code with Gradient */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full p-4 shadow-lg animate-bounce">
            <Search className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          ¡Ups! Página no encontrada
        </h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Parece que esta página se fue a programar a otro servidor. 
          No te preocupes, ¡podemos ayudarte a encontrar lo que buscas!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Volver al Inicio
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg"
            variant="outline"
            className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/workshops">
              <Code2 className="mr-2 h-5 w-5" />
              Ver Talleres
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-gray-600 mb-4">
            Si llegaste aquí siguiendo un enlace, es posible que hayamos movido la página.
          </p>
          <Link 
            to="/contacto" 
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Contáctanos →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
