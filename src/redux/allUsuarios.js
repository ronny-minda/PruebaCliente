import { createSlice } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";
import { todosUsuarios } from "../api/usuario";

export const allUserSlice = createSlice({
  name: "allUser",
  initialState: [1, 2, 4],
  reducers: {
    GuardarTodosUsuarios: (state, action) => {
      state = action.payload;
    },
  },
});

export const { GuardarTodosUsuarios } = allUserSlice.actions;
export default allUserSlice.reducer;
