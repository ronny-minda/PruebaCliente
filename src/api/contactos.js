import axios from "axios";

const contacto = axios.create({
  baseURL: import.meta.env.VITE_API_BACK,
});

export const todosContactos = (id) =>
  contacto.get(`/contacto/todosContactos/${id}`);

export const crearContacto = (credenciales) =>
  contacto.post("/contacto/crearContacto", credenciales);

export const actualizarContacto = (credenciales) =>
  contacto.put("/contacto/actualizarContacto", credenciales);

export const borrarContacto = (id) =>
  contacto.delete(`/contacto/borrarContacto/${id}`);
