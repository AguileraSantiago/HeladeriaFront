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

export const getIngredientsByHeladoId = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/ingredientes`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error ${res.status}`);
    }

    const data = await res.json();
    // Asegurar estructura consistente
    return Array.isArray(data)
      ? data.map((item) => ({
          id: item.id || item.ingredienteId,
          nombre: item.nombreIngrediente || item.nombre,
        }))
      : [];
  } catch (error) {
    console.error("Error obteniendo ingredientes:", error);
    return []; // Retorna array vacío en caso de error
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
};

export const addIngredienteToHelado = async (heladoId, ingredienteId) => {
  try {
    // Validación del ID
    const id = Number(ingredienteId);
    if (isNaN(id))
      throw new Error(`ID de ingrediente inválido: ${ingredienteId}`);

    const res = await fetch(`${BASE_URL}/${heladoId}/ingredientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredienteId: id,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error completo al agregar ingrediente:", {
      heladoId,
      ingredienteId,
      error: error.message,
    });
    throw error;
  }
};

export const removeIngredienteFromHelado = async (heladoId, ingredienteId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/${heladoId}/ingredientes/${ingredienteId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      );
    }

    return true; // Indica que la operación fue exitosa
  } catch (error) {
    console.error("Error eliminando ingrediente del helado:", {
      heladoId,
      ingredienteId,
      error: error.message,
    });
    throw error;
  }
};

export const updateHeladoIngredients = async (
  heladoId,
  selectedIngredientIds
) => {
  try {
    // Validación de parámetros mejorada
    if (!heladoId || !Array.isArray(selectedIngredientIds)) {
      throw new Error("Parámetros inválidos");
    }

    // Normalización de IDs (convertir a números y filtrar inválidos)
    const newIds = selectedIngredientIds
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id) && id > 0);

    // Obtener relaciones actuales
    const currentRelations = await getIngredientsByHeladoId(heladoId);
    const currentIds = currentRelations.map((rel) => rel.id);

    // Determinar operaciones necesarias
    const toAdd = newIds.filter((id) => !currentIds.includes(id));
    const toRemove = currentIds.filter((id) => !newIds.includes(id));

    // Procesar eliminaciones primero (para ingredientes desmarcados)
    const removed = [];
    for (const id of toRemove) {
      try {
        await removeIngredienteFromHelado(heladoId, id);
        removed.push(id);
      } catch (error) {
        console.warn(`No se pudo eliminar ingrediente ${id}:`, error.message);
        // Continuar incluso si falla alguna eliminación
      }
    }

    // Procesar adiciones (para nuevos ingredientes marcados)
    const added = [];
    for (const id of toAdd) {
      try {
        await addIngredienteToHelado(heladoId, id);
        added.push(id);
      } catch (error) {
        // Ignorar solo errores de "ya existe", reportar otros
        if (!error.message.includes("ya está asociado")) {
          console.error(`Error agregando ingrediente ${id}:`, error);
          throw error; // Relanzar errores no esperados
        }
      }
    }

    return {
      success: true,
      actualChanges: added.length > 0 || removed.length > 0,
      added: added.length,
      removed: removed.length,
      alreadyExisting: newIds.length - toAdd.length,
    };
  } catch (error) {
    console.error("Error en updateHeladoIngredients:", error);
    throw error;
  }
};

export const fetchCategorias = async () => {
  const res = await fetch("https://localhost:7051/api/categorias");
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
};

export const fetchEstados = async () => {
  const res = await fetch("https://localhost:7051/api/estados");
  if (!res.ok) throw new Error("Error al obtener estados");
  return res.json();
};

export const fetchIngredientes = async () => {
  const res = await fetch("https://localhost:7051/api/ingredientes");
  if (!res.ok) throw new Error("Error al obtener ingredientes");
  return res.json();
};
