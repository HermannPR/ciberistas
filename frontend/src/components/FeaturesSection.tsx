import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Users, 
  BookOpen, 
  Shield, 
  Zap, 
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function FeaturesSection() {  const features = [
    {
      icon: BookOpen,
      title: 'Únete a un Club',
      description: 'Aprende a programar, desarrolla tus habilidades y diviértete. Únete a tu comunidad local de jóvenes creadores.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      link: '/workshops',
      buttonText: 'Encontrar Club'
    },
    {
      icon: Users,
      title: 'Crea un Club',
      description: 'Inspira a jóvenes en tu comunidad. No necesitas experiencia en programación para dirigir un Code Club.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      link: '/contacto',
      buttonText: 'Crear Club'
    },
    {
      icon: Heart,
      title: 'Sé Voluntario',
      description: 'Aprende nuevas habilidades y apoya a la próxima generación de creadores digitales. Involúcrate con tu club local.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      link: '/contacto',
      buttonText: 'Ser Voluntario'
    }
  ];

  const stats = [
    { number: '2+ millones', label: 'jóvenes involucrados en Code Club durante 10 años' },
    { number: '100+ países', label: 'tienen Code Clubs activos' },
    { number: '90%', label: 'de jóvenes aumentan sus habilidades e independencia en programación' }
  ];

  const benefits = [
    'Espacio seguro para crear',
    'Cientos de proyectos gratuitos',
    'Comunidad global de apoyo',
    'Recursos de programación accesibles',
    'Mentores experimentados',
    'Certificaciones reconocidas'
  ];

  return (
    <section id="content" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Únete a la comunidad de{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ciberistas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Los Ciberistas son gratuitos y abiertos para todos los jóvenes en edad escolar. 
            Descubre cómo unirte a un club, crear tu propio club o ser voluntario en tu comunidad.
          </p>
        </div>        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`card-hover group cursor-pointer border-0 shadow-lg ${feature.bgColor} hover:shadow-xl transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Button 
                  asChild 
                  className={`bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold w-full btn-animate shadow-md`}
                >
                  <Link to={feature.link}>
                    {feature.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Un espacio seguro para crear
              </Badge>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                La protección está en el corazón de todo lo que hacemos
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nuestros recursos de protección ayudan a asegurar que tengas las políticas 
                y prácticas correctas para crear espacios seguros e inclusivos donde los 
                jóvenes puedan aprender a programar.
              </p>
              <Button asChild variant="outline" className="font-semibold">
                <Link to="/contacto">
                  Conoce más sobre protección
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coding Projects Section */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
          <Code2 className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">
            Explora nuestros proyectos de programación
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Tenemos cientos de proyectos gratuitos para ayudarte a aprender a programar y 
            ser creativo con la creación digital. Ya seas un programador experimentado o 
            recién comenzando, hay un proyecto para todos.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold btn-animate"
          >
            <Link to="/workshops">
              <Zap className="mr-2 h-5 w-5" />
              Empezar a programar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
