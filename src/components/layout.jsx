import useUser from "../hooks/useUser";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  const { stadoUsuario } = useUser();
  return (
    <>
      {stadoUsuario.token !== "" ? <Header /> : null}

      {children}
      <Footer />
    </>
  );
};

export default Layout;
