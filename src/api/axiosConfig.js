import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7051/api", // Cambiá por tu URL real
});

export default API;