import React from "react";
import { Workshop } from "@/services/api";
import { Calendar, Users, MapPin, ArrowRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkshopCardProps {
  workshop: Workshop;
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  // Format date if it exists
  const formattedDate = workshop.date 
    ? new Date(workshop.date).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-sm font-medium">Taller</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold leading-tight">{workshop.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-grow">
          {workshop.description}
        </p>

        {/* Workshop Details */}
        <div className="space-y-3 mb-6">
          {formattedDate && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formattedDate}</span>
            </div>
          )}
          {workshop.mode && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="capitalize">{workshop.mode}</span>
            </div>
          )}
          {workshop.capacity && (
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Users className="w-4 h-4 text-accent" />
              <span>Cupo máximo: {workshop.capacity} personas</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {formattedDate && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              <Calendar className="w-3 h-3 mr-1" />
              Próximamente
            </span>
          )}
          {workshop.mode && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <MapPin className="w-3 h-3 mr-1" />
              {workshop.mode}
            </span>
          )}
          {workshop.capacity && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <Users className="w-3 h-3 mr-1" />
              {workshop.capacity} plazas
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg"
        >
          <span>Más información</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
