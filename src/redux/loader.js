import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: true,
  reducers: {
    CambioLoader: (state, action) => {
      state = action.payload;
    },
  },
});

export const { CambioLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
