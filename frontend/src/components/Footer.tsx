import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Send
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Únete a un club', href: '/workshops' },
    { name: 'Crea un club', href: '/contacto' },
    { name: 'Colabora con nosotros', href: '/contacto' },
    { name: 'Empezar a programar', href: '/workshops' }
  ];

  const resources = [
    { name: 'Recursos', href: '/workshops' },
    { name: 'Acerca de', href: '/' },
    { name: 'Blog', href: '/' },
    { name: 'Eventos', href: '/workshops' }
  ];

  const help = [
    { name: 'Nuestros partners', href: '/' },
    { name: 'Ayuda', href: '/contacto' },
    { name: 'Políticas', href: '/' },
    { name: 'Donar', href: '/contacto' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white animate-fade-in">
            Mantente al día con nuestro newsletter
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Recibe las últimas noticias, recursos y oportunidades de Ciberistas directamente en tu inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Input 
              type="email" 
              placeholder="Tu email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 transition-all duration-300 focus:scale-105"
            />
            <Button 
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Send className="mr-2 h-4 w-4" />
              Suscribirse
            </Button>
          </div>
          <p className="text-xs text-white/70 mt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                Ciberistas
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Ciberistas es parte de la Fundación Raspberry Pi, una organización benéfica educativa 
              con una misión global para ayudar a los jóvenes a realizar su potencial completo a 
              través del poder de la computación y las tecnologías digitales.
            </p>
              {/* Contact Info */}            <div className="space-y-3">
              <div className="flex items-center space-x-3 group hover:translate-x-1 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">soporte@ciberistas.org</span>
              </div>
              <div className="flex items-center space-x-3 group hover:translate-x-1 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">+52 (81) 8358-2000</span>
              </div>
              <div className="flex items-center space-x-3 group hover:translate-x-1 transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Monterrey, Nuevo León, México</span>
              </div>
            </div>
          </div>          {/* Quick Links */}
          <div className="group">
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group/item"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="group">
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Recursos
            </h4>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group/item"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="group">
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Ayuda
            </h4>
            <ul className="space-y-3">
              {help.map((link, index) => (
                <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group/item"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0 animate-fade-in">
            <p>
              Ciberistas es parte de la Fundación Raspberry Pi.{' '}
              <Link to="/" className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300 font-semibold">
                Conoce más
              </Link>
            </p>
            <p className="mt-2">
              © {currentYear} Fundación Raspberry Pi Reino Unido Caridad Registrada 1129409
            </p>
          </div>{/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 group"
                aria-label={social.label}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
