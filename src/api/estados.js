const BASE_URL_ESTADOS = "https://localhost:7051/api/estados";

// Obtener todos los estados
export const getEstados = async () => {
  try {
    const res = await fetch(BASE_URL_ESTADOS);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    throw error;
  }
};

// Obtener un estado por ID
export const getEstadoById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL_ESTADOS}/${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener el estado por ID:", error);
        throw error;
    }
    }
    