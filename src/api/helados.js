import API from "./axiosConfig";

const API = axios.create({
  baseURL: "https://localhost:7051/api",
});


export const getHelados = async () => {
  const res = await API.get("/helados");
  return res.data;
};


export const getHelado = async (id) => {
  const res = await API.get(`/helados/${id}`);
  return res.data;
};


export const createHelado = async (data) => {
  const res = await API.post("/helados", data);
  return res.data;
};


export const updateHelado = async (id, data) => {
  const res = await API.put(`/helados/${id}`, data);
  return res.data;
};


export const deleteHelado = async (id) => {
  await API.delete(`/helados/${id}`);
};