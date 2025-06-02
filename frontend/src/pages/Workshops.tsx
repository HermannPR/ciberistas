import React, { useState, useEffect } from "react";
import { getTalleres, Workshop } from "@/services/api";
import { WorkshopCard } from "@/components/WorkshopCard";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Code2, Users, Sparkles } from "lucide-react";

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkshops() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTalleres();
        setWorkshops(data);
      } catch (err) {
        console.error("Failed to load workshops:", err);
        setError("No se pudieron cargar los talleres. Por favor, inténtalo de nuevo más tarde.");
        toast({
          title: "Error",
          description: "No se pudieron cargar los talleres.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    loadWorkshops();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <BookOpen className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Nuestros Talleres
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto animate-fade-in-delay">
            Descubre experiencias de aprendizaje innovadoras diseñadas para despertar tu creatividad y potenciar tus habilidades tecnológicas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-gray-600 text-lg">Cargando talleres increíbles...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">¡Ups! Algo salió mal</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 max-w-md mx-auto">
              <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Próximamente</h3>
              <p className="text-gray-600">
                Estamos preparando talleres increíbles. ¡Mantente atento para más novedades!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Statistics Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{workshops.length}</h3>
                  <p className="text-gray-600">Talleres Disponibles</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                  <p className="text-gray-600">Estudiantes Activos</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
                  <p className="text-gray-600">Tecnologías</p>
                </div>
              </div>
            </div>

            {/* Workshops Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => (
                <div 
                  key={workshop.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <WorkshopCard workshop={workshop} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
