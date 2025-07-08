const BASE_URL = "https://localhost:7051/api/helados"; 

// Obtener todos los helados
export const fetchHelados = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los helados:", error);
    throw error;
  }
};


//obtener helado especifico por id
export const fetchHeladoById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener el helado por ID:", error);
    throw error;
  }
};

// Crear un nuevo helado
export const createHelado = async (helado) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helado),
    });

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al crear el helado:", error);
    throw error;
  }
};

// Actualizar un helado existente
export const updateHelado = async (id, helado) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helado),
    });

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al actualizar el helado:", error);
    throw error;
  }
};

// Eliminar un helado
export const deleteHelado = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Error al eliminar el helado:", error);
    throw error;
  }
}