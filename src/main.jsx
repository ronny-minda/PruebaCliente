import React from "react";
import ReactDOM from "react-dom/client";
import AppRutas from "./AppRutas.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <AppRutas />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
