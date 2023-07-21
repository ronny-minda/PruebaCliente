import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "./footer";

const LayoutPage = ({ children }) => {
  const [valor, setValor] = useState(0.5); // cambiar el 1 == 1s

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValor(0);
    }, 500); // cambiar el 1000 === 1s
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.main
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5, delay: valor }}
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
      }}
    >
      {children}
    </motion.main>
  );
};

export default LayoutPage;
