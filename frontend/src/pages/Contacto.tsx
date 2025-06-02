
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Building2, 
  Users, 
  Star, 
  ArrowLeft,
  CheckCircle,
  Handshake,
  Trophy,
  Globe
} from 'lucide-react';

const Contacto = () => {
  const benefits = [
    {
      icon: Globe,
      title: 'Visibilidad Global',
      description: 'Tu marca alcanzará a miles de jóvenes y familias en toda la región.'
    },
    {
      icon: Trophy,
      title: 'Reconocimiento',
      description: 'Serás reconocido como líder en educación tecnológica y responsabilidad social.'
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Conecta con talento joven y otros líderes de la industria tecnológica.'
    },
    {
      icon: Heart,
      title: 'Impacto Social',
      description: 'Contribuye directamente al desarrollo de la próxima generación de innovadores.'
    }
  ];

  const sponsorshipLevels = [
    {
      level: 'Platino',
      amount: '$50,000+',
      color: 'from-slate-400 to-slate-600',
      benefits: ['Logo principal en todos los materiales', 'Naming rights de eventos', 'Acceso VIP a demostraciones']
    },
    {
      level: 'Oro',
      amount: '$25,000+',
      color: 'from-yellow-400 to-yellow-600',
      benefits: ['Logo destacado en sitio web', 'Presencia en eventos', 'Reportes de impacto']
    },
    {
      level: 'Plata',
      amount: '$10,000+',
      color: 'from-gray-300 to-gray-500',
      benefits: ['Logo en materiales', 'Menciones en redes sociales', 'Certificado de patrocinio']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Handshake className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Únete a Nosotros
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-delay">
            Sé parte del cambio y ayuda a formar la próxima generación de innovadores tecnológicos
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Partnership Section */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-12">
                <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Interesado en Patrocinar?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Únete a empresas líderes que están transformando el futuro de la educación tecnológica. 
                  Como patrocinador, tendrás un impacto directo en la vida de cientos de jóvenes.
                </p>
              </div>
              
              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="text-center group animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Sponsorship Levels */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Niveles de Patrocinio</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {sponsorshipLevels.map((level, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className={`bg-gradient-to-r ${level.color} text-white rounded-xl p-4 text-center mb-4`}>
                        <h4 className="text-xl font-bold">{level.level}</h4>
                        <p className="text-2xl font-bold">{level.amount}</p>
                      </div>
                      <ul className="space-y-2">
                        {level.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">¿Listo para hacer la diferencia?</h3>
                <p className="text-blue-100 mb-6">
                  Contáctanos para obtener más información sobre cómo convertirte en patrocinador y conocer nuestro impacto en detalle.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <a 
                    href="mailto:patrocinios@ciberistas.org" 
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/30 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>patrocinios@ciberistas.org</span>
                  </a>
                  <a 
                    href="tel:+528113456789" 
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/30 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+52 (81) 1234-5678</span>
                  </a>
                </div>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 font-bold"
                >
                  Solicitar Información Completa
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 mb-16">
            <div className="text-center mb-12">
              <MapPin className="w-16 h-16 text-secondary mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Información de Contacto</h2>
              <p className="text-xl text-gray-600">
                Estamos aquí para responder todas tus preguntas
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">info@ciberistas.org</p>
                <p className="text-gray-600">contacto@ciberistas.org</p>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Teléfono</h3>
                <p className="text-gray-600">+52 (81) 1234-5678</p>
                <p className="text-gray-600">WhatsApp: +52 (81) 9876-5432</p>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ubicación</h3>
                <p className="text-gray-600">Monterrey, Nuevo León</p>
                <p className="text-gray-600">México</p>
              </div>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="text-center">
            <Link to="/">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white hover:bg-gray-50 border-2 border-primary text-primary font-bold"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
