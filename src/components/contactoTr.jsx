import { useState } from "react";
import { actualizarUsuario, borrarUsuario } from "../api/usuario";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { actualizarContacto, borrarContacto } from "../api/contactos";

const ContactoTr = ({ value }) => {
  const [menu, setMenu] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [modal, setModal] = useState(false);
  const [datos, setDatos] = useState({
    id: value.id,
    name: value.name,
    email: value.email,
    telefono: value.telefono,
  });

  const queryClient = useQueryClient();

  const {
    isLoading,
    data,
    isError,
    error,
    mutate: actualizarMutate,
  } = useMutation({
    mutationFn: actualizarContacto,
    onSuccess: (data) => {
      queryClient.invalidateQueries("todosContactos");
      setActualizar(false);
      toast.success("Contacto Actualizado");
    },
  });

  const {
    isLoading: borrarisLoading,
    data: borrarData,
    isError: borrarIsError,
    error: borrarError,
    mutate: borraMutate,
  } = useMutation({
    mutationFn: borrarContacto,
    onSuccess: (data) => {
      queryClient.invalidateQueries("todosContactos");
      setModal(false);
      toast.success("Contacto borrado");
    },
  });

  const cambios = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const actuzalizarUsuario = (e) => {
    e.preventDefault();
    actualizarMutate(datos);
  };

  const borrar = () => {
    borraMutate(datos.id);
  };

  return (
    <>
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
      >
        {value.name}
      </th>
      <td className="px-4 py-3">{value.telefono}</td>
      {/* <td className="px-4 py-3">{value.permission.type}</td> */}
      <td className="px-4 py-3 max-w-[12rem] truncate">{value.email}</td>
      <td className="px-4 py-3 flex items-center justify-end relative">
        <button
          onClick={() => setMenu(!menu)}
          className="inline-flex items-center text-sm font-medium hover:bg-gray-100 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        <div
          className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute top-6 right-0"
          style={{
            display: menu ? "block" : "none",
          }}
        >
          <ul
            className="py-1 text-sm"
            aria-labelledby="apple-imac-27-dropdown-button"
          >
            <li>
              <button
                type="button"
                onClick={() => {
                  setActualizar(!actualizar);
                  setMenu(!menu);
                }}
                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  />
                </svg>
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setModal(!modal);
                  setMenu(!menu);
                }}
                className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-red-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                    d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                  />
                </svg>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
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
                  Actualizar Usuario
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
              <form onSubmit={(e) => actuzalizarUsuario(e)}>
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
                      value={datos.name}
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
                      value={datos.email}
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
                      value={datos.telefono}
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
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* // <!-- Delete modal --> */}
      {modal && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          style={{ backgroundColor: "#0000006e", display: "flex" }}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
              <button
                onClick={() => setModal(!modal)}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
              <svg
                className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
                fill="currentColor"
                viewBox="10 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="mb-4 text-gray-500">
                ¿Está seguro de que desea eliminar este elemento?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setModal(!modal)}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                >
                  No, cancel
                </button>
                <button
                  onClick={() => borrar()}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                >
                  Sí estoy seguro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactoTr;
