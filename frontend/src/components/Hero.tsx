import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code2, Users, BookOpen, Star, ChevronDown } from 'lucide-react';

export function Hero() {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { label: '2+ millones', sublabel: 'jóvenes involucrados en programación', icon: Users },
    { label: '100+ países', sublabel: 'con comunidades activas', icon: Code2 },
    { label: '90%', sublabel: 'mejoran sus habilidades técnicas', icon: BookOpen },
  ];

  // Rotate stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90" />        {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-pink-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-60 left-1/3 w-14 h-14 bg-yellow-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-40 right-1/4 w-18 h-18 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Badge */}
        <div className="animate-fade-in mb-6">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Star className="w-4 h-4 mr-2" />
            Únete a la comunidad global
          </Badge>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Somos{' '}
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
            Ciberistas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-slide-in-left">
          Aprende a programar, da forma al futuro. Únete a una comunidad global de creadores digitales.
        </p>        {/* Rotating stats */}
        <div className="mb-12 animate-scale-in">
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto border border-white/30 animate-pulse-gentle">
            <div className="flex items-center justify-center space-x-4">
              {React.createElement(stats[currentStat].icon, { className: "w-8 h-8 text-yellow-300" })}
              <div className="text-left">
                <div className="text-3xl font-bold">{stats[currentStat].label}</div>
                <div className="text-sm text-white/80">{stats[currentStat].sublabel}</div>
              </div>
            </div>
          </div>
        </div>{/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4 btn-animate shadow-lg"
          >
            <Link to="/workshops">
              Encuentra un Taller
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-green-500 text-white hover:bg-green-600 border-2 border-green-400 font-semibold text-lg px-8 py-4 btn-animate shadow-lg"
          >
            <Link to="/contacto">
              Crear un Club
            </Link>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce cursor-pointer" onClick={scrollToContent}>
          <ChevronDown className="w-8 h-8 mx-auto text-white/70 hover:text-white transition-colors" />
        </div>
      </div>      {/* Decorative shapes */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24" style={{ transform: 'scaleY(-1)' }}>
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
