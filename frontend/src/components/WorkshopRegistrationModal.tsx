import React, { useState } from 'react';
import { Workshop, createWorkshopRegistration } from '@/services/api';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Calendar, Users, MapPin, Mail, Phone, User, GraduationCap, MessageSquare } from 'lucide-react';

interface WorkshopRegistrationModalProps {
  workshop: Workshop;
  isOpen: boolean;
  onClose: () => void;
}

interface RegistrationForm {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  education: string;
  experience: string;
  motivation: string;
}

const educationLevels = [
  { value: 'secundaria', label: 'Secundaria' },
  { value: 'preparatoria', label: 'Preparatoria/Bachillerato' },
  { value: 'universidad', label: 'Universidad' },
  { value: 'posgrado', label: 'Posgrado' },
  { value: 'otro', label: 'Otro' }
];

const experienceLevels = [
  { value: 'ninguno', label: 'Sin experiencia previa' },
  { value: 'basico', label: 'Conocimientos básicos' },
  { value: 'intermedio', label: 'Nivel intermedio' },
  { value: 'avanzado', label: 'Nivel avanzado' }
];

export function WorkshopRegistrationModal({ workshop, isOpen, onClose }: WorkshopRegistrationModalProps) {
  const [formData, setFormData] = useState<RegistrationForm>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    education: '',
    experience: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const required = ['fullName', 'email', 'phone', 'age', 'education', 'experience'];
    return required.every(field => formData[field as keyof RegistrationForm].trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }    setIsSubmitting(true);
    
    try {
      // Crear el objeto de inscripción
      const registrationData = {
        id_taller: workshop.id,
        nombre_completo: formData.fullName,
        email: formData.email,
        telefono: formData.phone,
        edad: parseInt(formData.age),
        nivel_educativo: formData.education,
        experiencia: formData.experience,
        motivacion: formData.motivation
      };

      // Llamar a la API para crear la inscripción
      const result = await createWorkshopRegistration(registrationData);
      
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito al taller "${workshop.name}". Te contactaremos pronto con más detalles.`,
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        age: '',
        education: '',
        experience: '',
        motivation: ''
      });
        onClose();
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Error en la inscripción",
        description: error.message || "Hubo un problema al procesar tu inscripción. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = workshop.date 
    ? new Date(workshop.date).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      })
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Inscripción al Taller
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-gray-700">
            {workshop.name}
          </DialogDescription>
        </DialogHeader>

        {/* Workshop Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {formattedDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{formattedDate}</span>
              </div>
            )}
            {workshop.mode && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="font-medium capitalize">{workshop.mode}</span>
              </div>
            )}
            {workshop.capacity && (
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="font-medium">{workshop.capacity} plazas</span>
              </div>
            )}
          </div>
          {workshop.requirements && (
            <div className="mt-3 pt-3 border-t border-white/50">
              <p className="text-sm text-gray-600">
                <strong>Requisitos:</strong> {workshop.requirements}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Nombre completo *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="age" className="text-sm font-medium">
                  Edad *
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="10"
                  max="99"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Tu edad"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+52 123 456 7890"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información Académica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
              Información Académica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education" className="text-sm font-medium">
                  Nivel educativo *
                </Label>
                <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel educativo" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experience" className="text-sm font-medium">
                  Experiencia en tecnología *
                </Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu nivel de experiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Motivación */}
          <div>
            <Label htmlFor="motivation" className="text-sm font-medium flex items-center">
              <MessageSquare className="w-4 h-4 mr-1 text-purple-600" />
              ¿Por qué te interesa este taller? (Opcional)
            </Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              placeholder="Cuéntanos qué te motiva a participar en este taller..."
              rows={3}
            />
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !validateForm()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </>
              ) : (
                'Confirmar Inscripción'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
