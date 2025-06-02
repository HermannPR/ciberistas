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

// API configuration using environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5211';

/**
 * Fetch all workshops from the .NET API
 */
export async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/Ciberistas/GetTalleresTest`);
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
