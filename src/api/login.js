import axios from "axios";

const logear = axios.create({
  baseURL: import.meta.env.VITE_API_BACK,
});

export const login = (credenciales) => logear.post("/login", credenciales);
