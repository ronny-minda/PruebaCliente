import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Layout from "./components/layout";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

import useUser from "./hooks/useUser";
import Registrarse from "./pages/registrarse";
import { Toaster } from "sonner";
import Loader from "./svg/loader";

const App = () => {
  const location = useLocation();

  return (
    <>
      <Loader />
      {/* loader de primera carga de la app */}

      <Toaster richColors position="bottom-right" />
      <Layout>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/*" element={<Navigate to="/login" />} />
            {/* todas la rutas van asia login */}

            <Route element={<NotProtected />}>
              {/*contenedor de paginas no protegidas */}
              <Route path="/login" element={<Login />} />
              <Route path="/registrarse" element={<Registrarse />} />
            </Route>

            <Route element={<Protected />}>
              {/*contenedor de paginas protegidas o privadas */}
              <Route path="/dashboard/tabla" element={<Dashboard />} />
              <Route path="/dashboard/perfil" element={<Dashboard />} />
              <Route path="/dashboard/contactos" element={<Dashboard />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
};

const Protected = () => {
  const { stadoUsuario } = useUser();

  if (stadoUsuario.token === "") {
    return <Navigate to="/Login" />;
  }

  return <Outlet />;
};

const NotProtected = () => {
  const { stadoUsuario } = useUser();

  if (stadoUsuario.token !== "") {
    return <Navigate to="/dashboard/tabla" />;
  }

  return <Outlet />;
};

export default App;
