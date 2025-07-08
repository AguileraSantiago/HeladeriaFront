const BASE_URL_CATEGORIAS = "https://localhost:7051/api/categorias";

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const res = await fetch(BASE_URL_CATEGORIAS);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};

// Obtener una categoría específica por ID
export const getCategoriaById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL_CATEGORIAS}/${id}`);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener la categoría por ID:", error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategoria = async (categoria) => {
  try {
    const res = await fetch(BASE_URL_CATEGORIAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw error;
  }
};

// Actualizar una categoría existente
export const updateCategoria = async (id, categoria) => {
  try {
    const res = await fetch(`${BASE_URL_CATEGORIAS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategoria = async (id) => {
  try {
    const res = await fetch(`${BASE_URL_CATEGORIAS}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw error;
  }
};
