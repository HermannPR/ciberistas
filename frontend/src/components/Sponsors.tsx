import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight, Star, Handshake } from "lucide-react";

// Import sponsor logos using our index file
import { 
  accentureLogo, 
  lenovoLogo, 
  raspberryLogo, 
  tecLogo, 
  udemLogo 
} from "../assets/patrocinadores";

interface Sponsor {
  name: string;
  logo: string;
  alt: string;
  description?: string;
}

interface SponsorsProps {
  patrocinaBtnClassName?: string;
}

export function Sponsors({ patrocinaBtnClassName }: SponsorsProps) {
  const sponsors: Sponsor[] = [
    { 
      name: "Accenture", 
      logo: accentureLogo, 
      alt: "Accenture Logo",
      description: "Líder global en servicios tecnológicos y consultoría"
    },
    { 
      name: "Lenovo", 
      logo: lenovoLogo, 
      alt: "Lenovo Logo",
      description: "Innovación en tecnología personal y empresarial"
    },
    { 
      name: "Raspberry Pi", 
      logo: raspberryLogo, 
      alt: "Raspberry Pi Logo",
      description: "Democratizando la computación y la programación"
    },
    { 
      name: "Tecnológico de Monterrey", 
      logo: tecLogo, 
      alt: "Tecnológico de Monterrey Logo",
      description: "Formando líderes con espíritu emprendedor"
    },
    { 
      name: "UDEM", 
      logo: udemLogo, 
      alt: "UDEM Logo",
      description: "Universidad comprometida con la excelencia"
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20 px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-4">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 animate-fade-in">
            Nuestros Aliados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
            Trabajamos junto a organizaciones líderes que comparten nuestra visión de 
            transformar la educación tecnológica y empoderar a la próxima generación de innovadores.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">5+</h3>
            <p className="text-gray-600">Socios Estratégicos</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500K+</h3>
            <p className="text-gray-600">Jóvenes Impactados</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Compromiso Social</p>
          </div>
        </div>
        
        {/* Sponsors Grid */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {sponsors.map((sponsor, index) => (
              <div 
                key={sponsor.name} 
                className="group flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.alt}
                    className="h-12 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-500 object-contain group-hover:scale-110"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {sponsor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
            <Handshake className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              ¿Tu empresa quiere hacer la diferencia?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a nuestros aliados estratégicos y sé parte de la transformación 
              educativa que está cambiando el futuro de miles de jóvenes.
            </p>
            <Link to="/contacto">
              <Button 
                size="lg"
                className={`bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg ${patrocinaBtnClassName || ''}`}
              >
                <span>Conviértete en Aliado</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
