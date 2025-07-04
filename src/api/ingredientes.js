import API from "./axiosConfig";

const API = axios.create({
  baseURL: "https://localhost:7051/api",
});


export const getIngredientes = async () => {
  const res = await API.get("/ingredientes");
  return res.data;
};


export const getIngrediente = async (id) => {
  const res = await API.get(`/ingredientes${id}`);
  return res.data;
};


export const createIngrediente = async (data) => {
  const res = await API.post("/ingredientes", data);
  return res.data;
};


export const updateIngrediente = async (id, data) => {
  const res = await API.put(`/ingredientes/${id}`, data);
  return res.data;
};


export const deleteIngrediente = async (id) => {
  await API.delete(`/ingredientes/${id}`);
};