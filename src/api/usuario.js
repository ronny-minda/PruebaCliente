import axios from "axios";

const usuario = axios.create({
  baseURL: import.meta.env.VITE_API_BACK,
});

export const todosUsuarios = () => usuario.get("/usuarios/todosUsuarios");

export const crearUsuario = (credenciales) =>
  usuario.post("/usuarios/crearUsuario", credenciales);

export const actualizarUsuario = (credenciales) =>
  usuario.put("/usuarios/actualizarUsuario", credenciales);

export const borrarUsuario = (id) =>
  usuario.delete(`/usuarios/borraUsuario/${id}`);
