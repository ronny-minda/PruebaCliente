import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import TablaTr from "./tablaTr";
import { useQuery } from "@tanstack/react-query";
import { todosUsuarios } from "../api/usuario";

const Tabla = () => {
  const [datos, setDatos] = useState([]);
  const [numeroFiltro, setNumeroFiltro] = useState(5);
  const [buscar, setBuscar] = useState("");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["todosUsuarios"],
    queryFn: todosUsuarios,
  });

  return (
    <>
    <Helmet>
        <title>Tabla</title>
        <meta name="description" content="Todos los usuarios de esta plataforma" />
      </Helmet>
      {/* <!-- Start block --> */}
      <section className="bg-gray-50 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* Inicio */}
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      value={buscar}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                      placeholder="Buscar por nombre de usuario"
                      required=""
                      onChange={(e) => {
                        setBuscar(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-hidden" style={{ height: "60vh" }}>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-3">
                      TELEFONO
                    </th>
                    <th scope="col" className="px-4 py-3">
                      USUARIO
                    </th>
                    <th scope="col" className="px-4 py-3">
                      EMAIL
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      EDITAR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((value, key) => {
                    if (key < numeroFiltro && key >= numeroFiltro - 5) {
                      if (
                        value.name.toLowerCase().includes(buscar.toLowerCase())
                      ) {
                        if (value.permission.type === "USER") {
                          return (
                            <tr key={key} className="border-b">
                              <TablaTr value={value} />
                            </tr>
                          );
                        }
                      }
                    }
                  })}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                <span className="font-semibold text-gray-900 ">
                  {numeroFiltro - 5}-{numeroFiltro}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-gray-900 ">
                  {data?.data.length}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <div
                    onClick={() => {
                      if (numeroFiltro >= data?.data.length) {
                        setNumeroFiltro(numeroFiltro - 5);
                      }
                    }}
                    className="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>

                <li>
                  <div className="cursor-pointer flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    ...
                  </div>
                </li>

                <li>
                  <div
                    onClick={() => {
                      if (numeroFiltro <= data?.data.length) {
                        setNumeroFiltro(numeroFiltro + 5);
                      }
                    }}
                    className="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tabla;
