import React, { useState, useEffect } from 'react';
import { fetchWorkshops, fetchWorkshopRegistrations, Workshop, Registration } from '@/services/api';
import { Users, Calendar, Trophy, TrendingUp } from 'lucide-react';

interface WorkshopStats {
  totalWorkshops: number;
  totalRegistrations: number;
  averageRegistrationsPerWorkshop: number;
  mostPopularWorkshop: Workshop | null;
}

export function WorkshopStatsSection() {
  const [stats, setStats] = useState<WorkshopStats>({
    totalWorkshops: 0,
    totalRegistrations: 0,
    averageRegistrationsPerWorkshop: 0,
    mostPopularWorkshop: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const workshops = await fetchWorkshops();
        
        if (workshops.length === 0) {
          setLoading(false);
          return;
        }

        // Obtener inscripciones para cada taller
        const workshopRegistrations = await Promise.all(
          workshops.map(async (workshop) => {
            try {
              const registrations = await fetchWorkshopRegistrations(workshop.id);
              return { workshop, registrations };
            } catch (error) {
              console.error(`Error fetching registrations for workshop ${workshop.id}:`, error);
              return { workshop, registrations: [] };
            }
          })
        );

        // Calcular estadísticas
        const totalRegistrations = workshopRegistrations.reduce(
          (sum, item) => sum + item.registrations.length, 
          0
        );
        
        const averageRegistrations = workshops.length > 0 
          ? totalRegistrations / workshops.length 
          : 0;

        // Encontrar el taller más popular
        const mostPopular = workshopRegistrations.reduce((prev, current) => 
          current.registrations.length > prev.registrations.length ? current : prev
        );

        setStats({
          totalWorkshops: workshops.length,
          totalRegistrations,
          averageRegistrationsPerWorkshop: Math.round(averageRegistrations * 10) / 10,
          mostPopularWorkshop: mostPopular.workshop
        });

      } catch (error) {
        console.error('Error loading workshop stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
          </div>
        </div>
      </section>
    );
  }

  const statsData = [
    {
      icon: Calendar,
      title: 'Talleres Disponibles',
      value: stats.totalWorkshops,
      description: 'Talleres únicos ofrecidos',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Estudiantes Inscritos',
      value: stats.totalRegistrations,
      description: 'Total de inscripciones activas',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Promedio por Taller',
      value: stats.averageRegistrationsPerWorkshop,
      description: 'Inscripciones promedio',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Trophy,
      title: 'Taller Más Popular',
      value: stats.mostPopularWorkshop?.name?.substring(0, 20) + '...' || 'N/A',
      description: 'Más demandado',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Estadísticas de Nuestros Talleres
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre el impacto y la popularidad de nuestros programas educativos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {stats.mostPopularWorkshop && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-3">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                🏆 Taller Más Popular
              </h3>
              <p className="text-lg font-semibold text-orange-600 mb-2">
                {stats.mostPopularWorkshop.name}
              </p>
              <p className="text-gray-600 text-sm">
                {stats.mostPopularWorkshop.description.substring(0, 100)}...
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
