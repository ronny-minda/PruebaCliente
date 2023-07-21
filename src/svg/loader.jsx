import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
const Svg = ({ ani }) => {
  return (
    <motion.svg
      animate={{ fill: ani ? "#e8aa4000" : "#e8aa40ff" }}
      className="loader"
      xmlns="http://www.w3.org/2000/svg"
      width={719}
      height={618}
      fill="none"
    >
      <path d="M233.5 380v238L424 505v-35h142.5c36.4-5.6 72.5-27.667 86-38 54-48 66.167-114.333 65.5-141.5 2.4-44-27-94.333-42-114-33.2-42.4-73.833-55.333-90-56.5-3.6-.8-4.5-4.667-4.5-6.5-2.4-12-14.667-37-20.5-48-35.2-59.2-110-67.333-143-64-49.6 0-89.333 45.667-103 68.5-2 4.4-7.5 1.833-10 0-2-2-24.5-14.5-35.5-20.5-87.2-40-169.667 2.333-200 28.5-47.6 35.2-65.833 98.667-69 126v218c2.8 12.4 12.833 19.167 17.5 21 18 5.2 26.833-11.833 29-21V204c0-26.8 22.333-62.5 33.5-77 33.2-38.8 98.167-48.833 126.5-49 38 1.2 73.833 23.833 87 35 12.4 12.8 20.833 17.333 23.5 18 14.4 5.6 22.333-9.667 24.5-18 8-24.4 24.333-40.5 31.5-45.5C403.5 31.9 461 43.667 486 54c46.4 22 55.667 61.5 54.5 78.5.4 24 30.5 32 45.5 33 69.2 23.6 85.167 82.167 84.5 108.5 10.8 94-64.833 139.5-104 150.5H424v-157l-190.5-111-184 110 184 113.5Z" />
    </motion.svg>
  );
};

const Loader = () => {
  const [ani, setAni] = useState(true);
  const [ani2, setAni2] = useState(true);

  useEffect(() => {
    const log = setTimeout(() => {
      setAni(false);
    }, 2000);
    return () => clearTimeout(log);
  }, []);

  useEffect(() => {
    const log = setTimeout(() => {
      setAni2(false);
    }, 1000);
    return () => clearTimeout(log);
  }, []);

  return (
    <>
      <AnimatePresence>
        {ani && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="h-screen w-screen bg-white fixed top-0 left-0 flex justify-center items-center"
            style={{ zIndex: "9999999" }}
          >
            <Svg ani={ani2} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Loader;
