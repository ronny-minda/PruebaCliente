import { useState } from "react";
import Header from "../components/header";
import LayoutPage from "../components/layoutPage";
import Tabla from "../components/tabla";
import { Navigate, useLocation } from "react-router-dom";
import Perfil from "../components/perfil";
import Contactos from "../components/contactos";
import { motion, AnimatePresence } from "framer-motion";
import useUser from "../hooks/useUser";

const Dashboard = () => {
  const { stadoUsuario } = useUser();
  const location = useLocation();

  const url = location.pathname.split("/")[2];

  return (
    <>
      <LayoutPage>
        {url === "tabla" ? (
          <>
            {stadoUsuario.usuario.permission.type === "ADMIN" ? (
              <>{url === "tabla" ? <Tabla /> : null}</>
            ) : (
              <Navigate to="/dashboard/perfil" />
            )}
          </>
        ) : null}

        {url === "perfil" ? <Perfil /> : null}
        {url === "contactos" ? <Contactos /> : null}
      </LayoutPage>
    </>
  );
};

export default Dashboard;
