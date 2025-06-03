/**
 * API service for handling workshop-related API calls using .NET backend
 */

export interface Workshop {
  id: number;
  name: string;
  description: string;
  date: string;
  requirements: string;
  mode: string;
  capacity: number;
}

export interface WorkshopRegistration {
  id_taller: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  edad: number;
  nivel_educativo: string;
  experiencia: string;
  motivacion?: string;
}

export interface Registration {
  id_inscripcion: number;
  id_taller: number;
  nombre_completo: string;
  email: string;
  telefono: string;
  edad: number;
  nivel_educativo: string;
  experiencia: string;
  motivacion: string;
  fecha_inscripcion: string;
  estado: string;
}

// API configuration using environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5211';

/**
 * Fetch all workshops from the .NET API
 */
export async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/Ciberistas/GetTalleres`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    
    // Transform .NET response to frontend format
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        id: item.id_taller,
        name: item.nombre,
        description: item.descripcion,
        date: item.fecha,
        requirements: item.requisitos,
        mode: item.modalidad,
        capacity: item.cupo
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
}

/**
 * Fetch a single workshop by ID from the .NET API
 */
export async function fetchWorkshopById(id: number): Promise<Workshop> {
  try {
    const res = await fetch(`${API_BASE_URL}/Ciberistas/GetTallerConId/${id}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    
    // Transform .NET response to frontend format
    return {
      id: data.id_taller,
      name: data.nombre,
      description: data.descripcion,
      date: data.fecha,
      requirements: data.requisitos,
      mode: data.modalidad,
      capacity: data.cupo
    };
  } catch (error) {
    console.error(`Error fetching workshop ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new workshop using .NET API
 */
export async function createWorkshop(workshop: Omit<Workshop, 'id'>): Promise<Workshop> {
  try {
    // Transform frontend format to .NET format
    const workshopData = {
      nom: workshop.name,
      _fecha: workshop.date,
      descr: workshop.description,
      req: workshop.requirements,
      _modalidad: workshop.mode,
      _cupo: workshop.capacity.toString()
    };

    const params = new URLSearchParams();
    Object.entries(workshopData).forEach(([key, value]) => {
      params.append(key, value);
    });

    const res = await fetch(`${API_BASE_URL}/Ciberistas/CrearTaller?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    // Since .NET endpoint doesn't return data, return the created workshop with a mock ID
    return {
      id: Date.now(), // Mock ID
      ...workshop
    };
  } catch (error) {
    console.error('Error creating workshop:', error);
    throw error;
  }
}

/**
 * Update an existing workshop using .NET API
 */
export async function updateWorkshop(id: number, workshop: Omit<Workshop, 'id'>): Promise<Workshop> {
  try {
    // Transform frontend format to .NET format
    const workshopData = {
      _id: id.toString(),
      nom: workshop.name,
      _fecha: workshop.date,
      descr: workshop.description,
      req: workshop.requirements,
      _modalidad: workshop.mode,
      _cupo: workshop.capacity.toString()
    };

    const params = new URLSearchParams();
    Object.entries(workshopData).forEach(([key, value]) => {
      params.append(key, value);
    });

    const res = await fetch(`${API_BASE_URL}/Ciberistas/ModificarTaller?${params.toString()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    // Return the updated workshop
    return {
      id,
      ...workshop
    };
  } catch (error) {
    console.error('Error updating workshop:', error);
    throw error;
  }
}

// Legacy function aliases for backward compatibility
export const getTalleres = fetchWorkshops;
export const crearTaller = createWorkshop;
export const getTallerPorId = fetchWorkshopById;
export const modificarTaller = updateWorkshop;

/**
 * Create a new workshop registration using .NET API
 */
export async function createWorkshopRegistration(registration: WorkshopRegistration): Promise<{ message: string; id_inscripcion: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/Ciberistas/CrearInscripcion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registration)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `API error: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating workshop registration:', error);
    throw error;
  }
}

/**
 * Fetch all registrations for a specific workshop using .NET API
 */
export async function fetchWorkshopRegistrations(id_taller: number): Promise<Registration[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/Ciberistas/GetInscripciones/${id_taller}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching registrations for workshop ${id_taller}:`, error);
    throw error;
  }
}

// Registration function aliases
export const inscribirseATaller = createWorkshopRegistration;
export const getInscripcionesTaller = fetchWorkshopRegistrations;
