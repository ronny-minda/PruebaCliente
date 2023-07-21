import { useEffect, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { todosUsuarios } from "../api/usuario";
import ContactoTr from "./contactoTr";
import { crearContacto, todosContactos } from "../api/contactos";
import useUser from "../hooks/useUser";
import { toast } from "sonner";

const Contacto = () => {
  const queryClient = useQueryClient();
  const [datos, setDatos] = useState([]);
  const [numeroFiltro, setNumeroFiltro] = useState(5);
  const [buscar, setBuscar] = useState("");
  const [actualizar, setActualizar] = useState(false);
  const { stadoUsuario } = useUser();
  const [nuevoContacto, setNuevoContacto] = useState({
    name: "",
    email: "",
    telefono: "",
    userId: stadoUsuario.usuario.id,
  });

  const { mutate: crearContactoMutate } = useMutation({
    mutationFn: crearContacto,
    onSuccess: (data) => {
      setActualizar(false);
      toast.success("Contacto Creado");
      setNuevoContacto({
        name: "",
        email: "",
        telefono: "",
        userId: stadoUsuario.usuario.id,
      });
      queryClient.invalidateQueries("todosContactos");
    },
  });

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["todosContactos"],
    queryFn: () => todosContactos(stadoUsuario.usuario.id),
  });

  const cambios = (e) => {
    setNuevoContacto({ ...nuevoContacto, [e.target.name]: e.target.value });
  };

  const crearContactoo = (e) => {
    e.preventDefault();
    crearContactoMutate(nuevoContacto);
  };

  return (
    <>
      {/* Start block */}
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
                      value={buscar}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                      placeholder="Buscar por nombre de usuario"
                      required=""
                      onChange={(e) => {
                        setBuscar(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div
                onClick={() => setActualizar(!actualizar)}
                className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
              >
                <button className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Crear Contacto
                </button>
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
                        return (
                          <tr key={key} className="border-b">
                            <ContactoTr value={value} />
                          </tr>
                        );
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
      {/* <!-- Update modal --> */}
      {actualizar && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          style={{ backgroundColor: "#0000006e", display: "flex" }}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  Crear Contacto
                </h3>
                <button
                  type="button"
                  onClick={() => setActualizar(!actualizar)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form onSubmit={(e) => crearContactoo(e)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={nuevoContacto.name}
                      onChange={(e) => cambios(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Nombre"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={nuevoContacto.email}
                      onChange={(e) => cambios(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Telefono
                    </label>
                    <input
                      type="number"
                      value={nuevoContacto.telefono}
                      name="telefono"
                      id="telefono"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Telefono"
                      onChange={(e) => cambios(e)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacto;
