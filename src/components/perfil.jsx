import { Helmet } from "react-helmet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { actualizarUsuario } from "../api/usuario";
import useUser from "../hooks/useUser";
import { toast } from "sonner";
import Spiner from "./spiner";

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
        <meta name="description" />
      </Helmet>
      <div className="h-auto w-screen">
        <section className=" w-full relative">
          {/* loader */}
          {isLoading && <Spiner />}
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
