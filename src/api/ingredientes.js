const BASE_URL_INGREDIENTES = "https://localhost:7051/api/ingredientes";

// Obtener todos los ingredientes
export const getIngredientes = async () => {
  try {
    const res = await fetch(BASE_URL_INGREDIENTES);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
    throw error;
  }
};

// Obtener un ingrediente por ID
export const getIngredienteById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL_INGREDIENTES}/${id}`);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener el ingrediente:", error);
    throw error;
  }
};

// Crear un nuevo ingrediente
export const createIngrediente = async (ingrediente) => {
  try {
    const res = await fetch(BASE_URL_INGREDIENTES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingrediente),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al crear el ingrediente:", error);
    throw error;
  }
};

// Actualizar un ingrediente
export const updateIngrediente = async (id, ingrediente) => {
  try {
    const res = await fetch(`${BASE_URL_INGREDIENTES}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingrediente),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar el ingrediente:", error);
    throw error;
  }
};

// Eliminar un ingrediente
export const deleteIngrediente = async (id) => {
  try {
    const res = await fetch(`${BASE_URL_INGREDIENTES}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
    throw error;
  }
};
