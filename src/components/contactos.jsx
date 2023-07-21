import { Helmet } from "react-helmet";
import Contacto from "./contacto";

const Contactos = () => {
  return (
    <>
      <Helmet>
        <title>Contactos</title>
        <meta name="description" content="Ver contactos de tu perfil" />
      </Helmet>
      <Contacto />
    </>
  );
};

export default Contactos;
