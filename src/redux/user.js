import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  usuario: {
    id: "",
    name: "",
    email: "",
    telefono: "",
    permissionId: "",
    permission: {
      id: "",
      type: "",
    },
  },
  token: "",
};

// Comprobar si el objeto initialState ya existe en el LocalStorage
const storedInitialState = localStorage.getItem("initialState");

if (!storedInitialState) {
  // Si no existe, guardar el objeto initialState en el LocalStorage
  const initialStateJSON = JSON.stringify(initialState);
  localStorage.setItem("initialState", initialStateJSON);
} else {
  // Si ya existe, recuperar el objeto desde el LocalStorage
  initialState = JSON.parse(storedInitialState);
}

const actualizarLocal = (stateUpdate) => {
  const initialStateJSON = JSON.stringify(stateUpdate);
  localStorage.setItem("initialState", initialStateJSON);
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UserActualizar: (state, action) => {
      actualizarLocal(action.payload);

      state.usuario.id = action.payload.usuario.id;
      state.usuario.name = action.payload.usuario.name;
      state.usuario.email = action.payload.usuario.email;
      state.usuario.telefono = action.payload.usuario.telefono;
      state.usuario.permissionId = action.payload.usuario.permissionId;
      state.usuario.permission.id = action.payload.usuario.permission.id;
      state.usuario.permission.type = action.payload.usuario.permission.type;
      state.token = action.payload.token;
    },
  },
});

export const { UserActualizar } = userSlice.actions;
export default userSlice.reducer;
