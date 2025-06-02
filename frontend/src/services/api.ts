/**
 * API service for handling workshop and date-related API calls
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

// Base URL configuration - can be updated based on environment
// const API_BASE_URL = 'http://localhost:3000';

/**
 * Fetch all workshops from the API
 */
export async function fetchWorkshops(): Promise<Workshop[]> {
  try {
    const res = await fetch(`/workshops`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
}

/**
 * Fetch a single workshop by ID
 */
export async function fetchWorkshopById(id: number): Promise<Workshop> {
  try {
    const res = await fetch(`/workshops/${id}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error(`Error fetching workshop ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new workshop
 */
export async function createWorkshop(workshop: Omit<Workshop, 'id'>): Promise<Workshop> {
  try {
    const res = await fetch(`/workshops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workshop)
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error creating workshop:', error);
    throw error;
  }
}

/**
 * Fetch all available dates
 */
export async function fetchDates(): Promise<string[]> {
  try {
    const res = await fetch(`/dates`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching dates:', error);
    throw error;
  }
}

/**
 * Create a new date
 */
export async function createDate(date: string): Promise<any> {
  try {
    const res = await fetch(`/dates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date })
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error creating date:', error);
    throw error;
  }
}

// Alternative .NET API endpoints
export async function fetchWorkshopsFromDotNet(): Promise<Workshop[]> {
  try {
    const res = await fetch('http://localhost:5000/Ciberistas/GetTalleres');
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    return data.map((item: any) => ({
      id: item.id_taller,
      name: item.nombre, 
      description: item.descripcion,
      date: item.fecha,
      requirements: item.requisitos,
      mode: item.modalidad,
      capacity: item.cupo
    }));
  } catch (error) {
    console.error('Error fetching workshops from .NET:', error);
    throw error;
  }
}

export async function fetchWorkshopByIdFromDotNet(id: number): Promise<Workshop> {
  try {
    const res = await fetch(`http://localhost:5000/Ciberistas/GetTallerConId/${id}`);
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
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
    console.error(`Error fetching workshop ${id} from .NET:`, error);
    throw error;
  }
}

// Obtiene todos los talleres usando el procedimiento almacenado SP_LGG_getTalleres
export async function getTalleres(): Promise<Workshop[]> {
  const res = await fetch(`/workshops`);
  if (!res.ok) throw new Error('Error al obtener talleres');
  return await res.json();
}

// Crea un taller usando el procedimiento almacenado SP_LGG_crearTaller
export async function crearTaller(taller: Omit<Workshop, 'id'>): Promise<any> {
  const res = await fetch(`/workshops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taller)
  });
  if (!res.ok) throw new Error('Error al crear taller');
  return await res.json();
}

// Obtiene un taller por ID usando el procedimiento almacenado SP_LGG_GetTaller
export async function getTallerPorId(id: number): Promise<Workshop> {
  const res = await fetch(`/workshops/${id}`);
  if (!res.ok) throw new Error('Error al obtener taller');
  return await res.json();
}

// Modifica un taller usando el procedimiento almacenado SP_LGG_modifyTalleres
export async function modificarTaller(id: number, taller: Omit<Workshop, 'id'>): Promise<any> {
  const res = await fetch(`/workshops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taller)
  });
  if (!res.ok) throw new Error('Error al modificar taller');
  return await res.json();
}
