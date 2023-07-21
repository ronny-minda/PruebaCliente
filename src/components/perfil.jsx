import { Helmet } from "react-helmet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { actualizarUsuario } from "../api/usuario";
import useUser from "../hooks/useUser";
import { toast } from "sonner";

const Perfil = () => {
  const { stadoUsuario, actualizarStadoUsuario } = useUser();
  const [datos, setDatos] = useState({
    id: stadoUsuario.usuario.id,
    name: stadoUsuario.usuario.name,
    email: stadoUsuario.usuario.email,
    telefono: stadoUsuario.usuario.telefono,
    password: "",
    permissionId: stadoUsuario.usuario.permissionId,
  });

  const { isLoading, data, isError, error, mutate } = useMutation({
    mutationFn: actualizarUsuario,
    onSuccess: (data) => {
      toast.success("Tu Perfil Actualizado");

      actualizarStadoUsuario({
        usuario: data.data.updatedUser,
        token: stadoUsuario.token,
      });
    },
  });

  const cambios = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    mutate(datos);
  };
  return (
    <>
      <Helmet>
        <title>Perfil</title>
        <meta name="description" content="Actualizar perfil" />
      </Helmet>
      <div className="h-auto w-screen">
        <section className=" w-full relative">
          {/* loader */}
          {isLoading && (
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center backdrop-blur-sm">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Actualizar Perfil
            </h2>
            <form onSubmit={(e) => enviar(e)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="sm:col-span-2">
                  <label
                    htmlhtmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={datos.name}
                    placeholder="Nombre"
                    required=""
                    onChange={(e) => cambios(e)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlhtmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={datos.email}
                    placeholder="Email"
                    required=""
                    onChange={(e) => cambios(e)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlhtmlFor="Telefono"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Telefono
                  </label>
                  <input
                    type="number"
                    name="telefono"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={datos.telefono}
                    placeholder="telefono"
                    required=""
                    onChange={(e) => cambios(e)}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlhtmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    password
                  </label>
                  <input
                    type="text"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={datos.password}
                    placeholder="password"
                    required=""
                    onChange={(e) => cambios(e)}
                  />
                </div>
              </div>
              {isError && (
                <div className="text-white bg-red-700 font-medium text-sm px-5 text-center mr-2 mb-2 ">
                  {/* {error.response.data.msg} */}
                </div>
              )}

              <button
                type="submit"
                className="mr-3 text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
              >
                Actualizar
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Perfil;
