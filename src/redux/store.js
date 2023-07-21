import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import allUserReducer from "./allUsuarios";
import loader from "./loader";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUser: allUserReducer,
    loader,
  },
});

export default store;
