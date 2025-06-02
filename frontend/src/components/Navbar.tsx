import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Code2, Users, BookOpen, Mail } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/', icon: Code2 },
    { name: 'Talleres', href: '/workshops', icon: BookOpen },
    { name: 'Contacto', href: '/contacto', icon: Mail },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition-all duration-300 hover:scale-105"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Ciberistas
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">          <Button 
            asChild 
            className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/workshops">
              <Users className="mr-2 h-4 w-4" />
              Únete
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden"
              size="icon"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="flex items-center justify-between pb-6">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 font-bold text-xl"
                  onClick={() => setIsOpen(false)}
                >                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Code2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    Ciberistas
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-3 flex-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                          : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-6 border-t">                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/workshops">
                    <Users className="mr-2 h-4 w-4" />
                    Únete a Ciberistas
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
