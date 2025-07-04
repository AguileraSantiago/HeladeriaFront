import API from "./axiosConfig";

const API = axios.create({
  baseURL: "https://localhost:7051/api",
});

// Obtener todas las categorías
export const getCategorias = async () => {
  const res = await API.get("/categorias");
  return res.data;
};

// Obtener una categoría por ID
export const getCategoria = async (id) => {
  const res = await API.get(`/categorias/${id}`);
  return res.data;
};

// Crear nueva categoría
export const createCategoria = async (data) => {
  const res = await API.post("/categorias", data);
  return res.data;
};

// Actualizar categoría existente
export const updateCategoria = async (id, data) => {
  const res = await API.put(`/categorias/${id}`, data);
  return res.data;
};

// Eliminar categoría
export const deleteCategoria = async (id) => {
  await API.delete(`/categorias/${id}`);
};